const express = require('express')
const cors = require('cors')
require('dotenv').config()
const helmet = require('helmet')
const { Sequelize } = require('sequelize')

const app = express() // Express app creation
app.use(express.json()) // Request parser as JSON
app.use(cors()) // Enables requests from a different domain
app.use(helmet()) // General security for REST services

const databaseHost = process.env.DATABASE_HOST
const databasePort = process.env.DATABASE_PORT
const databaseUsername = process.env.DATABASE_USERNAME
const databasePassword = process.env.DATABASE_PASSWORD
const databaseName = process.env.DATABASE_NAME

const sequelize = new Sequelize(databaseName, databaseUsername, databasePassword, {
  host: databaseHost,
  port: databasePort,
  dialect: 'mariadb'
})

sequelize.authenticate()
  .then(() => {
    console.info('INFO - Database connected.')
    const port = process.env.APP_PORT
    return app.listen(port)
  })
  .then((server) => {
    console.log('Eventapp backend listening at http://'+server.address() +':'+ server.address().port)
  })
  .catch(err => {
    console.error('ERROR - Unable to connect to the database:', err)
  })

// The following belongs to controllers and routes folder. It is included here just for lab1 testig purposes
// Routing and controllers will be explained on the following labs.
const models = require('./models')
const Restaurant = models.Restaurant
const RestaurantCategory = models.RestaurantCategory

const indexRestaurants = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: ['id', 'name', 'description', 'address', 'postalCode', 'url', 'shippingCosts', 'averageServiceMinutes', 'email', 'phone', 'logo', 'heroImage', 'status', 'restaurantCategoryId'],
        include:
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

app.route('/restaurants').get(indexRestaurants)
