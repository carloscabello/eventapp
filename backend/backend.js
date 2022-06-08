const express = require('express')
const cors = require('cors')
require('dotenv').config()
const path = require('path')
const helmet = require('helmet')

const app = express() // Express app creation
app.use(express.json()) // Request parser as JSON
app.use(cors()) // Enables requests from a different domain
app.use(helmet()) // General security for REST services

app.use('/public', express.static(path.join(__dirname, '/public')))// Serves resources from public folder

// require only admits one parameter, so we need to create an object composed of both parameters needed on routes
const requireOptions = { app: app }
require('./routes/')(requireOptions)

const { initSequelize } = require('./config/sequelize')
const sequelize = initSequelize()

sequelize.authenticate()
  .then(() => {
    console.info('INFO - Database connected.')
    const port = process.env.APP_PORT || 3000
    return app.listen(port)
  })
  .then((server) => {
    console.log('Eventapp listening at http://localhost:' + server.address().port)
  })
  .catch(err => {
    console.error('ERROR - Unable to connect to the database:', err)
  })
