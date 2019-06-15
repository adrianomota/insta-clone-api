require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')
const path = require('path')
const morgan = require('morgan')
const dbCgf = require('./config/database')

class App {
  constructor () {
    this.express = express()
    this.server = require('http').Server(this.express)
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
    this.express.use(morgan('dev'))
    this.express.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
    )
  }

  routes () {
    const io = require('socket.io')(this.server)
    this.express.use(require('./routes')(io))
  }
}

module.exports = new App().server
