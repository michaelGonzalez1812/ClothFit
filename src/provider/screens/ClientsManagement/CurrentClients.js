import React, { useEffect, useState, useContext } from 'react'
import { FAB } from 'react-native-paper';
import { SafeAreaView, FlatList } from 'react-native'
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';
import styles from './styles';
import { firebase } from '../../../firebase/config';
import { CurrentUserContext } from '../../../auth';

export default function CurrentClients({ navigation }) {

    const [currentClients, setCurrentClients] = useState([]);
    const userId = useContext(CurrentUserContext).user.id;

    const CurrentClientCard = ({ item }) => {

        const LeftContent = props => <Avatar.Icon {...props} icon="account" />
    
        return (
            <Card style={styles.clientCard} onPress={() => {
                navigation.navigate('ClientHistory', {item})
            }}>
                <Card.Title title={item.clientData.fullName} left={LeftContent} />
                <Card.Content>
                    <Paragraph>{item.clientData.email}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button icon="cash" mode="text">
                        {item.balance}
                    </Button>
                </Card.Actions>
            </Card>
        )
    }

    useEffect(() => {
        //Get current clients
        var unsubscribe = firebase.firestore().collection("client-x-provider")
            .where("providerId", "==", userId)
            .onSnapshot(querySnapshot => {
                var clients = [];
                querySnapshot.forEach(doc => {
                    var data = doc.data();
                    data.docId = doc.id;
                    clients.push(data);
                });
                setCurrentClients(clients);
            });

        //TODO: Check it is unsubscribing correctly
        return () => unsubscribe()
    }, [])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={currentClients}
                    renderItem={CurrentClientCard}
                    keyExtractor={item => item.docId}
                    extraData={navigation}
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
