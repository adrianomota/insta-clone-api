const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

class PostController {
  async Index (req, res) {
    const posts = await Post.find().sort('-createAt')

    return res.json({
      success: true,
      data: posts,
      message: 'get posts successfully'
    })
  }

  async Store (req, res) {
    const { author, place, description, hastags } = req.body
    const { filename: image } = req.file
    const [name] = image.split('.')
    const fileName = `${name}.jpg`

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', image))

    fs.unlinkSync(req.file.path)

    const post = await Post.create({
      author,
      place,
      description,
      hastags,
      image: fileName
    })

    req.io.emit('post', post)

    return res.json({
      success: true,
      data: post,
      message: 'post created successfully'
    })
  }
}

module.exports = new PostController()
