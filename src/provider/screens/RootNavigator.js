import React from 'react';
import { ClientXProviderContextProvider } from "./../../context";
import { RootNavigator as ClientsManagementRootNavigator } from './ClientsManagement';
import { Account } from './Account'
import { DrawerContent } from './NavigationTools';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export const RootNavigator = ({ navigation }) => {
    return (
        <ClientXProviderContextProvider>
            <Drawer.Navigator 
                initialRouteName="Clients"
                drawerContent={() => <DrawerContent navigation={navigation} />}>

                <Drawer.Screen name="Clients" component={ ClientsManagementRootNavigator } />
                <Drawer.Screen name="Account" component={Account} />
            </Drawer.Navigator>
        </ClientXProviderContextProvider>
    );
}
