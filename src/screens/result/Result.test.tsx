import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Result from './Result';
import { resetUserState } from '../../redux/reducers/AnswersReducer';
import { resetActions } from '../../navigation/NavigationServices';
import Strings from '../../utils/Strings';

// Mock the resetActions function
jest.mock('../../navigation/NavigationServices', () => ({
    resetActions: jest.fn(),
}));

// Create a mock store
const mockStore = configureStore([]);

describe('Result Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            answers: {
                name: 'John Doe', // Mocking the name from Redux state
            },
        });
    });

    it('renders correctly with given props', () => {
        const route = {
            params: {
                userData: {
                    score: 100,
                    riskLevel: 'Medium',
                },
            },
        };

        const { getByText } = render(
            <Provider store={store}>
                <Result route={route} />
            </Provider>
        );

        expect(getByText(`${Strings.HELLO}, John Doe`)).toBeTruthy();
        expect(getByText(`${Strings.TOTAL_SCORE}:`)).toBeTruthy();
        expect(getByText('100')).toBeTruthy();
        expect(getByText(`${Strings.RISK_LEVEL}:`)).toBeTruthy();
        expect(getByText('Medium')).toBeTruthy();
    });

    it('dispatches resetUserState and calls resetActions on button press', () => {
        const route = {
            params: {
                userData: {
                    score: 100,
                    riskLevel: 'Medium',
                },
            },
        };

        const { getByText } = render(
            <Provider store={store}>
                <Result route={route} />
            </Provider>
        );

        const button = getByText(Strings.RESTART);
        fireEvent.press(button);

        const actions = store.getActions();

        // Check if the resetUserState action was dispatched
        expect(actions).toContainEqual(resetUserState());
        
        // Check if resetActions was called
        expect(resetActions).toHaveBeenCalledWith('Welcome');
    });
});
