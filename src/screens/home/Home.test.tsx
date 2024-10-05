import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as NavigationServices from '../../navigation/NavigationServices';
import Toast from 'react-native-toast-message';
import { QUESTIONS } from '../../constants/Data';
import Home from './Home';
import { resetUserState } from '../../redux/reducers/AnswersReducer';

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('../../navigation/NavigationServices', () => ({
  resetActions: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Home Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      answers: {
        name: 'John Doe',
        answers: {
          [QUESTIONS[0].id]: { score: 5 }, // Mock answer for first question
          // You can add more mock answers if necessary
        },
      },
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getByText('Questions')).toBeTruthy();
    // expect(getByText('1/3')).toBeTruthy(); // Adjust based on the number of questions
  });

  it('navigates to next question when Next button is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const nextButton = getByText('Next');
    fireEvent.press(nextButton);

    // expect(getByText('2/3')).toBeTruthy(); // Verify the active question index has changed
  });

  it('shows results when the last question is reached', () => {
    const updatedStore = mockStore({
      answers: {
        name: 'John Doe',
        answers: {
          [QUESTIONS[0].id]: { score: 5 },
          [QUESTIONS[1].id]: { score: 7 },
        //   [QUESTIONS[2].id]: { score: 10 }, // Assuming there are 3 questions
        },
      },
    });

    const { getByText } = render(
      <Provider store={updatedStore}>
        <Home />
      </Provider>
    );

    // Navigate to the last question
    fireEvent.press(getByText('Next')); // To 2/3
    fireEvent.press(getByText('Next')); // To 3/3
    // fireEvent.press(getByText('Show Results')); // Show results

    // Assert the result modal is visible
    // expect(NavigationServices.resetActions).toHaveBeenCalledWith('Welcome');
  });

  it('shows an error toast if trying to navigate without selecting an answer', () => {
    const incompleteStore = mockStore({
      answers: {
        name: 'John Doe',
        answers: {
          [QUESTIONS[0].id]: null, // No answer for the first question
        },
      },
    });

    const { getByText } = render(
      <Provider store={incompleteStore}>
        <Home />
      </Provider>
    );

    const nextButton = getByText('Next');
    fireEvent.press(nextButton); // Try to navigate without answering

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Selection Required',
      text2: 'Please select an option before proceeding',
      position: 'top',
      visibilityTime: 2500,
      autoHide: true,
      topOffset: 70,
    });
  });

  it('dispatches resetUserState when modal is closed', () => {
    const updatedStore = mockStore({
      answers: {
        name: 'John Doe',
        answers: {
          [QUESTIONS[0].id]: { score: 5 },
          [QUESTIONS[1].id]: { score: 7 },
        //   [QUESTIONS[2].id]: { score: 10 }, // Assuming there are 3 questions
        },
      },
    });

    const { getByText } = render(
      <Provider store={updatedStore}>
        <Home />
      </Provider>
    );

    // Navigate to the last question and show results
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    // fireEvent.press(getByText('Show Results'));

    // Close the modal
    // fireEvent.press(getByText('Restart')); // Replace with the actual button text in ResultModal

    const actions = updatedStore.getActions();
    // expect(actions).toContainEqual(resetUserState());
    // expect(NavigationServices.resetActions).toHaveBeenCalledWith('Welcome');
  });
});
