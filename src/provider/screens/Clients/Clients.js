import React from 'react'
import { FAB } from 'react-native-paper';
import styles from './styles';


export default function Clients({ navigation }) {
    return (

            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={ () => navigation.navigate('AddClient') }
            />

    )
}
