import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { RootNavigator as AutRootNavigator } from "./auth";
import { EmailVerificationScreen } from "./auth";
import { RootNavigator as ClientRootNavigator } from "./client/screens/RootNavigator";
import { RootNavigator as ProviderRootNavigator } from "./provider/screens/RootNavigator";
import { CurrentUserContext } from "./auth";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const RootNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firestore().collection("users");
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
          })
          .catch((error) => {
            console.error(error);
            setUser(null);
          });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const usersRef = firestore().collection("users");
    const unsubscribe = auth().onUserChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
          })
          .catch((error) => {
            console.error(error);
            setUser(null);
          });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating={true} />
      </View>
    );
  //TODO: Look for a way to change the to choose with screen print from stack.navigator property.
  else currentUser = auth().currentUser;
  return (
    <CurrentUserContext.Provider value={{ user }}>
      {user != null && currentUser != null ? (
        currentUser.emailVerified ? (
          user.isProvider ? (
            <ProviderRootNavigator />
          ) : (
            <ClientRootNavigator />
          )
        ) : (
          <EmailVerificationScreen />
        )
      ) : (
        <AutRootNavigator />
      )}
    </CurrentUserContext.Provider>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center", //horizontal
    justifyContent: "center", //veritical
  },
});
