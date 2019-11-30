import { combineReducers } from "redux";
import QuestionsReducer from "./questionsReducer";
import CategoryReducer from './categoryReducer';
import AnswerReducer from './answersReducer';
import AuthReducer from './authReducer'
import TotalPagesReducer from './totalPagesReducer'

const rootReducer = combineReducers({
questions: QuestionsReducer,
category: CategoryReducer,
answers: AnswerReducer,
auth: AuthReducer,
total_pages: TotalPagesReducer
});

export default rootReducer;