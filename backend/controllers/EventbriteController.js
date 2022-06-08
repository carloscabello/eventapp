'use strict'
const models = require('../models')
const Event = models.Event
const EventbriteAPI = require('../services/EventbriteAPI')
const EventbriteParser = require('../helpers/EventbriteParser')

exports.fetchAll = async function (req, res) {
  try {
    const events = await Event.findAll(
      {
        attributes: ['eventbriteId']
      }
    )
    await fetchAndStoreEvents(events)

    const updatedEvents = await Event.findAll()

    res.json(updatedEvents)
  } catch (err) {
    res.status(500).send(err)
  }
}

// Method not waiting for promises
async function fetchAndStoreEvents (eventsList) {
  // Unmanaged transaction: https://sequelize.org/master/manual/transactions.html#unmanaged-transactions
  // const t = await models.sequelize.transaction()
  // TODO: Transaction not working
  try {
    eventsList.forEach(async (eventToFetch) => {
      // Fetch and store Event information
      const eventbriteEvent = await EventbriteAPI.fetchEvent(eventToFetch.eventbriteId)
      const event = await EventbriteParser.toEvent(eventbriteEvent)
      console.log(`Saving event:${event.title}`)

      await event.save()

      // Fetch corresponding TicketClasses list
      const eventbriteTicketClassesList = await EventbriteAPI.fetchTicketClassesList(event.eventbriteId)
      const ticketClassList = await EventbriteParser.toTicketClassesList(eventbriteTicketClassesList)
      // Fetch and store each TicketClass information
      ticketClassList.forEach(async (ticketClassToSave) => {
        ticketClassToSave.eventId = event.id
        await ticketClassToSave.save()
      })
    })
    // Commit transaction
    // await t.commit()
  } catch (err) {
    // await t.rollback()
    console.log(err)
  }
}
