const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

class PostController {
  async Index (req, res) {
    const posts = await Post.find().sort('-createdAt')

    return res.status(200).json(posts)
  }

  async Store (req, res) {
    const { author, place, description, hashtags } = req.body
    const { filename: image } = req.file
    const [name, ext] = image.split('.')
    const fileName = `${name}.${ext}`

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', image))

    fs.unlinkSync(req.file.path)

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
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
