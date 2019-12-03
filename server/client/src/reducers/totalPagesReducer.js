import { FETCH_QUESTIONS, FETCH_ANSWERS } from "../actions/actions";

export default function(state = 0, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      let totalQuestions = action.payload.data.totalNumQuestions;
      let questionsPerPage = action.payload.data.questionsPerPage;
      let totalQuestionPages = Math.ceil(totalQuestions / questionsPerPage);
      return totalQuestionPages;
    case FETCH_ANSWERS:
      let totalAnswers = action.payload.data.totalNumAnswers;
      let answersPerPage = action.payload.data.answersPerPage;
      let totalAnswerPages = Math.ceil(totalAnswers / answersPerPage);
      return totalAnswerPages;
    default:
      return state;
  }
}
