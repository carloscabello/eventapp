'use strict'
const { Op } = require('sequelize')
const models = require('../models')
const Event = models.Event
const TicketClass = models.TicketClass
const EventbriteAPI = require('../services/EventbriteAPI')
const EventbriteParser = require('../helpers/EventbriteParser')

// Batch size: Max number of concurrent requests to the EvenbriteAPI (per endpoint call)
const batchSize = 10

exports.fetchAll = async function (req, res) {
  try {
    const events = await Event.findAll(
      { attributes: ['id', 'eventbriteId'] }
    )

    await fetchAndStoreList(events)
    const fetchedAndStoredEvents = await Event.findAll({
      where: {
        id: events.map(e => e.id)
      },
      attributes: ['id', 'eventbriteId', 'retrievedAt', 'title']
    })

    res.json(fetchedAndStoredEvents)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.fetchNew = async function (req, res) {
  try {
    const events = await Event.findAll(
      {
        where: {
          retrievedAt: { [Op.is]: null }
        },
        attributes: ['id', 'eventbriteId']
      }
    )

    await fetchAndStoreList(events)
    const fetchedAndStoredEvents = await Event.findAll({
      where: {
        id: events.map(e => e.id)
      },
      attributes: ['id', 'eventbriteId', 'retrievedAt', 'title']
    })

    res.json(fetchedAndStoredEvents)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.fetchEvent = async function (req, res) {
  try {
    const eventToFetch = Event.build({
      eventbriteId: req.params.eventbriteId
    })
    const savedEvent = await fetchAndStore(eventToFetch)

    const event = await Event.findByPk(savedEvent.id, {
      include: [
        { model: TicketClass, as: 'ticketClasses' }
      ]
    })

    res.json(event)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

// Fetch and store a single Event from Eventbrite
async function fetchAndStore (eventToFetch) {
  // Unmanaged transaction: https://sequelize.org/master/manual/transactions.html#unmanaged-transactions
  const dbTransaction = await models.sequelize.transaction()
  try {
    const savedEvent = await fetchAndStoreEvent(eventToFetch, dbTransaction)

    await batchFetchAndStoreTicketClasses([savedEvent], batchSize, dbTransaction)

    await dbTransaction.commit()
    await savedEvent.reload()
    return savedEvent
  } catch (err) {
    await dbTransaction.rollback()
    console.log(err)
    throw err
  }
}

// Fetch and store a list of Events from Eventbrite
async function fetchAndStoreList (eventsList) {
  // Unmanaged transaction: https://sequelize.org/master/manual/transactions.html#unmanaged-transactions
  const dbTransaction = await models.sequelize.transaction()
  try {
    await batchFetchAndStoreEvents(eventsList, batchSize, dbTransaction)

    const savedEventsList = await Event.findAll(
      {
        attributes: ['id', 'eventbriteId'],
        where: {
          eventbriteId: eventsList.map(e => e.eventbriteId)
        },
        transaction: dbTransaction
      }
    )

    await batchFetchAndStoreTicketClasses(savedEventsList, batchSize, dbTransaction)

    await dbTransaction.commit()
  } catch (err) {
    await dbTransaction.rollback()
    console.log(err)
    throw err
  }
}

// Auxiliary function: Batch storing and fetching

// Fetch and Store events (in batches)
async function batchFetchAndStoreEvents (eventsList, batchSize, dbTransaction) {
  for (let i = 0; i < eventsList.length; i += batchSize) {
    // Queue Events in a batch
    const eventPromisesBatch = eventsList.slice(i, i + batchSize)
      .map(eventToFetch => fetchAndStoreEvent(eventToFetch, dbTransaction))

    // Resolve Promise batch
    await Promise.all(eventPromisesBatch)
  }
}

// Fetch and Store TicketClasses from Events (in batches)
async function batchFetchAndStoreTicketClasses (savedEventsList, batchSize, dbTransaction) {
  for (let i = 0; i < savedEventsList.length; i += batchSize) {
    // Queue TicketClasses in a batch
    const ticketClassPromises = savedEventsList.slice(i, i + batchSize)
      .flatMap(savedEvent => fetchAndStoreTicketClasesList(savedEvent, dbTransaction))

    // Resolve Promise batch
    await Promise.all(ticketClassPromises)
  }
}

// Auxiliary function: Individual fetching and storing methods

async function fetchAndStoreEvent (eventToFetch, dbTransaction) {
  const eventbriteResponse = await EventbriteAPI.fetchEvent(eventToFetch.eventbriteId)
  const event = await EventbriteParser.toEvent(eventbriteResponse)

  // A promise is returned
  return event.save({ transaction: dbTransaction })
}

async function fetchAndStoreTicketClasesList (savedEvent, dbTransaction) {
  const eventbriteResponse = await EventbriteAPI.fetchTicketClassesList(savedEvent.eventbriteId)
  const ticketClassesList = await EventbriteParser.toTicketClassesList(eventbriteResponse)

  // A list of promises is returned
  return Promise.all(
    ticketClassesList
      .map(ticketClassToSave => storeTicketClass(savedEvent, ticketClassToSave, dbTransaction))
  )
}

async function storeTicketClass (savedEvent, ticketClassToSave, dbTransaction) {
  ticketClassToSave.eventId = savedEvent.id

  // A promise is returned
  return ticketClassToSave.save({ transaction: dbTransaction })
}
