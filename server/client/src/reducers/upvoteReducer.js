import { UPVOTE_ANSWER } from '../actions/actions';


export default function(state = 0, action) {
  switch (action.type) {
    case UPVOTE_ANSWER:
      // No reducer necessary - Upvote data stored on back end
      return state;
    default:
      return state;
  }
}
