const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: String,
  dateCreated: Date,
  dateModified: Date
});

module.exports = mongoose.model("Topic", TopicSchema);
