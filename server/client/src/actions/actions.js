import axios from "axios";

export const FETCH_CATEGORIES = "fetch_categories";
export const FETCH_QUESTIONS = "fetch_questions";
export const FETCH_QUESTION_DETAILS = 'fetch_question_details'
export const FETCH_ANSWERS = 'fetch_answers';
export const CREATE_QUESTION = 'create_question';
// export const SUBMIT_ANSWER = 'submit_answer';
export const AUTH_USER = "auth_user";

const ROOT_URL = '/api';

export const fetchQuestions = (page = 1) => {
  const request = axios
    .get(`${ROOT_URL}/questions?page=${page}`, { withCredentials: true })
    .catch(function(error) {
      console.log("error: ", error);
    });
  return {
    type: FETCH_QUESTIONS,
    payload: request
  };
};

export function fetchCategories() {
  const request = axios
    .get(`${ROOT_URL}/topics/`, { withCredentials: true })
    .catch(function(error) {
      console.log("error: ", error);
    });
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export const fetchQuestionDetails = (id) => {
  const request = axios
    .get(`${ROOT_URL}/question/${id}`, { withCredentials: true })
    .catch(function(error) {
      console.log("error: ", error);
    });
  return {
    type: FETCH_QUESTION_DETAILS,
    payload: request
  };
};

export const fetchAnswers = (questionid, page = 1) => {
  const request = axios
    .get(`${ROOT_URL}/question/${questionid}/answers?page=${page}`, { withCredentials: true })
    .catch(function(error) {
      console.log("error: ", error);
    });
  return {
    type: FETCH_ANSWERS,
    payload: request
  };
};

export function createQuestion(values, callback) {
  const request = axios.post(`${ROOT_URL}/question`, values)

  request.then(() => callback());

  return {
    type: CREATE_QUESTION,
    payload: request
  };
}

export function fetchLoginStatus() {
  const request = axios
    .get(`/auth/login/success`, { withCredentials: true })
    .catch(err => {
      console.log(err);
    });
  return {
    type: AUTH_USER,
    payload: request
  };
}
