import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { Text } from 'react-native'
import { LoginScreen, RegistrationScreen } from './auth';
import { RootNavigator as ClientRootNavigator, AppBar } from './client/screens';
import { Provider as PaperProvider } from 'react-native-paper';
import { firebase } from './firebase/config';

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
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="FeedList"
            headerMode="screen"
            screenOptions={{
              header: ({ scene, previous, navigation }) => (
                <AppBar scene={scene} previous={previous} navigation={navigation} />
              ),
            }}>
            {user != null ? (
                <Stack.Screen name="ClientRootNavigator" component={ClientRootNavigator} />
            ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
                </>
              )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
};
