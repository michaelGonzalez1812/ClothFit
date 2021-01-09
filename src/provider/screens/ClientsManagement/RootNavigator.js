import React from 'react';
import { default as CurrentClients } from './CurrentClients';
import { RootNavigator as ClientXProviderRootNavigator } from './../clientXProvider';
import { createStackNavigator } from '@react-navigation/stack';
import { AppBar } from './../../../appBar'

const Stack = createStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CurrentClients" component={CurrentClients} />
            <Stack.Screen name="ClientXProviderRootNavigator" component={ClientXProviderRootNavigator} />
        </Stack.Navigator>
    );
}
