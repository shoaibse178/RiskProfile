import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Result from './Result';
import { resetUserState } from '../../redux/reducers/AnswersReducer';

const mockStore = configureStore([]);

const mockUserData = {
    userData: {
        score: 85,
        riskLevel: 'Moderate',
    },
};

describe('Result Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            answers: {
                name: 'John Doe',
            },
        });
    });

    it('renders correctly with given userData', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Result route={{ params: mockUserData }} />
            </Provider>
        );

        expect(getByText('Hello, John Doe')).toBeTruthy();
        expect(getByText('Total Score:')).toBeTruthy();
        expect(getByText('85')).toBeTruthy();
        expect(getByText('Risk Level:')).toBeTruthy();
        expect(getByText('Moderate')).toBeTruthy();
    });

    it('dispatches resetUserState and navigates on button press', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Result route={{ params: mockUserData }} />
            </Provider>
        );

        const button = getByText('Restart');
        fireEvent.press(button);

        const actions = store.getActions();
        expect(actions).toContainEqual(resetUserState());
    });
});
