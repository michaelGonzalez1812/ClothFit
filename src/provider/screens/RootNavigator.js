import React from 'react';
import { 
    DrawerContent,
    Clients, 
    AddClient,
    Account
} from './';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export const RootNavigator = ({ navigation }) => {
    return (
        <Drawer.Navigator drawerContent={() => <DrawerContent navigation={navigation} />}>
            <Drawer.Screen name="Clients" component={Clients} />
            <Drawer.Screen name="AddClient" component={AddClient} />
            <Drawer.Screen name="Account" component={Account} />
        </Drawer.Navigator>
    );
}

