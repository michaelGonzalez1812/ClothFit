import React from 'react';
import { ClientXProviderContextProvider } from "./../../context";
import { RootNavigator as ClientsManagementRootNavigator } from './ClientsManagement';
import { RootNavigator as AccountRootNavigator } from './Account';
import { RootNavigator as MarketRootNavigator } from './Market'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export const RootNavigator = ({ }) => {
  return (
    <ClientXProviderContextProvider>
        <Tab.Navigator
          initialRouteName="Clients">

          <Tab.Screen 
            name="Account" 
            component={AccountRootNavigator} 
            options={{
              tabBarLabel: 'Cuenta',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
            }}
          />
          
          <Tab.Screen 
            name="Clients" 
            component={ClientsManagementRootNavigator} 
            options={{
              tabBarLabel: 'Clientes',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-group" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen 
            name="Market" 
            component={MarketRootNavigator} 
            options={{
              tabBarLabel: 'Tienda',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="store" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
    </ClientXProviderContextProvider>
  );
}