import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Welcome from './Welcome';
import * as NavigationServices from '../../navigation/NavigationServices';
import Strings from '../../utils/Strings';
import { setName } from '../../redux/reducers/AnswersReducer';

// Create a mock store
const mockStore = configureStore([]);

jest.mock('../../navigation/NavigationServices', () => ({
  resetActions: jest.fn(),
}));

describe('Welcome Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      user: {
        name: '',
        answers: {},
      },
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Welcome />
      </Provider>
    );

    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText(Strings.DESCRIPTION)).toBeTruthy();
  });

  it('displays an error message when submitting an empty name', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Welcome />
      </Provider>
    );

    const button = getByText(Strings.START);
    fireEvent.press(button);

    expect(getByText(Strings.NAME_REQUIRED)).toBeTruthy();
  });

  it('dispatches setName and resets actions on valid input', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Welcome />
      </Provider>
    );

    const input = getByPlaceholderText(Strings.ENTER_NAME);
    const button = getByText(Strings.START);

    fireEvent.changeText(input, 'John Doe');
    fireEvent.press(button);

    const actions = store.getActions();

    expect(actions).toContainEqual(setName('John Doe'));
    expect(NavigationServices.resetActions).toHaveBeenCalledWith('Home');
  });
});
