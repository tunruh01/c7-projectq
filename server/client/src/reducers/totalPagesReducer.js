import { FETCH_QUESTIONS} from '../actions/actions';

export default function(state = 0, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      let totalQuestions = action.payload.data.totalNumQuestions
      let questionsPerPage = action.payload.data.questionsPerPage
      let totalPages = Math.ceil(totalQuestions/questionsPerPage)
      return totalPages;
    default:
      return state;
  }
}