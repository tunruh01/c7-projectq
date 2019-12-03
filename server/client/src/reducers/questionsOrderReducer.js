import { FETCH_QUESTIONS, FETCH_QUESTIONS_NEW } from "../actions/actions";

import { normalize, schema } from "normalizr";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
    case FETCH_QUESTIONS_NEW:
      if (action.payload.data) {
        console.log("Order Reduce API Resp: ", action.payload.data);
        const questionSchema = new schema.Entity(
          "questions",
          {},
          { idAttribute: "_id" }
        );

        const questionListSchema = new schema.Array(questionSchema);

        const normalizedOrder = normalize(
          action.payload.data.questions,
          questionListSchema
        ).result;

        let returnObj = [];
        if (action.type === FETCH_QUESTIONS_NEW) {
          console.log("questions order added NEW");
          returnObj = [...normalizedOrder];
        } else {
          console.log("questions order added");
          returnObj = [...state, ...normalizedOrder];
        }

        return returnObj;
      }
      return state;
    default:
      return state;
  }
}
