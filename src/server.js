require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express')
const mongoose = require('mongoose')
const dbCgf = require('./config/database')

class App {
  constructor () {
    this.express = express()
    this.database()
    this.middlewares()
    this.routes()
  }

  database () {
    mongoose
      .connect(dbCgf.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true
      })
      .then(() => console.log('connecting to database successful'))
      .catch(err => console.error('could not connect to mongo DB', err))
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
