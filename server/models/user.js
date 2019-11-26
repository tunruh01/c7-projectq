const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CredSchema = new Schema({
  credential: String,
  answers: [{ type: Schema.Types.ObjectId, ref: "answer" }]
});

const UserSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  avatar: String,
  dateCreated: Date,
  dateModified: Date,
  credentials: [CredSchema],
  answers: [{ type: Schema.Types.ObjectId, ref: "answer" }],
  questions: [{ type: Schema.Types.ObjectId, ref: "question" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  upvotedAnswers: [{ type: Schema.Types.ObjectId, ref: "answer" }],
  upvotedComments: [{ type: Schema.Types.ObjectId, ref: "answer" }],
  downvotedAnswers: [{ type: Schema.Types.ObjectId, ref: "answer" }],
  downvotedComments: [{ type: Schema.Types.ObjectId, ref: "answer" }]
});

module.exports = mongoose.model("user", UserSchema);
