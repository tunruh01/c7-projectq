import { FETCH_CATEGORIES, SELECT_CATEGORY } from "../actions/actions";

const DEFAULT_STATE = {
  topics: [],
  selectedTopic: ""
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      if (action.payload) {
        let newState = Object.assign({}, state);
        newState.topics = [];
        // Add each question object to arr and push to state/store
        action.payload.data.forEach(topic => {
          newState.topics.push(topic);
        });
        return newState;
      }
      return state;
    case SELECT_CATEGORY:
      if (action.payload) {
        let newState = Object.assign({}, state);
        Object.assign(newState, { selectedTopic: action.payload });
        return newState;
      }
      return state;
    default:
      return state;
  }
}
