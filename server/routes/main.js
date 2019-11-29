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
router.get("/questions", UserAuthCheck, (req, res) => {
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
  User.findOne(
    { googleId: req.user.googleId },
    { upvotedAnswers: 1, downvotedAnswers: 1, lean: true }
  ).exec((err, user) => {
    let userUpvotedAnswers = user ? user.upvotedAnswers : [];
    let userDownvotedAnswers = user ? user.downvotedAnswers : [];
    Question.find(filterOptions)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .lean()
      .populate("topics", "_id name")
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
                credential.answers.toString().includes(topAnswer._id.toString())
              );

              topAnswer.user.userCred = cred;
              topAnswer.user.userAvatar = firstAnswer.userId.avatar;

              topAnswer.answer = firstAnswer.answer;
              topAnswer.answerDate = firstAnswer.dateAdded;
              topAnswer.answerScore = firstAnswer.score;
              topAnswer.userUpvoted = userUpvotedAnswers
                .toString()
                .includes(topAnswer._id.toString());
              topAnswer.userDownvoted = userDownvotedAnswers
                .toString()
                .includes(topAnswer._id.toString());

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
});

router.post("/question", UserAuthCheck, (req, res, next) => {
  User.findOne({ googleId: req.user.googleId }).exec((err, user) => {
    if (user) {
      let newQuestion = new Question();

      //lets build a seperate response so we don't just have to
      //re-populate things like topics since we're already searching them
      let response = { topics: [], user: {} };

      let topics = req.body.topics;

      for (let i = 0; i < topics.length; i++) {
        Topic.findById(topics[i], function(err, topic) {
          if (!err) {
            newQuestion.topics.push(topic._id);
            //go ahead and add these here so we don't have to repopulate
            response.topics.push({
              _id: topic._id,
              name: topic.name
            });
          }
        });
      }

      newQuestion.userId = user._id;
      newQuestion.question = req.body.question;
      newQuestion.save((err, question) => {
        if (err) console.log(err);
        response.user._id = user._id;
        response.user.userName = user.name;
        response.user.userAvatar = user.avatar;
        response._id = question._id;
        response.question = question.question;
        response.answerCount = question.answers.length;
        res.send(response);
        user.questions.push(question._id);
        user.save((err, user) => {
          if (err) console.log(err);
        });
      });
    }
  });
});

router.get("/topics", UserAuthCheck, (req, res) => {
  const getTopic = Topic.find();
  console.log("this is correct" + getTopic);

  getTopic.exec((err, topics) => {
    if (err) console.log(err);
    res.send(topics);
  });
});

// Returns the answers related to the requested questionId sorted by descending popularity/score
router.get("/question/:questionId/answers", UserAuthCheck, (req, res, next) => {
  const questionId = req.params.questionId;
  const answersObj = Answer.find({ questionId });
  const page = req.query.page || 1;
  const perPage = 7;
  let totalNumAnswers = 0;

  Answer.countDocuments({ questionId }, (err, count) => {
    if (err) console.log("ERROR: ", err);
    totalNumAnswers = count;
  });

  User.findOne(
    { googleId: req.user.googleId },
    { upvotedAnswers: 1, downvotedAnswers: 1, lean: true }
  ).exec((err, user) => {
    let userUpvotedAnswers = user ? user.upvotedAnswers : [];
    let userDownvotedAnswers = user ? user.downvotedAnswers : [];
    answersObj
      .populate("userId", "name credentials avatar")
      .sort({ score: "desc" })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec((err, answers) => {
        if (err) console.log(err);
        res.send({
          pageNum: parseInt(page, 10),
          answersPerPage: perPage,
          totalNumAnswers,
          answers: answers.map(answer => {
            return {
              _id: answer._id,
              questionId: answer.questionId,
              answer: answer.answer,
              answerDate: answer.dateAdded,
              answerScore: answer.score,
              user: {
                _id: answer.userId._id,
                userName: answer.userId.name,
                userCred: answer.userId.credentials.find(credential =>
                  credential.answers.toString().includes(answer._id.toString())
                ),
                userAvatar: answer.userId.avatar
              },
              userUpvoted: userUpvotedAnswers
                .toString()
                .includes(answer._id.toString()),
              userDownvoted: userDownvotedAnswers
                .toString()
                .includes(answer._id.toString()),
              comments: []
            };
          })
        });
      });
  });
});

// Returns the answers related to the requested questionId sorted by descending popularity/score
router.get("/question/:questionId", (req, res, next) => {
  const questionId = req.params.questionId;
  Question.findById(questionId)
    .populate("topics", "_id name")
    .populate("userId", "name avatar")
    .lean()
    .exec((err, question) => {
      if (err) console.log("ERROR: ", err);
      Answer.countDocuments({ questionId }, (err, count) => {
        if (err) console.log("ERROR: ", err);
        res.send({
          user: {
            _id: question.userId._id,
            userName: question.userId.name,
            userAvatar: question.userId.avatar
          },
          _id: question._id,
          topics: question.topics,
          question: question.question,
          answerCount: count
        });
      });
    });
});

attemptUpdateScore = (req, res, voteType) => {
  User.findOne(
    { googleId: req.user.googleId },
    { upvotedAnswers: 1, downvotedAnswers: 1 }
  ).exec((err, user) => {
    if (user) {
      const answerId = req.params.answerId;
      const newUpvoteState = req.body.upvoted;
      const newDownvoteState = req.body.downvoted;
      console.log(
        `answerId: ${answerId}`,
        `upvoteState: ${newUpvoteState}`,
        `downvoteState: ${newDownvoteState}`
      );

      let upScoreModifier = 0;
      let downScoreModifier = 0;
      let userPrevUpvotedAnswer = user.upvotedAnswers.includes(answerId);
      let userPrevDownvotedAnswer = user.downvotedAnswers.includes(answerId);

      switch (voteType) {
        case "upvote":
          //figure out if we should upvote/downvote/leave same
          if (newUpvoteState && !userPrevUpvotedAnswer) {
            upScoreModifier++;
            if (userPrevDownvotedAnswer) {
              downScoreModifier++;
            }
          } else if (!newUpvoteState && userPrevUpvotedAnswer) {
            upScoreModifier--;
          }
          break;
        case "downvote":
          //figure out if we should upvote/downvote/leave same
          if (newDownvoteState && !userPrevDownvotedAnswer) {
            downScoreModifier--;
            if (userPrevUpvotedAnswer) {
              upScoreModifier--;
            }
          } else if (!newDownvoteState && userPrevDownvotedAnswer) {
            downScoreModifier++;
          }
          break;
      }

      let newScore = upScoreModifier + downScoreModifier;

      //if an actual change should occur, do it
      if (newScore !== 0) {
        Answer.findByIdAndUpdate(
          answerId,
          { $inc: { score: newScore } },
          { new: true }
        ).exec((err, answer) => {
          if (err) console.log("ERROR: ", err);

          //add/remove from upvoted if needed
          if (
            upScoreModifier > 0 &&
            !user.upvotedAnswers.includes(answer._id)
          ) {
            user.upvotedAnswers.push(answer._id);
          } else if (
            upScoreModifier < 0 &&
            user.upvotedAnswers.includes(answer._id)
          ) {
            user.upvotedAnswers.splice(
              user.upvotedAnswers.indexOf(answer._id),
              1
            );
          }

          //add/remove from downvoted if needed
          if (
            downScoreModifier < 0 &&
            !user.downvotedAnswers.includes(answer._id)
          ) {
            user.downvotedAnswers.push(answer._id);
          } else if (
            downScoreModifier > 0 &&
            user.downvotedAnswers.includes(answer._id)
          ) {
            user.downvotedAnswers.splice(
              user.downvotedAnswers.indexOf(answer._id),
              1
            );
          }

          user.save(
            {
              upvotedAnswers: 1,
              downvotedAnswers: 1,
              new: true
            },
            (err, updatedUser) => {
              res.send({
                _id: answer._id,
                upvoted: updatedUser.upvotedAnswers.includes(answer._id),
                downvoted: updatedUser.downvotedAnswers.includes(answer._id),
                answerScore: answer.score
              });
            }
          );
        });
      } else {
        //client sent a no-op so just return the answer
        Answer.findById(answerId, (err, answer) => {
          res.send({
            _id: answer._id,
            upvoted: user.upvotedAnswers.includes(answer._id),
            downvoted: user.downvotedAnswers.includes(answer._id),
            answerScore: answer.score
          });
        });
      }
    }
  });
};

// post an upvote change to an answer
router.post("/answer/:answerId/upvote", UserAuthCheck, (req, res) => {
  attemptUpdateScore(req, res, "upvote");
});

// post a downvote change to an answer
router.post("/answer/:answerId/downvote", UserAuthCheck, (req, res) => {
  attemptUpdateScore(req, res, "downvote");
});

module.exports = router;
