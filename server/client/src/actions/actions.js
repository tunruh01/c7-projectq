import axios from "axios";
// export const FETCH_CATEGORIES = 'fetch_categories';
export const FETCH_QUESTIONS = 'fetch_questions';
// export const FETCH_ANSWERS = 'fetch_answers';
export const SUBMIT_QUESTION = 'submit_question';
// export const SUBMIT_ANSWER = 'submit_answer';
export const CREATE_QUESTION = 'create_question';
export const ROOT_URL = '/api';

export const fetchQuestions = () => {

  // This is normally an axios call - returning questions from database. Hardcoding example of what normally should be returned
  const fakeGetQuestionsRequest = {
    "pageNum": 0,
    "questionsPerPage": 0,
    "totalNumQuestions": 0,
    "questions": [
      {
        "id": "3333",
        "topics": [
          {
            "id": "4",
            "name": "Food"
          }
        ],
        "question": "Why does cheese taste good regardless of temerature?",
        "questionScore": 11,
        "answerCount": 5,
        "topAnswer": {
          "id": "2",
          "questionId": "3333",
          "user": {
            "id": "667",
            "userName": "RobertRoss111",
            "userCred": "Cheese Enthusiast",
            "userAvatar": "string"
          },
          "answer": "Dude stop thinking so much and help me finish eating this block of cheese",
          "answerDate": "string",
          "answerScore": 125,
          "userUpvoted": true,
          "userDownvoted": true
        }
      }
    ]
}
  return {
    type: FETCH_QUESTIONS,
    payload: fakeGetQuestionsRequest
  };
}
// // export function fetchCategories() {
// //     const request = axios
// //         .get(`${ROOT_URL}?category=`)
// //         .catch(function(error){
// //             console.log('error: ', error);
// //         });
// //     return {
// //         type: FETCH_CATEGORIES,
// //         payload: request
// //     };
// // };

// export function fetchQuestions(category) {
//     const request = axios
//     .get(`${ROOT_URL}?category=${category}`)
//     .catch(function(error){
//         console.log('error: ', error);
//     });
// return {
//     type: FETCH_QUESTIONS,
//     payload: request
// };
// };

// export function fetchAnswers(question) {
//     const request = axios
//     .get(`${ROOT_URL}?question=${question}`)
//     .catch(function(error){
//         console.log('error: ', error);
//     });
// return {
//     type: FETCH_ANSWERS,
//     payload: request
// };
// };



export function createQuestion (values) {
  const request = axios.post(`${ROOT_URL}/question`, values)
  // request.then(() => callback());

  return {
      type: CREATE_QUESTION,
      payload: request
  };
};