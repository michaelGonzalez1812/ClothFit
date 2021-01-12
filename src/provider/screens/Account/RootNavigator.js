import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppBar } from './../../../appBar';
import { default as Account } from './Account'
const Stack = createStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator
        headerMode="screen"
        screenOptions={{
            header: ({ scene, previous, navigation }) => (
                <AppBar scene={scene} previous={previous} navigation={navigation} />
            )
        }}>
            <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>
    );
}
