import React, { useState, useContext, useEffect } from "react";
import { View, Keyboard } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { CurrentUserContext } from "./../../../auth";
import styles from "./update_account_styles";
import { firebase } from "../../../firebase/config";

export default function UpdateAccountInfo({ navigation }) {
  const currentUser = useContext(CurrentUserContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  /***** GUI flags *****/
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showBalanceUpdateErrorSnackbar, setShowBalanceUpdateErrorSnackbar] =
    useState(false);

  const onUpdateInfoPress = () => {
    Keyboard.dismiss();
    const db = firebase.firestore();

    const batch = db.batch();
    const userDocRef = db.collection("users").doc(currentUser.user.id);

    const data = {
      fullName,
    };

    batch.update(userDocRef, data);
    // Commit the batch
    batch.commit().then(function () {
      setShowSuccessSnackbar(!showSuccessSnackbar);
    });
  };

  /* Hide all Snackbar */
  const onDismissSnackBar = () => {
    setShowSuccessSnackbar(false);
    setShowBalanceUpdateErrorSnackbar(false);
  };

  useEffect(() => {
    if (currentUser != null) {
      setFullName(currentUser.user.fullName);
      setEmail(currentUser.user.email);
    }
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          label="Nombre"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          label="Correo"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          disabled="true"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button
          style={styles.button}
          icon="account-edit"
          mode="contained"
          onPress={() => onUpdateInfoPress()}
        >
          Actualizar
        </Button>

        <Snackbar visible={showSuccessSnackbar} onDismiss={onDismissSnackBar}>
          información actualizada!
        </Snackbar>

        {/* TODO: manage on error logic */}
        <Snackbar
          visible={showBalanceUpdateErrorSnackbar}
          onDismiss={onDismissSnackBar}
        >
          Error actualizando el balance del ciente!
        </Snackbar>
      </View>
    </View>
  );
}
