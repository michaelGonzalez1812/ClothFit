import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';
import styles from './styles';

export default function RootNavigator() {
    return (
        <View style={styles.general}>
            <Title> 
                Pronto!
            </Title>
        </View>
    );
};