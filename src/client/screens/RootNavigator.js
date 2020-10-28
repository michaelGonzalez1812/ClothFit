import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContent } from './';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native'

const Drawer = createDrawerNavigator();

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}

export default function RootNavigator() {
        return (
            <Drawer.Navigator drawerContent={() => <DrawerContent />}>
                <Drawer.Screen name="Home" component={HomeScreen} />
            </Drawer.Navigator>
    );
}
