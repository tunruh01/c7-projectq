const router = require("express").Router();
const faker = require("faker");
const Answer = require("../models/answer");
const Comment = require("../models/comment");
const Question = require("../models/question");
const Topic = require("../models/topic");
const User = require("../models/user");

// router.get('/generate-fake-data', (req, res, next) => {
//     // debugger;
//     for (let i = 0; i < 10; i++) {
//       // let answer = new Answer()
//       // let comment = new Comment()

//       // let topic = new Topic()
//       let user = new User()

//     //   answer.answer = faker.lorem.sentence()
//     //   answer.userId = faker.random.number()
//     //   answer.questionId = faker.random.number()
//     //   answer.score = faker.random.number()
//     //   answer.dateAdded = faker.date.recent()
//     //   answer.dateModified = faker.date.recent()
//     //   answer.comments = faker.lorem.text()

//     //   answer.save((err) => {
//     //     if (err) throw err
//     //   })
//     //   res.end()

//     //     comment.id = faker.random.number()
//     //     comment.comment = faker.lorem.sentence()
//     //     comment.userId = faker.random.number()
//     //     comment.score = faker.random.number()
//     //     comment.dateAdded = faker.date.recent()
//     //     comment.dateModified = faker.date.recent()
//     //     comment.answerId = faker.random.number()

//     //     comment.save((err) => {
//     //     if (err) throw err
//     // })

//     //     question.id = faker.random.number()
//     //     question.topic = faker.lorem.text()
//     //     question.question = faker.lorem.sentence()
//     //     question.userId = faker.random.number()
//     //     question.answers = faker.lorem.text()
//     //     question.dateAdded = faker.date.recent()
//     //     question.dateModified = faker.date.recent()

//     //     question.save((err) => {
//     //         if (err) throw err
//     //     })

//     //     topic.id = faker.lorem.text()
//     //     topic.comment = faker.lorem.text()

//     //     topic.save((err) => {
//     //         if (err) throw err
//     //     })

//         user.googleId = faker.random.number()
//         user.name = faker.name.firstName()
//         user.email = faker.internet.email()
//         user.avatar = faker.image.avatar()
//         user.dateCreated = faker.date.recent()
//         user.dateModified = faker.date.recent()
//         //check to make sure the following 2 credentials fakers are right based on the example schema
//         // user.credentials.credential = faker.lorem.text()
//         // user.credentials.answers = faker.lorem.text()

//         // user.questions = faker.lorem.sentence()
//         // user.comments = faker.lorem.text()
//         // user.upvotedAnswers = faker.lorem.text()
//         // user.upvotedComments = faker.lorem.text()
//         // user.downvotedAnswers = faker.lorem.text()
//         // user.downvotedComments = faker.lorem.text()

//         // create lots of questions
//         let questionsArr = [];
//         for (let i = 0; i < 1; ++i) {
//           debugger;
//           let question = new Question();
//           question.question = faker.lorem.text();

//           console.log('Question:\n', question);

//           // create lots of answers
//           for (let i = 0; i < 1; ++i) {
//             let answer = new Answer();
//             answer.answer = faker.lorem.text();
//             console.log('Answer:\n', answer);

//             question.answers.push(answer._id);
//             questionsArr.push(question);
//             answer.save();
//             question.save();

//           }

//         }
//         questionsArr.forEach((question, idx) => user.questions.push(question));
//         user.save();

//     }
//     res.end()
//     // answer.save((err) => {
//     //     if (err) throw err
//     })

// Returns the questions, ???? per page
router.get("/questions", (req, res, next) => {
  console.log("Query request:\n", req.query);

  let filterOptions = {};
  const page = req.query.page || 1;
  let perPage = 7;

  const keyword = req.query.query;
  const { topicId } = req.query;

  if (keyword) {
    const searchVal = keyword + ".*";
    filterOptions.question = new RegExp(searchVal, "gi");
  }

  if (topicId) {
    filterOptions.topics = topicId;
  }

  Question.find(filterOptions)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .populate("topics")
    .populate({
      path: "answers",
      populate: { path: "userId" },
      options: { sort: { score: -1 } }
    })
    .sort({ dateAdded: "desc" })
    .exec((err, questions) => {
      Question.count(filterOptions).exec((err, count) => {
        let getTopAnswer = question => {
          let firstAnswer = question.answers.length
            ? question.answers[0]
            : null;

          let topAnswer = {};

          if (firstAnswer) {
            topAnswer._id = firstAnswer._id;
            topAnswer.user = {};
            topAnswer.user._id = firstAnswer.userId._id;
            topAnswer.user.userName = firstAnswer.userId.name;

            let cred = firstAnswer.userId.credentials.find(credential =>
              credential.answers.includes(question._id)
            );

            topAnswer.user.userCred = "todo";
            topAnswer.user.userAvatar = firstAnswer.userId.avatar;

            topAnswer.answer = firstAnswer.answer;
            topAnswer.answerDate = firstAnswer.dateAdded;
            topAnswer.answerScore = firstAnswer.score;

            return topAnswer;
          }

          return null;
        };

        if (err) console.log(err);
        else {
          res.send({
            // questionsPerPage: ,
            // pageNum:
            pageNum: parseInt(page, 10),
            questionsPerPage: perPage,
            totalNumQuestions: count,
            questions: questions.map(question => {
              return {
                _id: question._id,
                topics: question.topics,
                question: question.question,
                answerCount: question.answers.length,
                topAnswer: getTopAnswer(question)
              };
            })
          });
        }
      });
    });
});

router.post('/question', (req, res, next) => {
  let newQuestion = new Question();

  newQuestion.topics = req.body.topics;
  newQuestion.question = req.body.question;

  newQuestion.save((err, question) => {
    if (err) console.log(err);
    res.send(question);
  })
});





module.exports = router;
