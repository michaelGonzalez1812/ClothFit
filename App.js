import 'react-native-gesture-handler';
import React from 'react'
import { RootNavigator } from './src/RootNavigator'
import { Provider as PaperProvider } from 'react-native-paper';
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
  return (
    <PaperProvider>
      <RootNavigator />
    </PaperProvider>
  );
}