const Post = require('../models/Post')

class LikeController {
  async Store (req, res) {
    const post = await Post.findById(req.params.id)

    post.likes += 1

    await post.save()

    req.io.emit('like', post)

    return res.json({
      success: true,
      data: post,
      message: 'post saved successfully'
    })
  }
}

module.exports = new LikeController()
