import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { RootNavigator } from './src/RootNavigator'
import { decode, encode } from 'base-64'
import { ThemeContext } from './theme'
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default function App() {
  const [isDarktheme, setDarkTheme] = useState(false);   

  const theme = isDarktheme? CombinedDarkTheme :
    {
    ...CombinedDefaultTheme,
    roundness: 2,
    colors: {
      ...CombinedDefaultTheme.colors,
      primary: '#57838d',
      accent: '#90a4ae',
      background: '#f5f5f5',
      text: '#2e2e2d',
      surface: '#26365c',
      onBackground: '#543155',
      onSurface: '#543155'
    } 
  };

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