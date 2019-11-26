const router = require('express').Router()
const faker = require('faker')
const Answer = require('../models/answer')
const Comment = require('../models/comment')
const Question = require('../models/question')
const Topic = require('../models/topic')
const User = require('../models/user')

router.get('/generate-fake-data', (req, res, next) => {
    // debugger;
    for (let i = 0; i < 5; i++) {
      let answer = new Answer()
      let comment = new Comment()
      let question = new Question()
      let topic = new Topic()
      let user = new User()

      answer.answer = faker.lorem.sentence()
      answer.userId = faker.random.number()
      answer.questionId = faker.random.number()
      answer.score = faker.random.number()
      answer.dateAdded = faker.date.recent()
      answer.dateModified = faker.date.recent()
      answer.comments = faker.lorem.text()

  
      answer.save((err) => {
        if (err) throw err
      })
    }
  
    res.end()
  
  
  })

  module.exports = router