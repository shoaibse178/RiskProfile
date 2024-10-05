import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
// import ApplicationNavigator from './src/core/navigation/Navigation';
import Toast from 'react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/stacks/AppStack';
import { navigationRef } from './src/navigation/NavigationServices';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import colors from './src/assets/colors/Colors';



const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <SafeAreaView style={{ flex: 1 }}>
            <AppStack />
            <Toast ref={(ref: any) => Toast.setRef(ref)} />
          </SafeAreaView>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
