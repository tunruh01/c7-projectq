import { combineReducers } from "redux";
import QuestionsReducer from "./questionsReducer";
import QuestionOrderReducer from "./questionsOrderReducer";
import CategoryReducer from "./categoryReducer";
import AnswerReducer from "./answersReducer";
import AuthReducer from "./authReducer";
import TotalPagesReducer from "./totalPagesReducer";
import QuestionDetailReducer from "./questionDetailReducer";
import { reducer as formReducer } from "redux-form";
import upvoteReducer from "./upvoteReducer";

const rootReducer = combineReducers({
  questions: QuestionsReducer,
  questionOrder: QuestionOrderReducer,
  category: CategoryReducer,
  questionDetails: QuestionDetailReducer,
  answers: AnswerReducer,
  total_pages: TotalPagesReducer,
  auth: AuthReducer,
  form: formReducer,
  upvotes: upvoteReducer
});

export default rootReducer;
