import { AUTH_USER, AUTH_ERROR } from '../actions/actions'

const DEFAULT_STATE = {
  user: {},
  error: null,
  authenticated: false
}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      if (action.payload) {
        console.log('AUTH REDUCER PAYLOAD: ', action.payload);
        let newState = Object.assign({}, state)
          newState.authenticated = true
          newState.user = action.payload.data.user
        return newState;
      }
    case AUTH_ERROR:
      if (action.payload) {
        let newState = Object.assign({}, state)
        newState.error = action.payload
        return newState;
      }

    default:
      return state;
  }
}
