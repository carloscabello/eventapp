'use strict'

const EventbriteController = require('../controllers/EventbriteController.js')

module.exports = (options) => {
  const app = options.app

  app.route('/eventbrite/fetchall')
    .get(EventbriteController.fetchAll)
}
