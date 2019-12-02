import { AUTH_USER } from "../actions/actions";

const DEFAULT_STATE = {
  user: {},
  error: null,
  authenticated: false
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      if (action.payload) {
        if (
          action.payload.isAxiosError &&
          action.payload.response.status === 401
        ) {
          let newState = Object.assign({}, state);
          newState.error = action.payload;
          return newState;
        } else {
          let newState = Object.assign({}, state);
          newState.authenticated = true;
          newState.user = action.payload.data.user;
          return newState;
        }
      }
    default:
      return state;
  }
}
