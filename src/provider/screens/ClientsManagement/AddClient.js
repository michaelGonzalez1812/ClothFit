import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { AddClientCard } from "./AddClientCard"
import styles from './styles';
import { firebase } from '../../../firebase/config';
import { CurrentUserContext } from './../../../auth';

export default function AddClient({ navigation }) {

    const [availableClients, setAvailableClients] = useState([]);
    const [currentClients, setCurrentClients] = useState([]);
    const userId = useContext(CurrentUserContext).user.id;

    useEffect(() => {
        //Get current clients
        var unsubscribe = firebase.firestore().collection("users")
            .doc(userId)
            .onSnapshot(function (doc) {
                setCurrentClients(doc.data().clients);
            });
        //TODO: Check it is unsubscribir correctly
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (currentClients.length > 0) {
            var unsubscribe = firebase.firestore().collection("users")
                .where("isProvider", "==", false)
                .where("id", "not-in", currentClients)
                .onSnapshot(
                    querySnapshot => {
                        var newClientsData = []
                        querySnapshot.forEach(doc => {
                            newClientsData.push(doc.data())
                        });
                        setAvailableClients(newClientsData)
                    },
                    error => {
                        console.log(error);
                    }
                )
            return () => unsubscribe()
        }

    }, [currentClients])


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={availableClients}
                renderItem={AddClientCard}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

