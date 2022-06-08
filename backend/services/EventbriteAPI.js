'use strict'
// node-fetch' import:
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

// Load configuration
require('dotenv').config()
const eventbriteAPI = 'https://www.eventbriteapi.com/v3'
const eventbriteAPIKey = process.env.EVENTBRITE_API_KEY

exports.fetchEvent = async function (eventId) {
  const res = await fetch(`${eventbriteAPI}/events/${eventId}`, {
    headers: { Authorization: `Bearer ${eventbriteAPIKey}` }
  })
  return res.json()
}

exports.fetchEventList = async function (eventIdList) {
  const events = await Promise.all(
    eventIdList.map(async (eventId) => await exports.fetchEvent(eventId))
  )
  return events
}

exports.fetchTicketClassesList = async function (eventId) {
  const res = await fetch(`${eventbriteAPI}/events/${eventId}/ticket_classes/`, {
    headers: { Authorization: `Bearer ${eventbriteAPIKey}` }
  })
  return res.json()
}

exports.fetchTicketClass = async function (eventId, ticketClassId) {
  const res = await fetch(`${eventbriteAPI}/events/${eventId}/ticket_classes/${ticketClassId}`, {
    headers: { Authorization: `Bearer ${eventbriteAPIKey}` }
  })
  return res.json()
}
