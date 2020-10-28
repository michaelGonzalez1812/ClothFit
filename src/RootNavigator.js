import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper';
import { LoginScreen/*, HomeScreen*/, RegistrationScreen } from './client/screens';
import { Provider as PaperProvider } from 'react-native-paper';
import { firebase } from './firebase/config';

//import { StackNavigator } from './stack';
//import { DrawerContent } from './drawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function DrawerContent() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Drawer content</Text>
        </View>
    );
}

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}


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
    


    /*return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={() => <DrawerContent />}>
                <Drawer.Screen name="Home" component={HomeScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
    */
};
