import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { RootNavigator } from './src/RootNavigator'
import { decode, encode } from 'base-64'
import { ThemeContext, CustomDefaultTheme, CustomDarkTheme } from './theme'
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
} from 'react-native-paper';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
  const [isDarktheme, setDarkTheme] = useState(false);   

  const theme = isDarktheme? CustomDarkTheme : CustomDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider value={ {isDarkTheme: isDarktheme, setDarkThemec: setDarkTheme} }>
          <RootNavigator />
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider >

  );
}