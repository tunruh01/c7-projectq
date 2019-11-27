import { combineReducers } from "redux";
import QuestionsReducer from "./questionsReducer";
import CategoryReducer from './categoryReducer';
import AnswerReducer from './answersReducer';

const rootReducer = combineReducers({
questions: QuestionsReducer,
category: CategoryReducer,
answers: AnswerReducer
});

export default rootReducer;