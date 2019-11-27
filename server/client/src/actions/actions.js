import axios from "axios";

export const FETCH_CATEGORIES = 'fetch_categories';
export const FETCH_QUESTIONS = 'fetch_questions';
// export const FETCH_ANSWERS = 'fetch_answers';
// export const SUBMIT_QUESTION = 'submit_question';
// export const SUBMIT_ANSWER = 'submit_answer';

export const fetchQuestions = () => {

  const request = axios
    .get(`/api/questions/`)
    .catch(function(error){
    console.log('error: ', error);
  });
  return {
    type: FETCH_QUESTIONS,
    payload: request
  };
};
  // This is normally an axios call - returning questions from database. Hardcoding example of what normally should be returned
  // const fakeGetQuestionsRequest = {
  //   "pageNum": 0,
  //   "questionsPerPage": 0,
  //   "totalNumQuestions": 0,
  //   "questions": [
  //     {
  //       "id": "3333",
  //       "topics": [
  //         {
  //           "id": "4",
  //           "name": "Food"
  //         }
  //       ],
  //       "question": "Why does cheese taste good regardless of temerature?",
  //       "questionScore": 11,
  //       "answerCount": 5,
  //       "topAnswer": {
  //         "id": "2",
  //         "questionId": "3333",
  //         "user": {
  //           "id": "667",
  //           "userName": "RobertRoss111",
  //           "userCred": "Cheese Enthusiast",
  //           "userAvatar": "string"
  //         },
  //         "answer": "Dude stop thinking so much and help me finish eating this block of cheese",
  //         "answerDate": "string",
  //         "answerScore": 125,
  //         "userUpvoted": true,
  //         "userDownvoted": true
  //       }
  //     }
  //   ]
  // }
  

export function fetchCategories() {
    // const request = axios
    //     .get(`${ROOT_URL}?category=`)
    //     .catch(function(error){
    //         console.log('error: ', error);
    //     });

  const fakeGetCategoryRequest = {
    'topics': [
    {'id': '1', 'name': 'Health'},
    {'id': '2', 'name': 'Technology'},
    {'id': '3', 'name': 'Finance'}
  ]}

  return {
      type: FETCH_CATEGORIES,
      payload: fakeGetCategoryRequest
  };
};

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
