import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    surface: {
        alignItems: 'center', //horizontal
        justifyContent: 'center', //veritical
        elevation: 4,
        flex: 1
    },

    general: {
        ...StyleSheet.absoluteFill,
        padding: 15,
        justifyContent: 'center'
    },

    SignOutButton: {
        position: 'absolute',
        margin: 50,
        bottom: 0,
    },
});