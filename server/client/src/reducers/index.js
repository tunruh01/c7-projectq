import { combineReducers } from "redux";
import QuestionsReducer from "./questionsReducer";
import CategoryReducer from './categoryReducer';
import AnswerReducer from './answersReducer';
import AuthReducer from './authReducer'
import TotalPagesReducer from './totalPagesReducer'
import QuestionDetailReducer from './questionDetailReducer'

const rootReducer = combineReducers({
questions: QuestionsReducer,
category: CategoryReducer,
questionDetails: QuestionDetailReducer,
answers: AnswerReducer,
auth: AuthReducer,
total_pages: TotalPagesReducer
});

export default rootReducer;