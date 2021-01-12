import React from 'react';
import { default as BalanceHistory } from './History';
import { createStackNavigator } from '@react-navigation/stack';
import { AppBar } from './../../../../appBar';

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

            <Stack.Screen name="BalanceHistory" component={BalanceHistory} />
        </Stack.Navigator>
    );
}
