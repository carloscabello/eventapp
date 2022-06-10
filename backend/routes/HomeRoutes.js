'use strict'

module.exports = (options) => {
  const app = options.app
  app.get('/', (req, res) => {
    res.send('Eventapp API. Check <a href="https://github.com/carloscabello/eventapp">Repository</a>')
  })
}
