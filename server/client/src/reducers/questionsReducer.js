import { FETCH_QUESTIONS } from '../actions/actions';

const DEFAULT_STATE = {
  questionsList: []
}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      if (action.payload) {
        let newState = Object.assign({}, state)
        // Add each question object to arr and push to state/store
        action.payload.questions.forEach(question => {
          newState.questionsList.push(question)
        })
        return newState;
      }
      return state;
    default:
      return state;
  }
}
