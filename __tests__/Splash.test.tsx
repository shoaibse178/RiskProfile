import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import Splash from '../src/screens/splash/Splash';
import { resetActions } from '../src/core/navigation/NavigationServices';
import Strings from '../src/res/strings/Strings';

// Mock the resetActions function
jest.mock('../src/core/navigation/NavigationServices', () => ({
  resetActions: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Splash Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Splash />
      </Provider>
    );

    expect(getByText(Strings.RISK_SURVEY)).toBeTruthy(); // Check if the title is rendered
  });

  it('navigates to Questions after 2 seconds', async () => {
    jest.useFakeTimers(); // Use fake timers for the timeout

    render(
      <Provider store={store}>
        <Splash />
      </Provider>
    );

    // Fast-forward time by 2 seconds
    jest.advanceTimersByTime(2000);

    // Check that resetActions was called
    expect(resetActions).toHaveBeenCalledWith('Questions');

    jest.useRealTimers(); // Restore real timers
  });
});
