import { FETCH_ANSWERS, FETCH_ANSWERS_NEW } from "../actions/actions";

const DEFAULT_STATE = {
  answersList: []
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_ANSWERS_NEW:
    case FETCH_ANSWERS:
      if (action.payload) {
        let newState;

        if (action.type === FETCH_ANSWERS_NEW) {
          newState = JSON.parse(JSON.stringify(DEFAULT_STATE));
        } else {
          newState = JSON.parse(JSON.stringify(state));
        }
        // Add each question object to arr and push to state/store
        action.payload.data.answers.forEach(answer => {
          newState.answersList.push(answer);
        });
        return newState;
      }
      return state;
    default:
      return state;
  }
}
