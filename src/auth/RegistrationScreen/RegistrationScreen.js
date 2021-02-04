import React, { useState } from 'react'
import { Image, Text, View, Keyboard  } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function RegistrationScreen({ navigation }) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('LogIn')
    }

    const onRegisterPress = () => {
        Keyboard.dismiss();
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                    isProvider: false,
                    balance: 0,
                    providers: [],
                    clients: []
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/images/adaptive-icon.png')}
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
                    onPress={() => onRegisterPress()}>

                    Registrarse
                </Button>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Ya tienes una cuenta? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Inicia sesión</Text></Text>
                </View>
            </View>
        </View>
    )
}