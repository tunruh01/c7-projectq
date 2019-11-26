const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CredSchema = new Schema({
  credential: String,
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }]
});

const UserSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  avatar: String,
  dateCreated: Date,
  dateModified: Date,
  credentials: [CredSchema],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  upvotedAnswers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  upvotedComments: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  downvotedAnswers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  downvotedComments: [{ type: Schema.Types.ObjectId, ref: "Answer" }]
});

module.exports = mongoose.model("User", UserSchema);
