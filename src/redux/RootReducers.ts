import { combineReducers } from '@reduxjs/toolkit';
import questionsReducer from './reducers/QuestionsReducer';

const RootReducer = combineReducers({
    questions: questionsReducer,
});

export default RootReducer;

