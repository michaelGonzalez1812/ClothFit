import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
//import { LoginScreen, HomeScreen, RootNavigator, RegistrationScreen } from './src/client/screensscreens'
import { RootNavigator } from './src/RootNavigator'
import { Provider as PaperProvider } from 'react-native-paper';
import { Text } from 'react-native'
import { decode, encode } from 'base-64'
import { firebase } from './src/firebase/config'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }



export default function App() {

   return (
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
  );

}