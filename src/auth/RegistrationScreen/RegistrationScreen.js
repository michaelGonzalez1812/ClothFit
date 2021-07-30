import React, { useState } from "react";
import { Image, Text, View, Keyboard, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import styles from "./styles";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const onFooterLinkPress = () => {
    navigation.navigate("LogIn");
  };

  const onRegisterPress = () => {
    Keyboard.dismiss();
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
          isProvider: false,
          balance: 0,
          providers: [],
          clients: [],
        };
        const usersRef = firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then((data) => {
            sendEmail();
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  //TODO: Configure scrol for registrations screen
  return (
    <View>
      <View>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/adaptive-icon.png")}
        />
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
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          label="Contraseña"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          label="Confirmar Contraseña"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button
          style={styles.button}
          icon="account-arrow-right"
          mode="contained"
          onPress={() => onRegisterPress()}
        >
          Registrarse
        </Button>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Ya tienes una cuenta?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Inicia sesión
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
