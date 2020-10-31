import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme
} from 'react-native-paper';
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme
  } from '@react-navigation/native';
import merge from 'deepmerge';

export const DefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
export const DarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export const CustomDefaultTheme =
{
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#57838d',
        accent: '#90a4ae',
        background: '#f5f5f5',
        text: '#2e2e2d',
        surface: '#26365c',
        onBackground: '#543155',
        onSurface: '#543155'
    }
};

export const CustomDarkTheme =
{
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors
    }
};