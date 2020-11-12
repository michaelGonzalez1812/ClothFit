import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import { Text } from 'react-native'
import { LoginScreen, RegistrationScreen } from './auth';
import { RootNavigator as ClientRootNavigator } from './client/screens/RootNavigator';
import { AppBar } from './appBar'
import { RootNavigator as ProviderRootNavigator } from './provider/screens/RootNavigator';
import { firebase } from './firebase/config';
import { CurrentUserContext } from './auth'

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
      //TODO: Create loading page
      <Text>loading</Text>
    );
  else
    //TODO: Look for a way to change the to choose with screen print from stack.navigator property.
    return (
      <CurrentUserContext.Provider value={{ user }}>
        <Stack.Navigator
          initialRouteName="FeedList"
          headerMode="screen"
          screenOptions={{
            header: ({ scene, previous, navigation }) => (
              <AppBar scene={scene} previous={previous} navigation={navigation} />
            )
          }}>
          {user != null ? (
            user.isProvider? (
              <Stack.Screen name="ProviderRootNavigator" component={ProviderRootNavigator} />
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
