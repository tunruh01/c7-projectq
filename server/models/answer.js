const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer: String,
  userId: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  questionId: [{type: mongoose.Schema.Types.ObjectId, ref: 'question'}],
  score: Number,
  dateAdded: Date,
  dateModified: Date,
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}]
});

module.exports = mongoose.model('answer', AnswerSchema);