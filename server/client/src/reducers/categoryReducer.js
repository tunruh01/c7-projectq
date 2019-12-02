import { FETCH_CATEGORIES } from '../actions/actions';

const DEFAULT_STATE = {
    topics: []
  }
  
  export default function(state = DEFAULT_STATE, action) {
    switch (action.type) {
      case FETCH_CATEGORIES:
        if (action.payload) {
          let newState = Object.assign({}, state)
          // Add each question object to arr and push to state/store
          action.payload.data.forEach(topic => {
            newState.topics.push(topic)
          })
          return newState;
        }
        return state;
      default:
        return state;
    }
  }