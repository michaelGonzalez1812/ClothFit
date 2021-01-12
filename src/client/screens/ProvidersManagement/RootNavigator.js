import React from 'react';
import { default as CurrentProviders } from './CurrentProviders';
import { createStackNavigator } from '@react-navigation/stack';
import { AppBar } from './../../../appBar';
import { BalanceHistory } from './../clientXProvider/balanceManagement';

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
            <Stack.Screen name="CurrentProviders" component={CurrentProviders} />
            <Stack.Screen name="BalanceHistory" component={BalanceHistory} />
        </Stack.Navigator>
    );
}
