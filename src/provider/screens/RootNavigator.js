import React from 'react';
import { 
    DrawerContent,
    Clients, 
    Account
} from './';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export const RootNavigator = ({ navigation }) => {
    return (
        <Drawer.Navigator drawerContent={() => <DrawerContent navigation={navigation} />}>
            <Drawer.Screen name="Clients" component={Clients} />
            <Drawer.Screen name="Account" component={Account} />
        </Drawer.Navigator>
    );
}

