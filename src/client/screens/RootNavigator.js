import React from 'react';
import { 
    DrawerContent, 
    AccountScreen,
    History 
} from './';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export const RootNavigator = ({ navigation }) => {
    return (
        <Drawer.Navigator drawerContent={() => <DrawerContent navigation={navigation} />}>
            <Drawer.Screen name="History" component={History} />
            <Drawer.Screen name="Account" component={AccountScreen} />
        </Drawer.Navigator>
    );
}
