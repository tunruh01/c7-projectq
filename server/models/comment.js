const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CommentSchema = new Schema({
  id: String,
  comment: String,
  userId: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  score: Number,
  dateAdded: Date,
  dateModified: Date,
  answer: [{ type: Schema.Types.ObjectId, ref: 'answer' }]
})


module.exports = mongoose.model('comment', CommentSchema)

