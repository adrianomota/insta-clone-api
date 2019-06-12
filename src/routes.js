const express = require('express')
const routes = express.Router()
const multer = require('multer')
const io = require('./app/middlewares/io')

const multerCfg = require('./config/upload')
const upload = multer(multerCfg)

const postController = require('./app/controllers/PostController')
const likeController = require('./app/controllers/LikeController')

routes.use(io)

routes.get('/api/v1/post/me', postController.Index)
routes.post('/api/v1/post/me', upload.single('image'), postController.Store)
routes.post('/api/v1/post/:id/like', likeController.Store)

module.exports = routes
