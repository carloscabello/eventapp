'use strict'
const { Op } = require('sequelize')
const models = require('../models')
const Event = models.Event
const TicketClass = models.TicketClass

exports.index = async function (req, res) {
  const whereClauses = generateFilterWhereClauses(req)
  try {
    const events = await Event.findAll(
      {
        where: whereClauses
      }
    )

    res.json(events)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.show = async function (req, res) {
  try {
    const eventId = req.params.eventId
    const event = await Event.findOne({
      where: {
        [Op.or]: [
          { id: eventId },
          { eventbriteId: eventId }
        ]
      },
      include:
    { model: TicketClass, as: 'ticketClasses' }
    })

    if (event === null) {
      res.status(404).send('Event not found')
    } else {
      res.json(event)
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

const generateFilterWhereClauses = function (req) {
  const filterWhereClauses = []
  if (typeof req.query.online !== 'undefined') {
    const onlineEvents = (req.query.online === true) || (req.query.online === 'true') || (req.query.online === 1) || (req.query.online === '1')

    filterWhereClauses.push({
      isOnline: onlineEvents
    })
  }

  if (typeof req.query.physical !== 'undefined') {
    const physicalEvents = (req.query.physical === true) || (req.query.physical === 'true') || (req.query.physical === 1) || (req.query.physical === '1')

    filterWhereClauses.push({
      isOnline: !physicalEvents
    })
  }
  return filterWhereClauses
}
