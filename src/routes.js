module.exports = function (io) {
  const express = require('express')
  const routes = express.Router()
  const multer = require('multer')
  const multerCfg = require('./config/upload')
  const upload = multer(multerCfg)

  const postController = require('./app/controllers/PostController')
  const likeController = require('./app/controllers/LikeController')

  /**
   * Socket.io
   */
  routes.use((req, res, next) => {
    req.io = io
    next()
  })

  routes.get('/api/v1/posts/me', postController.Index)
  routes.post('/api/v1/post/me', upload.single('image'), postController.Store)
  routes.post('/api/v1/post/:id/like', likeController.Store)

  return routes
}
