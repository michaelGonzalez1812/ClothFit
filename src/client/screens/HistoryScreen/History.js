import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native';
import { 
    IconButton, 
    Card, 
    Title, 
    Paragraph, 
    FAB, 
    Avatar, 
    Surface,
    Button 
} from 'react-native-paper';
import styles from './styles';
import { firebase } from '../../../firebase/config';

export default function History({ route, navigation }) {

    var client = route.params.item;
    const [balanceHistory, setBalanceHistory] = useState([]);

    const HistoryItemCard = ({ item }) => {

        return (
            <Card style={styles.card}>
                <Card.Title title={item.type} />
                <Card.Content>
                    <Title>Monto: {item.amount}</Title>
                    <Paragraph>{item.description}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <IconButton
                        icon="delete"
                        size={20}
                        onPress={() => console.log('Pressed')}
                    />
                </Card.Actions>
            </Card>
        )
    }

    useEffect(() => {
        //Get current clients
        var unsubscribe = firebase.firestore().collection("balance-history")
            .where("client_id", "==", client.id)
            .onSnapshot(
                querySnapshot => {
                    var historyItem = []
                    querySnapshot.forEach(doc => {
                        historyItem.push(doc.data())
                    });
                    setBalanceHistory(historyItem)
                },
                error => {
                    console.log(error);
                }
            );
        //TODO: Check it is unsubscribir correctly
        return () => unsubscribe()
    }, [])

    const LeftContent = props => <Avatar.Icon {...props} icon="account" />

    return (
        <>
            <Card style={styles.card}>
                <Card.Title 
                    title={client.fullName} 
                    subtitle={client.balance.toString()}
                    left={LeftContent}
                />
            </Card>
            <FlatList
                data={balanceHistory}
                renderItem={HistoryItemCard}
                keyExtractor={item => item.id}
                extraData={navigation}
            />

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('AddClientHistoryItem', { client })}
            />
        </>
    )
}
