import React, { useState } from 'react';
import { Image, View } from 'react-native';
import styles from './styles';
import { Button, TextInput, Text } from 'react-native-paper';
import { firebase } from '../../firebase/config';
import { default as FBLoginButton } from './FBLoginButton';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('SignUp')
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../../assets/images/adaptive-icon.png')}
            />
            <View style={styles.socialMediaView}>
                <FBLoginButton/>
            </View>
            <TextInput
                style={styles.input}
                label='Correo'
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
                label='Contraseña'
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <Button style={styles.button} icon="account-arrow-right" mode="contained" onPress={() => onLoginPress()}>
                Iniciar
            </Button>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Aun no tienes una cuenta? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Registrate</Text></Text>
            </View>

        </View>
    )
}