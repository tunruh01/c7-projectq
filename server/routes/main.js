const { UserAuthCheck } = require("./user-check");
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
router.get("/questions", UserAuthCheck, (req, res, next) => {
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
    .lean()
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
              credential.answers.includes(topAnswer._id)
            );

            topAnswer.user.userCred = cred;
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

router.post("/question", UserAuthCheck, (req, res, next) => {
  console.log(req.user);
  let newQuestion = new Question();

  let topics = req.body.topics;

  for (let i = 0; i < topics.length; i++) {
    Topic.findById(topics[i], function(err, topic) {
      if (!err) {
        newQuestion.topics.push(topic._id);
      }
    });
  }

  newQuestion.question = req.body.question;

  User.findOne({ googleId: req.user.googleId })
    .lean()
    .exec((err, user) => {
      if (user) {
        newQuestion.userId = user._id;
      }

      newQuestion.save((err, question) => {
        if (err) console.log(err);
        res.send(question);
      });
    });
});

router.get("/topics", (req, res) => {
  const getTopic = Topic.find();
  console.log("this is correct" + getTopic);

  getTopic.exec((err, topics) => {
    if (err) console.log(err);
    res.send(topics);

  })

});

// Returns the answers related to the requested questionId sorted by descending popularity/score 
router.get("/question/:questionId/answers", (req, res, next) => {
  const questionId = req.params.questionId;
  const answersObj = Answer.find({ questionId });
  const page = req.query.page || 1;
  const perPage = 7;
  let totalNumAnswers = 0;

  Answer.countDocuments({ questionId }, (err, count) => {
    if (err) console.log('ERROR: ', err);
    totalNumAnswers = count;
  });

  answersObj
    .sort({ score: 'desc' })
    .skip(perPage * (page - 1))
    .limit(perPage)
    .exec((err, answers) => {

      if (err) console.log(err);
      res.send({
        pageNum: parseInt(page, 10),
        answersPerPage: perPage,
        totalNumAnswers,
        answers
      });
    });

});

// post an upvote change to an answer
router.post('/answer/:answerId/upvote', (req, res, next) => {
  const answerId = req.params.answerId;
  const upvoteState = req.body.upvoteState;
  console.log(`answerId: ${answerId}`, `upvoteState: ${upvoteState}`)

  if (upvoteState == 'true') { // increment score
    Answer.findOneAndUpdate({ _id: answerId }, { $inc: { score: 1 } }).exec((err, answer) => {
      if (err) console.log('ERROR: ', err);
      console.log('Answer before upvote change: ', answer) // REMOVE for production
      Answer.find({_id: answerId}).exec((err, revisedAnswer) => {
        if (err) console.log('ERROR: ', err);
        console.log('Answer after upvote change: ', revisedAnswer) // REMOVE for production
        res.send({
          _id: revisedAnswer[0]._id,
          upvoted: true,
          answerScore: revisedAnswer[0].score
        });
      });
    });
  } else { // upvoted is false -> decrement score
    Answer.findOneAndUpdate({ _id: answerId }, { $inc: { score: -1 } }).exec((err, answer) => {
      if (err) console.log('ERROR: ', err);
      console.log('Answer before upvote change: ', answer) // REMOVE for production
      Answer.find({_id: answerId}).exec((err, revisedAnswer) => {
        if (err) console.log('ERROR: ', err);
        console.log('Answer after upvote change: ', revisedAnswer) // REMOVE for production
        res.send({
          _id: revisedAnswer[0]._id,
          upvoted: false,
          answerScore: revisedAnswer[0].score
        });
      });
    });
  }
});

// post a downvote change to an answer
router.post('/answer/:answerId/downvote', (req, res, next) => {
  const answerId = req.params.answerId;
  const downvoteState = req.body.downvoteState;
  console.log(`answerId: ${answerId}`, `downvoteState: ${downvoteState}`)

  if (downvoteState == 'true') { // decrement score
    Answer.findOneAndUpdate({ _id: answerId }, { $inc: { score: -1 } }).exec((err, answer) => {
      if (err) console.log('ERROR: ', err);
      console.log('Answer before downvote change: ', answer) // REMOVE for production
      Answer.find({_id: answerId}).exec((err, revisedAnswer) => {
        if (err) console.log('ERROR: ', err);
        console.log('Answer after downvote change: ', revisedAnswer) // REMOVE for production
        res.send({
          _id: revisedAnswer[0]._id,
          downvoted: true,
          answerScore: revisedAnswer[0].score
        });
      });
    });
  } else { // downvoted is false -> increment score
    Answer.findOneAndUpdate({ _id: answerId }, { $inc: { score: 1 } }).exec((err, answer) => {
      if (err) console.log('ERROR: ', err);
      console.log('Answer before downvote change: ', answer) // REMOVE for production
      Answer.find({_id: answerId}).exec((err, revisedAnswer) => {
        if (err) console.log('ERROR: ', err);
        console.log('Answer after downvote change: ', revisedAnswer) // REMOVE for production
        res.send({
          _id: revisedAnswer[0]._id,
          downvoted: false,
          answerScore: revisedAnswer[0].score
        });
      });
    });
  }
});

module.exports = router;
