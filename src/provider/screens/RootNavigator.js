import React from 'react';
import {
    DrawerContent,
    CurrentClients,
    AddClient,
    Account
} from './';
import { 
    History as ClientHistory,
    AddHistoryItem as AddClientHistoryItem
} from './../../client/screens'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AddHistoryItem from '../../client/screens/HistoryScreen/AddHistoryItem';

const Drawer = createDrawerNavigator();

export const RootNavigator = ({ navigation }) => {
    return (
        <Drawer.Navigator drawerContent={() => <DrawerContent navigation={navigation} />}>
            <Drawer.Screen name="Clients" component={CurrentClients} />
            <Drawer.Screen name="AddClient" component={AddClient} />
            <Drawer.Screen name="Account" component={Account} />
            <Drawer.Screen name="ClientHistory" component={ClientHistory} />
            <Drawer.Screen name="AddClientHistoryItem" component={AddClientHistoryItem} />
        </Drawer.Navigator>
    );
}

