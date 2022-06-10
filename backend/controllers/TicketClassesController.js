'use strict'
const { Op } = require('sequelize')
const models = require('../models')
const Event = models.Event
const TicketClass = models.TicketClass

exports.index = async function (req, res) {
  try {
    const eventId = req.params.eventId
    const event = await Event.findOne({
      where: {
        [Op.or]: [
          { id: eventId },
          { eventbriteId: eventId }
        ]
      },
      include: [{ model: TicketClass, as: 'ticketClasses' }
      ],
      // https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#ordering-eager-loaded-associations
      order: [
        ['ticketClasses', 'price', 'DESC']
      ]
    })

    if (event === null) {
      res.status(404).send('Event not found')
    } else {
      res.json(event.ticketClasses)
    }
  } catch (err) {
    res.status(500).send(err)
  }
}
