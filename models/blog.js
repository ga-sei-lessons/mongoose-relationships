const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  header: String,
  content: String,
  date: Date
})

const blogPostSchema = new mongoose.Schema({
  title: String,
  body: String,
  // 1:M embedded
  comments: [commentSchema],
  // N:M ref
  tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
  // 1:M ref
  blogger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

module.exports = mongoose.model('BlogPost', blogPostSchema)