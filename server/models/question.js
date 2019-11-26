const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
  id: String,
  topic: [{ type: Schema.Types.ObjectId, ref: 'topic' }],
  question: [{ type: String, ref: "question" }],
  userId: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'answer' }],
  dateAdded: Date,
  DateModified: Date
});

module.exports = mongoose.model("question", QuestionsSchema);