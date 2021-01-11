import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { default as LoginScreen } from './LoginScreen/LoginScreen'
import { default as RegistrationScreen } from './RegistrationScreen/RegistrationScreen'

const Stack = createStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="LogIn" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={RegistrationScreen} />
        </Stack.Navigator>
    );
}
