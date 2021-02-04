import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack'
import { View, StyleSheet } from 'react-native'
import { RootNavigator as AutRootNavigator } from './auth';
import { RootNavigator as ClientRootNavigator } from './client/screens/RootNavigator';
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
      console.log("onAuthStateChanged*******************");
      if (user) {
        console.log("onAuthStateChanged*******************true");
        console.log("user: ", user);
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            console.log("in then onAuthSateChanged");
            console.log("document: ", document);
            console.log("document.data: ", document.data);
            const userData = document.data()
            setUser(userData)
          })
          .catch((error) => {
            console.error(error);
            setUser(null)
          });
      } else {
        console.log("onAuthStateChanged*******************false");
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
          {
            user != null ? 
              user.isProvider ? 
                  <ProviderRootNavigator/> 
                : 
                  <ClientRootNavigator/> 
            : 
              <AutRootNavigator/>
          }
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