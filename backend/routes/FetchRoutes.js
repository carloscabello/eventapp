'use strict'

const FetchController = require('../controllers/FetchController')

module.exports = (options) => {
  const app = options.app

  app.route('/fetch')
    .get(FetchController.fetchAll)
  app.route('/fetch/all')
    .get(FetchController.fetchAll)

  app.route('/fetch/new')
    .get(FetchController.fetchNew)

  app.route('/fetch/:eventbriteId')
    .get(FetchController.fetchEvent)
}
