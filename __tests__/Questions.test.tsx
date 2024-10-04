import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Questions from '../src/screens/questions/Questions';
import { QUESTIONS } from '../src/core/helpers/Data';
import Toast from 'react-native-toast-message';


// Mock the Toast component
jest.mock('react-native-toast-message', () => ({
    show: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Questions Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    it('renders the Questions component', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Questions navigation={{}} />
            </Provider>
        );

        expect(getByText('Questions')).toBeTruthy();
    });

    it('displays the first question', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Questions navigation={{}} />
            </Provider>
        );

        expect(getByText(QUESTIONS[0].label)).toBeTruthy();
        QUESTIONS[0].options.forEach(option => {
            expect(getByText(option.label)).toBeTruthy();
        });
    });

    it('navigates to the next question', async () => {
        const { getByText } = render(
            <Provider store={store}>
                <Questions navigation={{}} />
            </Provider>
        );

        fireEvent.press(getByText(QUESTIONS[0].options[0].label)); // Select an option
        fireEvent.press(getByText('Next')); // Press Next

        await waitFor(() => {
            expect(getByText(QUESTIONS[1].label)).toBeTruthy(); // Check next question
        });
    });

    it('shows error toast if trying to navigate without selection', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Questions navigation={{}} />
            </Provider>
        );

        fireEvent.press(getByText('Next')); // Press Next without selection

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

    it('navigates back to the previous question', async () => {
        const { getByText } = render(
            <Provider store={store}>
                <Questions navigation={{}} />
            </Provider>
        );

        fireEvent.press(getByText(QUESTIONS[0].options[0].label)); // Select first option
        fireEvent.press(getByText('Next')); // Go to the second question

        fireEvent.press(getByText('Back')); // Go back to first question

        await waitFor(() => {
            expect(getByText(QUESTIONS[0].label)).toBeTruthy();
        });
    });
});
