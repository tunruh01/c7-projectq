import axios from "axios";

export const FETCH_CATEGORIES = "fetch_categories";
export const FETCH_QUESTIONS = "fetch_questions";
export const FETCH_QUESTIONS_NEW = "fetch_questions_new";
export const FETCH_QUESTION_DETAILS = "fetch_question_details";
export const FETCH_ANSWERS = "fetch_answers";
export const FETCH_ANSWERS_NEW = "fetch_answers_new";
export const UPVOTE_ANSWER = "upvote_answer";
export const CREATE_QUESTION = "create_question";
export const CREATE_ANSWER = "create_answer";
export const SELECT_CATEGORY = "select_category";
// export const SUBMIT_ANSWER = 'submit_answer';
export const AUTH_USER = "auth_user";

const ROOT_URL = "/api";

export const fetchQuestions = (
  page = 1,
  topicId,
  reset = false
) => dispatch => {
  axios
    .get(`${ROOT_URL}/questions?page=${page}&topicId=${topicId}`, {
      withCredentials: true
    })
    .then(function(response) {
      dispatch({
        type: reset ? FETCH_QUESTIONS_NEW : FETCH_QUESTIONS,
        payload: response
      });
    })
    .catch(function(error) {
      console.log("error: ", error);
    });
};

export const fetchCategories = () => dispatch => {
  axios
    .get(`${ROOT_URL}/topics/`, { withCredentials: true })
    .catch(function(error) {
      console.log("error: ", error);
    })
    .then(function(response) {
      dispatch({
        type: FETCH_CATEGORIES,
        payload: response
      });
    })
    .catch(function(error) {
      console.log("error: ", error);
    });
};

export const selectCategory = categoryId => dispatch => {
  console.log("category clicked");
  dispatch({
    type: SELECT_CATEGORY,
    payload: categoryId
  });
};

export const fetchQuestionDetails = id => dispatch => {
  axios
    .get(`${ROOT_URL}/question/${id}`, { withCredentials: true })
    .catch(function(error) {
      console.log("error: ", error);
    })
    .then(function(response) {
      dispatch({
        type: FETCH_QUESTION_DETAILS,
        payload: response
      });
    })
    .catch(function(error) {
      console.log("error: ", error);
    });
};

export const fetchAnswers = (
  questionid,
  page = 1,
  reset = false
) => dispatch => {
  axios
    .get(`${ROOT_URL}/question/${questionid}/answers?page=${page}`, {
      withCredentials: true
    })
    .then(function(response) {
      let test = {};
      dispatch({
        type: reset ? FETCH_ANSWERS_NEW : FETCH_ANSWERS,
        payload: response
      });
    })
    .catch(function(error) {
      console.log("error: ", error);
    });
};

export const upvoteAnswer = answerid => dispatch => {
  axios
    .post(
      `${ROOT_URL}/answer/${answerid}/upvote`,
      { upvoted: true },
      {
        withCredentials: true
      }
    )
    .then(function(response) {
      dispatch({
        type: UPVOTE_ANSWER,
        payload: response
      });
    })
    .catch(function(error) {
      console.log("error: ", error);
    });
};

export const createQuestion = (values, callback) => dispatch => {
  axios
    .post(`${ROOT_URL}/question`, values, {
      withCredentials: true
    })
    .then(function(response) {
      dispatch({
        type: CREATE_QUESTION,
        payload: response
      });

      if (callback) {
        callback();
      }
    })
    .catch(function(error) {
      console.log("error: ", error);
    });
};
export const createAnswer = (questionid, values, callback) => dispatch => {
  axios
    .post(`${ROOT_URL}/question/${questionid}/answer`, values, {
      withCredentials: true
    })
    .then(function(response) {
      dispatch(fetchAnswers(questionid, 1, true));

      if (callback) {
        callback();
      }
    })
    .catch(function(error) {
      console.log("error: ", error);
    });
};

export const fetchLoginStatus = () => dispatch => {
  axios
    .get(`/auth/login/success`, { withCredentials: true })
    .then(function(response) {
      dispatch({
        type: AUTH_USER,
        payload: response
      });
    })
    .catch(function(error) {
      console.log("error: ", error);
    });
};
