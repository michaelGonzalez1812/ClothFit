import React from "react";
import { View } from "react-native";
import { CurrentUserContext } from "./../../../auth";
import { Surface, Avatar, Title, Button } from "react-native-paper";
import { firebase } from "../../../firebase/config";
import { LoginManager as FBLoginManager } from "react-native-fbsdk-next";
import styles from "./styles";

export default function Account({ navigation }) {
  const onEditAccountPress = () => {
    navigation.push("UpdateAccountInfo");
  };

  const onSignOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        FBLoginManager.logOut();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  //TODO: add phone
  return (
    <CurrentUserContext.Consumer>
      {({ user }) => (
        <View style={styles.general}>
          <Surface style={styles.surface}>
            <Avatar.Icon size={100} icon="account" />
            <Title style={styles.title}>{user ? user.fullName : ""}</Title>
            <Button icon="email" mode="text">
              {user ? user.email : ""}
            </Button>
            <Button
              style={styles.SignOutButton}
              icon="account-arrow-right"
              mode="contained"
              onPress={onSignOutPress}
            >
              Cerrar sesión
            </Button>
            <Button
              style={styles.EditAccountButton}
              icon="account-edit"
              mode="contained"
              onPress={onEditAccountPress}
            >
              Editar información
            </Button>
          </Surface>
        </View>
      )}
    </CurrentUserContext.Consumer>
  );
}
