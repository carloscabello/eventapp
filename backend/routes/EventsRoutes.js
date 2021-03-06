'use strict'

const EventsController = require('../controllers/EventsController')

module.exports = (options) => {
  const app = options.app

  app.route('/events')
    .get(EventsController.index)
  app.route('/events/:eventId')
    .get(EventsController.show)
}
