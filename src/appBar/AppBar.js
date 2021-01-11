import React from 'react';
import { Appbar, IconButton } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';

export default function Header({ scene, previous, navigation }) {

    return (
        <Appbar.Header>
            {previous ? (
                <Appbar.BackAction
                    onPress={navigation.goBack}
                />
            ) : (
                    <IconButton
                        icon="menu"
                        size={30}
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                    />
                )}
        </Appbar.Header>
    );
};