import React, { useEffect, useState  } from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { ClientCard } from "./ClientCard"
import styles from './styles';
import { firebase } from '../../../firebase/config';

export default function AddClient({ navigation }) {

    const [clientsData, setClientsData] = useState([]);

    useEffect(() => {
        firebase.firestore().collection("users").where("isProvider", "==", false)
        .onSnapshot(
            querySnapshot => {
                newClientsData = []
                querySnapshot.forEach(doc => {
                    newClientsData.push(doc.data())
                });
                setClientsData(newClientsData)
            },
            error => {
                console.log(error);
            }
        )
    }, [])
    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={clientsData}
                renderItem={ClientCard}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

