import React from 'react';
import { Appbar, Text } from 'react-native-paper';
import styles from './styles';

export default function Header({ scene, previous, navigation }) {

    return (
        <Appbar.Header>
            {previous ? (
                <>
                    <Appbar.BackAction 
                        onPress={navigation.goBack} 
                        color="#FFFFFF"
                    />

                    <Text style={styles.title}> ClothFit </Text>
                </>
            ) : 
            (
                <Text style={styles.title}> ClothFit </Text>
            )}
        </Appbar.Header>
    );
};