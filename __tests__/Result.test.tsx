import React from 'react';
import { Provider } from 'react-redux';
import { render, getByText, fireEvent } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import Result from '../src/screens/result/Result';
import { resetActions } from '../src/core/navigation/NavigationServices';
import { resetSelectedAnswers } from '../src/redux/reducers/QuestionsReducer';
import Strings from '../src/res/strings/Strings';

// Mock the navigation resetActions function
jest.mock('../src/core/navigation/NavigationServices', () => ({
  resetActions: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Result Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      questions: {
        answers: [
          { id: 1, score: 10 },
          { id: 2, score: 20 },
          { id: 3, score: 15 },
        ],
      },
    });
  });

  it('renders correctly with total score and risk profile', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Result />
      </Provider>
    );

    // Check if the total score is rendered correctly
    expect(getByText('45')).toBeTruthy(); // Assuming total score is 45

    // Check if the risk profile is rendered correctly
    expect(getByText(/Low|Medium|High|Unknown/)).toBeTruthy(); 
  });

  it('calls resetActions and resets answers when button is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Result />
      </Provider>
    );

    // Simulate button press
    fireEvent.press(getByText(Strings.START_AGAIN));

    // Check that resetActions was called with 'Questions'
    expect(resetActions).toHaveBeenCalledWith('Questions');

    // Check that resetSelectedAnswers was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(resetSelectedAnswers());
  });
});
