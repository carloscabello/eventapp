'use strict'

const FetchController = require('../controllers/FetchController')

module.exports = (options) => {
  const app = options.app

  app.route('/fetch/events')
    .get(FetchController.fetchAll)
  app.route('/fetch/events/all')
    .get(FetchController.fetchAll)

  app.route('/fetch/events/new')
    .get(FetchController.fetchNew)

  app.route('/fetch/events/:eventbriteId')
    .get(FetchController.fetchEvent)
}
