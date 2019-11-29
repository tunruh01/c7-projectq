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
  

export function fetchCategories() {
    const request = axios
        .get(`/api/topics/`)
        .catch(function(error){
        console.log('error: ', error);
        });
  return {
      type: FETCH_CATEGORIES,
      payload: request
  };
};

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
