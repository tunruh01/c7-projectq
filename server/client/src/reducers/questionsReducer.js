import { FETCH_QUESTIONS } from '../actions/actions';


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      console.log(action.payload)

      return {'asdf':'result of FETCH_QUESTIONS reducer'};

    default:
      return state;
  }
}
