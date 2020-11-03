import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    surface: {
        padding: 10,
        alignItems: 'center', //horizontal
        justifyContent: 'center', //veritical
        elevation: 4,
        flex: 1
    },

    general: {
        ...StyleSheet.absoluteFill,
        padding: 15,
        justifyContent: 'center'
    }
});