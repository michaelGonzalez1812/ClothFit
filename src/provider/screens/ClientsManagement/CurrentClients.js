import React, { useEffect, useState, useContext } from 'react'
import { FAB } from 'react-native-paper';
import { SafeAreaView, FlatList } from 'react-native'
import { CurrentClientCard } from "./CurrentClientCard"
import styles from './styles';
import { firebase } from '../../../firebase/config';
import { CurrentUserContext } from '../../../auth';

export default function CurrentClients({ navigation }) {

    const [currentClientsId, setCurrentClientsId] = useState([]);
    const [currentClientsData, setCurrentClientsData] = useState([]);
    const userId = useContext(CurrentUserContext).user.id;

    useEffect(() => {
        //Get current clients
        var unsubscribe = firebase.firestore().collection("users")
            .doc(userId)
            .onSnapshot(function (doc) {
                setCurrentClientsId(doc.data().clients);
            });
        //TODO: Check it is unsubscribir correctly
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (currentClientsId.length > 0) {
            var unsubscribe = firebase.firestore().collection("users")
                .where("isProvider", "==", false)
                .where("id", "in", currentClientsId)
                .onSnapshot(
                    querySnapshot => {
                        var ClientsData = []
                        querySnapshot.forEach(doc => {
                            ClientsData.push(doc.data())
                        });
                        setCurrentClientsData(ClientsData)
                    },
                    error => {
                        console.log(error);
                    }
                )
            return () => unsubscribe()
        }

    }, [currentClientsId])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={currentClientsData}
                    renderItem={CurrentClientCard}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('AddClient')}
            />
        </>
    )
}