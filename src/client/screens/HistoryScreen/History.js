import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native';
import moment from 'moment';
import styles from './styles';
import { firebase } from '../../../firebase/config';
import {
    IconButton,
    Card,
    Caption,
    Paragraph,
    FAB,
    Avatar
} from 'react-native-paper';

export default function History({ route, navigation }) {

    var client = route.params.item;
    const [balanceHistory, setBalanceHistory] = useState([]);

    const HistoryItemCard = ({ item }) => {

        const RightContent = type => 
            (type == "sale")?
            <IconButton
                icon="cart-arrow-down"
                size={25}
            /> 
            :
            <IconButton
                icon="cash-refund"
                size={25}
            />
        
        

        return (
            <Card style={styles.card}>
                <Card.Title
                    title={"₡ ".concat(item.data.amount)}
                    subtitle={"balance: ₡ ".concat(item.data.balance)}
                    right={() => RightContent(item.data.type)}
                />
                <Card.Content>
                    <View style={{alignItems: 'center'}}>
                        <Paragraph>{item.data.description}</Paragraph>
                    </View>
                </Card.Content>
                <Card.Actions>
                    <View style={{ padding: 5 }}>
                        <Caption>{moment(item.data.date.toDate()).format('DD-MM-YYYY')}</Caption>
                    </View>
                    <View style={styles.righCardActions}>
                        <IconButton
                            icon="pencil"
                            size={20}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                </Card.Actions>
            </Card>
        )
    }

    useEffect(() => {
        //Get current clients
        setBalanceHistory([])
        var unsubscribe = firebase.firestore().collection("balance-history")
            .where("client_id", "==", client.id)
            .orderBy("date", "desc")
            .onSnapshot(
                querySnapshot => {
                    var historyItem = []
                    querySnapshot.forEach(doc => {
                        historyItem.push({
                            data: doc.data(),
                            id: doc.id
                        })
                    });
                    setBalanceHistory(historyItem)
                },
                error => {
                    console.log(error);
                }
            );
        //TODO: Check it is unsubscribir correctly
        return () => unsubscribe()
    }, [client])



    const LeftContent = props => <Avatar.Icon {...props} icon="account" />

    return (
        <>
            <Card style={styles.card}>
                <Card.Title
                    title={client.fullName}
                    subtitle={"₡ ".concat(client.balance.toString())}
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
