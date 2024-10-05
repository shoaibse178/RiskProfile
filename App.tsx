import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
// import ApplicationNavigator from './src/core/navigation/Navigation';
import Toast from 'react-native-toast-message'
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/navigation/stacks/AppStack';
import { navigationRef } from './src/navigation/NavigationServices';



const App: React.FC = () => {
  return (
    <Provider store={store}>
    <NavigationContainer ref={navigationRef}>
        <AppStack />
        <Toast ref={(ref:any) => Toast.setRef(ref)} />
    </NavigationContainer>
    </Provider>
  );
};

export default App;
