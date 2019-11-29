import { combineReducers } from "redux";
import QuestionsReducer from "./questionsReducer";
import CategoryReducer from './categoryReducer';
import AnswerReducer from './answersReducer';
import AuthReducer from './authReducer'

const rootReducer = combineReducers({
questions: QuestionsReducer,
category: CategoryReducer,
answers: AnswerReducer,
auth: AuthReducer
});

export default rootReducer;