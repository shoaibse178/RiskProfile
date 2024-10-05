import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from './Home';
import Toast from 'react-native-toast-message';
import Strings from '../../utils/Strings';

// Create a mock for navigation
const mockResetActions = jest.fn();
jest.mock('../../navigation/NavigationServices', () => ({
    resetActions: (routeName, params) => mockResetActions(routeName, params),
}));

const mockStore = configureStore([]);

describe('Home Component', () => {
    const initialState = {
        answers: {
            1: { score: 2 }, // Mock an answer for question 1
            2: { score: 3 }, // Mock an answer for question 2
        },
    };

    const store = mockStore(initialState);

    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mocks
    });

    test('renders correctly and displays the question progress', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        expect(getByText('1/2')).toBeTruthy(); // Check if progress is displayed
        expect(getByText("How would you describe your risk tolerance?")).toBeTruthy(); // First question text
    });

    test('shows next question when NEXT button is pressed', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        fireEvent.press(getByText('Next')); // Press the Next button

        expect(getByText("How often do you review your investment portfolio?")).toBeTruthy(); // Check if the second question is displayed
    });

    test('shows error toast if trying to go to results without answers', () => {
        const emptyAnswersState = {
            answers: {}, // No answers
        };

        const storeWithEmptyAnswers = mockStore(emptyAnswersState);

        const { getByText } = render(
            <Provider store={storeWithEmptyAnswers}>
                <Home />
            </Provider>
        );

        const toastSpy = jest.spyOn(Toast, 'show');

        fireEvent.press(getByText('Next')); // Attempt to go to the last question
        fireEvent.press(getByText('Next')); // Attempt to go to results

        expect(toastSpy).toHaveBeenCalled(); // Verify if toast was called

        // Verify if it was called with the correct parameters
        expect(toastSpy).toHaveBeenCalledWith({
            type: Strings.ERRROR,
            text1: Strings.SELECTION_REQUIRED,
            text2: Strings.SELECT_OPTION,
            position: 'top',
            visibilityTime: 2500,
            autoHide: true,
            topOffset: 55,
        });
    });

    test('navigates to results when the last question is answered', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        // Navigate to the last question
        fireEvent.press(getByText('Next')); // Go to question 2
        fireEvent.press(getByText('Next')); // Go to results
    });

});
