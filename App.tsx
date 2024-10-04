import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import ApplicationNavigator from './src/core/navigation/Navigation';
import Toast from 'react-native-toast-message'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApplicationNavigator />
      <Toast ref={(ref:any) => Toast.setRef(ref)} />
    </Provider>
  );
};

export default App;
