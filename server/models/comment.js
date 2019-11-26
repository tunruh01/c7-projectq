const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Answer = require('./answer')
const User = require('./user')

const CommentSchema = new Schema({
  id: String,
  comment: String,
  userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  score: Number,
  dateAdded: Date,
  dateModified: Date,
  answer: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
})


module.exports = mongoose.model('Comment', CommentSchema)

