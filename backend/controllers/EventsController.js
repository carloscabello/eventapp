'use strict'
const models = require('../models')
const Event = models.Event

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
