import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView, FlatList, View } from 'react-native'
import { 
    Avatar, 
    Button, 
    Card, 
    Title, 
    Paragraph, 
    Snackbar 
} from 'react-native-paper';
import styles from './styles';
import { firebase } from '../../../firebase/config';
import { CurrentUserContext } from './../../../auth';

export default function AddClient({ navigation }) {

    const [availableClients, setAvailableClients] = useState([]);
    const [currentClients, setCurrentClients] = useState([]);
    const provider = useContext(CurrentUserContext).user;
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

    const AddClientCard = ({ item }) => {

        const LeftContent = props => <Avatar.Icon {...props} icon="account" />
    
        const onAddClient = (client) => {
            var data = {
                clientId:   client.id,
                providerId: provider.id,
                balance:    0,
                clientData: {
                    fullName:   client.fullName,
                    email:      client.email,
                    isProvider: client.isProvider
                    },
                providerData: {
                    fullName:   provider.fullName,
                    email:      provider.email,
                    isProvider: provider.isProvider
                    }
            };

            var batch = firebase.firestore().batch();
            var newDocRef = firebase.firestore().collection("client-x-provider").doc();
            batch.set(newDocRef, data);

            batch.update(firebase.firestore().collection("users").doc(provider.id),
                {
                    clients: firebase.firestore.FieldValue.arrayUnion(client.id)
                });

            batch.update(firebase.firestore().collection("users").doc(client.id),
                {
                    providers: firebase.firestore.FieldValue.arrayUnion(provider.id)
                });

            // Commit the batch
            batch.commit().then(function () {
                setShowSuccessSnackbar(true);
            });
        }
    
        return (
            <View>
                <Card style={styles.clientCard}>
                    <Card.Title title={item.fullName} left={LeftContent} />
                    <Card.Content>
                        <Title>{item.fullName}</Title>
                        <Paragraph>{item.email}</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <View style={styles.righCardActions}>
                            <Button onPress={() => onAddClient(item)}>
                                Agregar
                            </Button>   
                        </View>
                    </Card.Actions>
                </Card>
            </View>
        )
    }
    
    useEffect(() => {
        //Get current clients
        var unsubscribe = firebase.firestore().collection("users")
            .doc(provider.id)
            .onSnapshot(function (doc) {
                var clients = doc.data().clients? doc.data().clients : [];
                clients.push(provider.id); // Avoid add itself
                setCurrentClients(clients);
            });
        //TODO: Check it is unsubscribir correctly
        return () => unsubscribe()
    }, []);

    useEffect(() => {
        if (currentClients.length > 0) {
            var unsubscribe = firebase.firestore().collection("users")
                .where("id", "not-in", currentClients)
                .onSnapshot(querySnapshot => {
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
    
    //TODO: Develop undo add client
    /*
    const onUndoAdd = () => {
        firebase.firestore().collection("client-provider")
            .doc(transacId)
            .delete()
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
    };
    */
   
    
    /* Hide all Snackbar */
    const onDismissSnackBar = () => {
        setShowSuccessSnackbar(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={availableClients}
                renderItem={AddClientCard}
                keyExtractor={item => item.id}
            />
            <Snackbar
                visible={showSuccessSnackbar}
                onDismiss={onDismissSnackBar}
                >
                Cliente agregado!
            </Snackbar>
        </SafeAreaView>
    )
}

