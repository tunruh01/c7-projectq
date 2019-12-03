import { UPVOTE_ANSWER } from '../actions/actions';


export default function(state = {}, action) {
  switch (action.type) {
    case UPVOTE_ANSWER:
      if (action.payload) {
        let newState = Object.assign({}, state)
        console.log('upvote answer reducer payload: ', action.payload)
        return newState;
      }
      return state;
    default:
      return state;
  }
}
