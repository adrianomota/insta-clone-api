const Post = require('../models/Post')

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

    const post = await Post.create({
      author,
      place,
      description,
      hastags,
      image
    })
    return res.json({
      success: true,
      data: post,
      message: 'post created successfully'
    })
  }
}

module.exports = new PostController()
