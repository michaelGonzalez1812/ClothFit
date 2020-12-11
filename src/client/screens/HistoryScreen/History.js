import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native';
import moment from 'moment';
import styles from './styles';
import { firebase } from '../../../firebase/config';
import { emptyItem } from './EmptyItem'
import {
    IconButton,
    Card,
    Caption,
    Paragraph,
    FAB,
    Avatar
} from 'react-native-paper';


export default function History({ route, navigation }) {

    const client_x_provider = route.params.item;

    const [balanceHistory, setBalanceHistory] = useState([]);

    const HistoryItemCard = ({ item }) => {
        
        const RightContent = type => 
            (type == "sale")?
            <IconButton
                icon="cart-arrow-down"
                size={25}
            /> :
            <IconButton
                icon="cash-refund"
                size={25}
            />
        
        return (
            <Card style={styles.card}>
                <Card.Title
                    title={"₡ ".concat(item.amount)}
                    subtitle={"balance: ₡ ".concat(item.balance)}
                    right={() => RightContent(item.type)}
                />
                <Card.Content>
                    <View style={{alignItems: 'center'}}>
                        <Paragraph>{item.description}</Paragraph>
                    </View>
                </Card.Content>
                <Card.Actions>
                    <View style={{ padding: 5 }}>
                        <Caption>{moment(item.date.toDate()).format('DD-MM-YYYY')}</Caption>
                    </View>
                    <View style={styles.righCardActions}>
                        <IconButton
                            icon="pencil"
                            size={20}
                            onPress={ () => 
                                navigation.navigate('AddClientHistoryItem', 
                                    { 
                                        client_x_provider: client_x_provider, 
                                        item: item 
                                    })
                            }
                        />
                    </View>
                </Card.Actions>
            </Card>
        )
    }

    useEffect(() => {
        //Get history
        var unsubscribe = firebase.firestore().collection("client-x-provider")
            .doc(client_x_provider.docId)
            .collection("balance-history")
            .orderBy("date", "desc")
            .onSnapshot(
                querySnapshot => {
                    var historyItem = []
                    querySnapshot.forEach(doc => {
                        var data = doc.data();
                        data.docId = doc.id;
                        historyItem.push(data);
                    });
                    setBalanceHistory(historyItem)
                },
                error => {
                    console.log(error);
                }
            );
        //TODO: Check it is unsubscribir correctly
        return () => unsubscribe()
    }, [client_x_provider])



    const LeftContent = props => <Avatar.Icon {...props} icon="account" />

    return (
        <>
            <Card style={styles.card}>
                <Card.Title
                    title={client_x_provider.clientData.fullName}
                    subtitle={"₡ ".concat(client_x_provider.balance.toString())}
                    left={LeftContent}
                />
            </Card>

            <FlatList
                data={balanceHistory}
                renderItem={HistoryItemCard}
                keyExtractor={item => item.docId}
                extraData={navigation}
            />

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => 
                    navigation.navigate('AddClientHistoryItem', { client_x_provider: client_x_provider, item: emptyItem })
                }
            />
        </>
    )
}
