import React from 'react';
import { 
    DrawerContent, 
    HomeScreen, 
    AccountScreen,
    HistoryScreen 
} from './';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function RootNavigator({ navigation }) {
    return (
        <Drawer.Navigator drawerContent={() => <DrawerContent navigation={navigation} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Account" component={AccountScreen} />
            <Drawer.Screen name="History" component={HistoryScreen} />
        </Drawer.Navigator>
    );
}
