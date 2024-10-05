import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Welcome from './Welcome';
import { setName } from '../../redux/reducers/AnswersReducer';
import * as NavigationServices from '../../navigation/NavigationServices';
import Strings from '../../utils/Strings';

const mockStore = configureStore([]);

describe('Welcome Component', () => {
  let store: ReturnType<typeof mockStore>;
  
  beforeEach(() => {
    store = mockStore({
      answers: { name: '' }, // Initial state Redux store
    });

    // Mock the resetActions function
    jest.spyOn(NavigationServices, 'resetActions').mockImplementation(jest.fn());
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

  it('shows error message when name input is empty and submitted', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Welcome />
      </Provider>
    );

    const button = getByText(Strings.START);
    fireEvent.press(button);

    expect(getByText(Strings.NAME_REQUIRED)).toBeTruthy();
  });

  it('dispatches setName and calls resetActions when name input is filled and submitted', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Welcome />
      </Provider>
    );

    const input = getByPlaceholderText(Strings.ENTER_NAME);
    fireEvent.changeText(input, 'John Doe'); // Enter a valid name
    const button = getByText(Strings.START);
    fireEvent.press(button);

    const actions = store.getActions();
    expect(actions).toContainEqual(setName('John Doe')); // Check if setName was dispatched
    expect(NavigationServices.resetActions).toHaveBeenCalledWith('Home'); // Check if resetActions was called
  });
});
