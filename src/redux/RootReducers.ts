import { combineReducers } from '@reduxjs/toolkit';
import answersReducer from './reducers/AnswersReducer';

const RootReducer = combineReducers({
    answers: answersReducer,
});

export default RootReducer;


