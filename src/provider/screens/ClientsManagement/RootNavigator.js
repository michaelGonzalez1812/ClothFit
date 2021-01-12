import React from 'react';
import { default as CurrentClients } from './CurrentClients';
import { RootNavigator as ClientXProviderRootNavigator } from './../clientXProvider';
import { createStackNavigator } from '@react-navigation/stack';
import { AppBar } from './../../../appBar';
import { ItemManagement, BalanceHistory } from './../clientXProvider/balanceManagement';

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
            <Stack.Screen name="CurrentClients" component={CurrentClients} />
            <Stack.Screen name="ClientXProviderRootNavigator" component={ClientXProviderRootNavigator} />
            <Stack.Screen name="BalanceHistory" component={BalanceHistory} />
            <Stack.Screen name="ItemManagement" component={ItemManagement} />
        </Stack.Navigator>
    );
}
