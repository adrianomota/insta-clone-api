require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const dbCgf = require('./config/database')

class App {
  constructor () {
    this.express = express()
    this.server = require('http').Server(this.express)
    this.io = require('socket.io')(this.server)
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
    this.express.use(cors())
    this.express.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
    )
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().server
