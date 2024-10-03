import { createSlice } from '@reduxjs/toolkit';

interface initialState {
  selectedAnswers:[]
}

const initialState: initialState = {
  selectedAnswers:[]
};


export const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setSelectedAnswers:(state, action) => {
      state.selectedAnswers = action.payload;
    },
    resetSelectedAnswers: (state) => {
      state.selectedAnswers = [];
    },
  },
});


export const { setSelectedAnswers, resetSelectedAnswers } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;