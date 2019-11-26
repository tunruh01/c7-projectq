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

    //   answer.answer = faker.lorem.sentence()
    //   answer.userId = faker.random.number()
    //   answer.questionId = faker.random.number()
    //   answer.score = faker.random.number()
    //   answer.dateAdded = faker.date.recent()
    //   answer.dateModified = faker.date.recent()
    //   answer.comments = faker.lorem.text()
      
      
    //   answer.save((err) => {
    //     if (err) throw err
    //   })
    //   res.end()

    //     comment.id = faker.random.number()
    //     comment.comment = faker.lorem.sentence()
    //     comment.userId = faker.random.number()
    //     comment.score = faker.random.number()
    //     comment.dateAdded = faker.date.recent()
    //     comment.dateModified = faker.date.recent()
    //     comment.answerId = faker.random.number()
    

    //     comment.save((err) => {
    //     if (err) throw err
    // })
     
    //     question.id = faker.random.number()
    //     question.topic = faker.lorem.text()
    //     question.question = faker.lorem.sentence()
    //     question.userId = faker.random.number()
    //     question.answers = faker.lorem.text()
    //     question.dateAdded = faker.date.recent()
    //     question.dateModified = faker.date.recent()

    //     question.save((err) => {
    //         if (err) throw err
    //     })


    //     topic.id = faker.lorem.text()
    //     topic.comment = faker.lorem.text()
        

    //     topic.save((err) => {
    //         if (err) throw err
    //     })


        user.googleId = faker.random.number()
        user.name = faker.name.firstName()
        user.email = faker.internet.email()
        user.avatar = faker.image.avatar()
        user.dateCreated = faker.date.recent()
        user.dateModified = faker.date.recent()
        //check to make sure the following 2 credentials fakers are right based on the example schema
        user.credentials.creditial = faker.lorem.text()
        user.credentials.answers = faker.lorem.text()
        user.answers = faker.lorem.sentence()
        user.questions = faker.lorem.sentence()
        user.comments = faker.lorem.text()
        user.upvotedAnswers = faker.lorem.text()
        user.upvotedComments = faker.lorem.text()
        user.downvotedAnswers = faker.lorem.text()
        user.downvotedComments = faker.lorem.text()


        user.save((err) => {
            if (err) throw err
        })
        res.end()

    }

    // answer.save((err) => {
    //     if (err) throw err
    })



module.exports = router