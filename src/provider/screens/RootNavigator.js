import React from 'react';
import {ClientXProviderContextProvider} from "./../../context";
import {
    DrawerContent,
    CurrentClients,
    AddClient,
    Account
} from './';
import { 
    RootNavigator as ClientXProviderRootNavigator
} from './../clientXProvider'
import { 
    ItemManagement as BalanceItemManagement,
    BalanceHistory as BalanceHistory
} from './../clientXProvider/balanceManagement'

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export const RootNavigator = ({ navigation }) => {
    return (
        <ClientXProviderContextProvider>
            <Drawer.Navigator drawerContent={() => <DrawerContent navigation={navigation} />}>
                <Drawer.Screen name="Clients" component={CurrentClients} />
                <Drawer.Screen name="AddClient" component={AddClient} />
                <Drawer.Screen name="Account" component={Account} />
                <Drawer.Screen name="ClientXProviderRootNavigator" component={ClientXProviderRootNavigator} />
                <Drawer.Screen name="BalanceHistory" component={BalanceHistory}/>
                <Drawer.Screen name="BalanceItemManagement" component={BalanceItemManagement} />
            </Drawer.Navigator>
        </ClientXProviderContextProvider>
    );
}


