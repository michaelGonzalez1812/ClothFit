import React from 'react';
import { View } from 'react-native';
import { CurrentUserContext } from './../../../auth';
import styles from './styles';
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

  const [isDarkThemeOn, setisDarkThemeOn] = React.useState(false);

  const onThemeSwitch = () => setisDarkThemeOn(!isDarkThemeOn);

  return (
    <CurrentUserContext.Consumer>
      {({ user }) => (
        <DrawerContentScrollView {...props}>
          <View
            style={
              styles.drawerContent
            }
          >
            <View style={styles.userInfoSection}>
              <Avatar.Icon size={100} icon="account" />
              <Title style={styles.title}>{user.fullName}</Title>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="Profile"
                onPress={() => { }}
              />
            </Drawer.Section>
            <Drawer.Section title="Preferences">
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <Switch value={isDarkThemeOn} onValueChange={onThemeSwitch} />
              </View>
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
      )}
    </CurrentUserContext.Consumer>
  );
}
