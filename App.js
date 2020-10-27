import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import { RootNavigator } from './src/screens/RootNavigator'
import { Provider as PaperProvider } from 'react-native-paper';
import { Text } from 'react-native'
import { decode, encode } from 'base-64'
import { firebase } from './src/firebase/config'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();

export default function App() {
/*
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
            setLoading(false)
          })
          .catch((error) => {
            setLoading(true)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);
*/
  /*
  if (loading)
    return (
      //TODO: Create loading page
      <Text>loading</Text>
    );
  else
    return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {user ? (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  initialParams={{ props: user }}
                />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />
              </>
            ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Registration" component={RegistrationScreen} />
                </>
              )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
    */

   return (
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
  );

}