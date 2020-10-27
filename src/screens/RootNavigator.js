import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper';
import { LoginScreen/*, HomeScreen*/, RegistrationScreen } from './'

//import { StackNavigator } from './stack';
//import { DrawerContent } from './drawerContent';

const Drawer = createDrawerNavigator();


function DrawerContent() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Drawer content</Text>
      </View>
    );
  }

  function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }

export const RootNavigator = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={() => <DrawerContent />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
