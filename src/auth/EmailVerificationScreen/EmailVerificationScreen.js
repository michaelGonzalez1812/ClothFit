import React, { useEffect } from "react";
import { View, Alert } from "react-native";
import { Button, Title, Text } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import styles from "./styles";
import { LoginManager as FBLoginManager } from "react-native-fbsdk-next";

export default function EmailVerificationScreen({ navigation }) {
  const onSignOutPress = () => {
    auth()
      .signOut()
      .then(function () {
        FBLoginManager.logOut();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  async function sendEmail() {
    var actionCodeSettings = {
      url: "https://clothfit.page.link/?email=" + auth().currentUser.email,
      iOS: {
        bundleId: "com.example.ios",
      },
      android: {
        packageName: "com.michaelsoft.clothfit",
        installApp: false,
        minimumVersion: "12",
      },
      handleCodeInApp: false,
      // When multiple custom dynamic link domains are defined, specify which
      // one to use.
      dynamicLinkDomain: "clothfit.page.link",
    };
    auth()
      .currentUser.sendEmailVerification(actionCodeSettings)
      .then(function () {
        console.log("verification email send");
      })
      .catch(function (error) {
        console.error(error);
        Alert.alert("Error: verfication email send");
      });
  }

  const onResendLinkPress = () => {
    Alert.alert(
      "Reenviar correo de confirmación?",
      "El correo de confirmación enviado antoriormente podría tomar algunos minutos en entregarse. Desea reenviar el correo?",
      [
        {
          text: "Sí",
          onPress: () => sendEmail(),
        },
        {
          text: "Esperar",
          onPress: () => console.log("Wait Pressed"),
          style: "cancel",
        },
      ]
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      auth().currentUser.reload();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Verifique su correo electrónico</Title>
      <Button
        labelStyle={{ fontSize: 100 }}
        style={styles.emailIcon}
        icon="email-check"
      />
      <Text>
        Por favor, ingrese al enlace que le hemos enviado a la dirección{" "}
        {auth().currentUser.email}, para verificar su correo electrónico. No
        recibió el correo?,{" "}
        <Text onPress={onResendLinkPress} style={styles.footerLink}>
          envielo nuevamente
        </Text>
        .
      </Text>
      <Button
        style={styles.button}
        icon="account-arrow-right"
        mode="contained"
        onPress={onSignOutPress}
      >
        Iniciar con otro usuario
      </Button>
    </View>
  );
}
