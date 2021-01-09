import React from 'react';
import { default as ItemManagement } from './ItemManagement';
import { default as BalanceHistory } from './History';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BalanceHistory" component={BalanceHistory} />
            <Stack.Screen name="ItemManagement" component={ItemManagement} />
        </Stack.Navigator>
    );
}
