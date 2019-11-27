const express = require("express");
const router = express.Router();
const Topics = require("../models/topic");

router.get("/topic", (req, res) => {
  topic.find()
    .exec((err, Topics) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(topics);
      }
    });
});

module.exports = router;

