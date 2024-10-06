import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Option } from '../../constants/Data';

interface Answer {
  questionId: number;
  option: Option;
}

interface AnswersState {
  name: string;
  answers: { [key: number]: Option | undefined };
}

const initialState: AnswersState = {
  name: '',
  answers: {},
};

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAnswer(state, action: PayloadAction<Answer>) {
      const { questionId, option } = action.payload;
      state.answers[questionId] = option;
    },
    resetUserState: () => initialState,
  },
});

export const { setName, setAnswer, resetUserState } = answersSlice.actions;
export default answersSlice.reducer;
