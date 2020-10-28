import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../../firebase/config'

export default function HomeScreen({ navigation }) {

    const onSignOutPress = () => {
        firebase.auth().signOut().then(function () {
            //TODO: clean navigation stack
            //navigation.navigate('Login');
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TouchableOpacity style={styles.button} onPress={onSignOutPress}>
                    <Text style={styles.buttonText}>SignOut</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


