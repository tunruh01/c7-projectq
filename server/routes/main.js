const { UserAuthCheck } = require("./user-check");
const router = require("express").Router();
const Answer = require("../models/answer");
const Comment = require("../models/comment");
const Question = require("../models/question");
const Topic = require("../models/topic");
const User = require("../models/user");

sendGenericError = (res, text) => {
  res.status(500).json({
    success: false,
    message: text
  });
};

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
    if (err) {
      console.log(err);
    }
    if (!user) {
      sendGenericError(res, "User Not Found");
    } else {
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
            if (err) {
              console.log(err);
              sendGenericError(res, err);
            } else {
              let getTopAnswer = question => {
                let firstAnswer = question.answers.length
                  ? question.answers[0]
                  : null;

                let topAnswer = {};

                if (firstAnswer) {
                  topAnswer._id = firstAnswer._id;
                  topAnswer.user = {
                    _id: "",
                    name: "",
                    cred: "",
                    avatar: ""
                  };

                  if (firstAnswer.userId) {
                    topAnswer.user._id = firstAnswer.userId._id;
                    topAnswer.user.userName = firstAnswer.userId.name;

                    let cred = firstAnswer.userId.credentials.find(credential =>
                      credential.answers
                        .toString()
                        .includes(topAnswer._id.toString())
                    );

                    topAnswer.user.userCred = cred;
                    topAnswer.user.userAvatar = firstAnswer.userId.avatar;
                  }

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
                    questionDate: question.dateAdded,
                    topAnswer: getTopAnswer(question)
                  };
                })
              });
            }
          });
        });
    }
  });
});

router.post("/question", UserAuthCheck, (req, res) => {
  User.findOne({ googleId: req.user.googleId }).exec((err, user) => {
    if (err) {
      console.log(err);
    }

    if (!user) {
      sendGenericError(res, "User Not Found");
    } else {
      let newQuestion = new Question();

      //lets build a seperate response so we don't just have to
      //re-populate things like topics since we're already searching them
      let response = { topics: [], user: {} };

      let topics = req.body.topics;

      Topic.find({
        _id: {
          $in: topics
        }
      })
        .lean()
        .exec((err, foundTopics) => {
          if (err) {
            console.log(err);
          }
          if (foundTopics) {
            newQuestion.topics = foundTopics.map(topic => {
              return topic._id;
            });

            //go ahead and add these here so we don't have to repopulate
            response.topics = foundTopics.map(topic => {
              return { _id: topic._id, name: topic.name };
            });
          }

          newQuestion.userId = user._id;
          newQuestion.question = req.body.question;
          newQuestion.dateAdded = Date.now();
          newQuestion.save((err, question) => {
            if (err) console.log(err);
            response.user._id = user._id;
            response.user.userName = user.name;
            response.user.userAvatar = user.avatar;
            response._id = question._id;
            response.question = question.question;
            response.answerCount = question.answers.length;
            response.questionDate = question.dateAdded;
            res.send(response);
            user.questions.push(question._id);
            user.save((err, user) => {
              if (err) console.log(err);
            });
          });
        });
    }
  });
});

//
router.post("/question/:questionId/answer", UserAuthCheck, (req, res, next) => {
  User.findOne({ googleId: req.user.googleId }).exec((err, user) => {
    if (err) {
      console.log(err);
    }
    if (!user) {
      sendGenericError(res, "User Not Found");
    } else {
      let newAnswer = new Answer();
      const questionId = req.params.questionId;
      // const answersObj = Answer.find({ questionId });
      Question.findById(questionId).exec((err, question) => {
        if (err) console.log("ERROR: ", err);
        newAnswer.questionId = questionId;
        newAnswer.userId = user._id;
        newAnswer.answer = req.body.answer;
        newAnswer.dateAdded = Date.now();
        newAnswer.save((err, answer) => {
          if (err) console.log(err);
          let response = { user: {} };
          response.user._id = user._id;
          response.user.userName = user.name;
          response.user.userAvatar = user.avatar;
          response.userCred = req.body.credential;
          response._id = answer._id;
          response.answer = answer.answer;
          response.questionId = answer.questionId;
          response.answerDate = answer.dateAdded;
          response.answerScore = answer.score;
          response.userUpvoted = false;
          response.userDownvoted = false;
          response.comments = [];
          question.answers.push(answer._id);
          question.save((err, user) => {
            if (err) console.log(err);
            user.answers.push(answer._id);
            if (!user.credentials) {
              user.credentials = [];
            }
            let lookCred = user.credentials.find(
              cred => cred === req.body.credential
            );
            if (!lookCred) {
              lookCred = {
                credential: req.body.credential,
                answers: []
              };
              lookCred.answers.push(answer._id);
              user.credentials.push(lookCred);
            } else {
              lookCred.answers.push(answer._id);
            }
            user.save((err, user) => {
              if (err) console.log(err);
              res.send(response);
            });
          });
        });
      });
    }
  });
});

router.get("/topics", UserAuthCheck, (req, res) => {
  const getTopic = Topic.find();
  getTopic.exec((err, topics) => {
    if (err) console.log(err);
    res.send(topics);
  });
});

// Returns the answers related to the requested questionId sorted by descending popularity/score
router.get("/question/:questionId/answers", UserAuthCheck, (req, res) => {
  const questionId = req.params.questionId;
  const answersObj = Answer.find({ questionId });
  const page = req.query.page || 1;
  const perPage = 7;
  let totalNumAnswers = 0;

  Answer.countDocuments({ questionId }, (err, count) => {
    if (err) console.log("ERROR: ", err);
    totalNumAnswers = count;
    User.findOne(
      { googleId: req.user.googleId },
      { upvotedAnswers: 1, downvotedAnswers: 1, lean: true }
    ).exec((err, user) => {
      if (err) console.log("ERROR: ", err);
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
                  userCred: answer.userId.credentials.find(
                    credential =>
                      credential.answers.indexOf(answer._id.toString()) >= 0
                  ),
                  userAvatar: answer.userId.avatar
                },
                userUpvoted:
                  userUpvotedAnswers.indexOf(answer._id.toString()) >= 0,
                userDownvoted:
                  userDownvotedAnswers.indexOf(answer._id.toString()) >= 0,
                comments: []
              };
            })
          });
        });
    });
  });
});

// Returns the answers related to the requested questionId sorted by descending popularity/score
router.get("/question/:questionId", UserAuthCheck, (req, res) => {
  const questionId = req.params.questionId;
  Question.findById(questionId)
    .populate("topics", "_id name")
    .populate("userId", "name avatar")
    .lean()
    .exec((err, question) => {
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
        answerCount: question.answers.length,
        questionDate: question.dateAdded
      });
    });
});

attemptUpdateScore = (req, res, voteType) => {
  User.findOne(
    { googleId: req.user.googleId },
    { upvotedAnswers: 1, downvotedAnswers: 1 }
  ).exec((err, user) => {
    if (err) {
      console.log(err);
    }
    if (!user) {
      sendGenericError(res, "User Not Found");
    } else {
      const answerId = req.params.answerId;
      const newUpvoteState = req.body.upvoted;
      const newDownvoteState = req.body.downvoted;

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

router.get("/user", UserAuthCheck, (req, res) => {
  User.findOne({ googleId: req.user.googleId })
    .populate("topics", "_id name")
    .populate({
      path: "questions",
      select: "_id topics question answers",
      populate: { path: "topics" }
    })
    .populate({
      path: "answers",
      select: "_id questionId dateAdded score",
      populate: { path: "questionId", select: "question" }
    })
    .lean()
    .exec((err, user) => {
      res.send({
        _id: user._id,
        userName: user.name,
        userCreds: user.credentials.map(cred => {
          return cred.credential;
        }),
        userAvatar: user.avatar,
        usersAnswers: user.answers.map(answer => {
          return {
            _id: answer._id,
            answerDate: answer.dateAdded,
            answer: answer.answer,
            answerScore: answer.score,
            question: answer.questionId ? answer.questionId.question : null
          };
        }),
        usersQuestions: user.questions.map(question => {
          return {
            _id: question._id,
            topics: question.topics.map(topic => {
              return { _id: topic._id, name: topic.name };
            }),
            questionDate: question.dateAdded,
            question: question.question,
            answerCount: question.answers.length
          };
        })
      });
    });
});

module.exports = router;
