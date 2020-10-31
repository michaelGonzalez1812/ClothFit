import React from 'react';
import { Surface, Text } from 'react-native-paper';
import { firebase } from '../../../firebase/config';
import styles from './styles';

export default function AccountScreen({ navigation }) {

    const onSignOutPress = () => {
        firebase.auth().signOut().then(function () {
            //TODO: clean navigation stack
            //navigation.navigate('Login');
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Text>Surface</Text>
    )
}
