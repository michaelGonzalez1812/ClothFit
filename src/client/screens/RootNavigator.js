import React from 'react';
import { 
    DrawerContent, 
    AccountScreen,
    History 
} from './';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { firebase } from '../../firebase/config';

const Drawer = createDrawerNavigator();

export const RootNavigator = ({ navigation }) => {
    firebase.auth().signOut().then(function () {
        //TODO: clean navigation stack
        //navigation.navigate('Login');
    }).catch(function (error) {
        console.log(error);
    });
    return (
        <Drawer.Navigator drawerContent={() => <DrawerContent navigation={navigation} />}>
            <Drawer.Screen name="History" component={History} />
            <Drawer.Screen name="Account" component={AccountScreen} />
        </Drawer.Navigator>
    );
}
