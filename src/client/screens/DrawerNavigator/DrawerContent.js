import React, { useContext } from 'react';
import { View } from 'react-native';
import { CurrentUserContext } from './../../../auth';
import styles from './styles';
import { ThemeContext } from './../../../../theme';
import {
  DrawerItem,
  DrawerContentScrollView
} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Drawer,
  Text,
  Switch
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DrawerContent(props) {

  const themeContext = useContext(ThemeContext);
  const [isDarkThemeOn, setisDarkThemeOn] = React.useState(themeContext.isDarkTheme);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={
          styles.drawerContent
        }
      >
        <View style={styles.userInfoSection}>
          <Avatar.Icon size={100} icon="account" />
          <CurrentUserContext.Consumer>
            {({ user }) => (
              <Title style={styles.title}>{user ? user.fullName : ""}</Title>
            )}
          </CurrentUserContext.Consumer>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="history"
                color={color}
                size={size}
              />
            )}
            label="History"
            onPress={() => {
              props.navigation.navigate('History')
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Account"
            onPress={() => {
              props.navigation.navigate('Account')
            }}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <View style={styles.preference}>
            <Text>Dark Theme</Text>
            <ThemeContext.Consumer>
              {({ isDarktheme, setDarkThemec }) => (
                <Switch value={isDarkThemeOn} onValueChange={(isDarkthemep) => {
                  setDarkThemec(isDarkthemep)
                  setisDarkThemeOn(isDarkthemep)
                }} />
              )}
            </ThemeContext.Consumer>

          </View>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}