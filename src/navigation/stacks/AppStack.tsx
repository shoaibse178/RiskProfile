import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../../screens/welcome/Welcome';
import Home from '../../screens/home/Home';
import Result from '../../screens/result/Result';


type AppNavigatorProps = {};

const Stack = createNativeStackNavigator();

const AppStack: FC<AppNavigatorProps> = () => {
    return (
        <Stack.Navigator initialRouteName={'Welcome'} screenOptions={{ headerShown: false }}>
            <Stack.Screen component={Welcome} name="Welcome" />
            <Stack.Screen component={Home} name="Home" />
            <Stack.Screen component={Result} name="Result" />
        </Stack.Navigator>
    );
};

export default AppStack;
