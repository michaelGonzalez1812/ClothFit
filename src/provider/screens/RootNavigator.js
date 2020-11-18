import React from 'react';
import {
    DrawerContent,
    CurrentClients,
    AddClient,
    Account
} from './';
import { History as ClientHistory } from './../../client/screens'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export const RootNavigator = ({ navigation }) => {
    return (
        <Drawer.Navigator drawerContent={() => <DrawerContent navigation={navigation} />}>
            <Drawer.Screen name="Clients" component={CurrentClients} />
            <Drawer.Screen name="AddClient" component={AddClient} />
            <Drawer.Screen name="Account" component={Account} />
            <Drawer.Screen name="ClientHistory" component={ClientHistory} />
        </Drawer.Navigator>
    );
}

