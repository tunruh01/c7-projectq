const faker = require("faker");

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
