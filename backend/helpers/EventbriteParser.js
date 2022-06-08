'use strict'
const models = require('../models')
const Event = models.Event
const TicketClass = models.TicketClass

exports.toEvent = async function (eventbriteResponse) {
  try {
    let event

    event = await Event.findOne({
      // subQuery: false,
      where: { eventbriteId: eventbriteResponse.id }
    })

    if (event === null) {
      event = Event.build({
        eventbriteId: eventbriteResponse.id
      })
    }

    event.retrievedAt = new Date()

    event.title = eventbriteResponse.name.text
    event.startDate = eventbriteResponse.start.utc
    event.endDate = eventbriteResponse.end.utc
    event.summary = eventbriteResponse.summary
    event.description = eventbriteResponse.description.html
    event.imageUri = eventbriteResponse.logo.original.url
    event.status = eventbriteResponse.status

    event.isOnline = eventbriteResponse.online_event

    return event
  } catch (err) {
    console.log(err)
  }
}

exports.toTicketClass = async function (eventbriteResponse) {
  try {
    let ticketClass

    ticketClass = await TicketClass.findOne({
      // subQuery: false,
      where: { eventbriteId: eventbriteResponse.id }
    })

    if (ticketClass === null) {
      ticketClass = TicketClass.build({
        eventbriteId: eventbriteResponse.id
      })
    }

    ticketClass.retrievedAt = new Date()

    ticketClass.name = eventbriteResponse.name
    ticketClass.description = eventbriteResponse.description

    if (eventbriteResponse.donation) {
      ticketClass.type = 'donation'
    } else {
      ticketClass.type = eventbriteResponse.free ? 'free' : 'paid'
    }

    ticketClass.price = eventbriteResponse.free ? null : eventbriteResponse.cost.major_value
    ticketClass.currency = eventbriteResponse.free ? null : eventbriteResponse.cost.currency

    ticketClass.quantityTotal = eventbriteResponse.quantity_total
    ticketClass.quantitySold = eventbriteResponse.quantity_sold

    ticketClass.salesStartDate = eventbriteResponse.sales_start
    ticketClass.salesEndDate = eventbriteResponse.sales_end

    return ticketClass
  } catch (err) {
    console.log(err)
  }
}

exports.toTicketClassesList = async function (eventbriteResponse) {
  try {
    const eventbriteTicketClassesList = eventbriteResponse.ticket_classes

    const ticketClassesList = await Promise.all(
      eventbriteTicketClassesList.map(
        async (eventbriteTicketClass) =>
          await exports.toTicketClass(eventbriteTicketClass)
      )
    )
    return ticketClassesList
  } catch (err) {
    console.log(err)
  }
}
