const express = require('express')
const routes = express.Router()
const multer = require('multer')

const multerCfg = require('./config/upload')
const upload = multer(multerCfg)

const postController = require('./app/controllers/PostController')

routes.get('/api/v1/post/me', postController.Index)
routes.post('/api/v1/post/me', upload.single('image'), postController.Store)

module.exports = routes
