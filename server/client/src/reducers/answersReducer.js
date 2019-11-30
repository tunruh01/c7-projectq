import { FETCH_ANSWERS } from '../actions/actions';

const DEFAULT_STATE = {
  answersList: []
}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_ANSWERS:
      if (action.payload) {
        let newState = Object.assign({}, state)
        // Add each question object to arr and push to state/store
        action.payload.data.answers.forEach(answer => {
          newState.answersList.push(answer)
        })
        return newState;
      }
      return state;
    default:
      return state;
  }
}
