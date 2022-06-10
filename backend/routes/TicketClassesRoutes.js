'use strict'
const TicketClassesController = require('../controllers/TicketClassesController')

module.exports = (options) => {
  const app = options.app

  app.route('/events/:eventId/tickets')
    .get(TicketClassesController.index)
}
