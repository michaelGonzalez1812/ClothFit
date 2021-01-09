import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack'
import { View, StyleSheet } from 'react-native'
import { LoginScreen, RegistrationScreen } from './auth';
import { RootNavigator as ClientRootNavigator } from './client/screens/RootNavigator';
import { AppBar } from './appBar'
import { default as CurrentClients } from './provider/screens/ClientsManagement/CurrentClients';
import { RootNavigator as ClientXProviderRootNavigator } from './provider/screens/clientXProvider';
import { RootNavigator as ProviderRootNavigator } from './provider/screens/RootNavigator';
import { firebase } from './firebase/config';
import { CurrentUserContext } from './auth'
import { default as AddClient } from './provider/screens/ClientsManagement/AddClient';

const Stack = createStackNavigator();

export const RootNavigator = () => {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setUser(userData)
          })
          .catch((error) => {
            console.error(error);
            setUser(null)
          });
      } else {
        setUser(null)
      }
      setLoading(false)
    });
  }, []);

  if (loading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating={true} />
      </View>
    );
  else
    //TODO: Look for a way to change the to choose with screen print from stack.navigator property.
    return (
      <CurrentUserContext.Provider value={{ user }}>
        <Stack.Navigator
          headerMode="screen">
          {user != null ? (
            user.isProvider ? (
                <>
                  <Stack.Screen name="ProviderRootNavigator" component={ProviderRootNavigator} />
                  <Stack.Screen name="AddClient" component={AddClient} />
                  <Stack.Screen name="CurrentClients" component={CurrentClients} />
                  <Stack.Screen name="ClientXProviderRootNavigator" component={ClientXProviderRootNavigator} />
                </>
            ) : (
                <Stack.Screen name="ClientRootNavigator" component={ClientRootNavigator} />
              )
          ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
              </>
            )}
        </Stack.Navigator>
      </CurrentUserContext.Provider>
    );
};


const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center', //horizontal
    justifyContent: 'center', //veritical
  }
});