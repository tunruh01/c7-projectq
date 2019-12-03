import { AUTH_USER } from "../actions/actions";

const DEFAULT_STATE = {
  user: {},
  error: null,
  authenticated: false
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      console.log("=====================================================");
      console.log("Action Type: ", action.type);
      console.log("Old State: ", state);
      if (action.payload) {
        if (
          action.payload.isAxiosError &&
          action.payload.response.status === 401
        ) {
          let newState = Object.assign({}, state);
          newState.error = action.payload;
          console.log("New State: ", newState);
          console.log("=====================================================");
          return newState;
        } else {
          let newState = Object.assign({}, state);
          newState.authenticated = true;
          newState.user = action.payload.data.user;
          console.log("New State: ", newState);
          console.log("=====================================================");
          return newState;
        }
      }
      console.log("New State: ", state);
      console.log("=====================================================");
      return state;
    default:
      console.log("=====================================================");
      console.log("Action Type: ", action.type);
      console.log("State: ", state);
      console.log("=====================================================");
      return state;
  }
}
