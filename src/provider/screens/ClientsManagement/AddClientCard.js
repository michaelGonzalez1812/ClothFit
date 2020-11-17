import React from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { CurrentUserContext } from '../../../auth';
import styles from './styles';
import { firebase } from '../../../firebase/config';

export const AddClientCard = ({ item }) => {

    const LeftContent = props => <Avatar.Icon {...props} icon="account" />

    const onAddClient = (clientId, providerId) => {
        const usersRef = firebase.firestore().collection('users')
        usersRef.doc(providerId).update({
            clients: firebase.firestore.FieldValue.arrayUnion(clientId)
        });
        usersRef.doc(clientId).update({
            providers: firebase.firestore.FieldValue.arrayUnion(providerId)
        });
    }

    return (
        <Card style={styles.clientCard}>
            <Card.Title title={item.fullName} left={LeftContent} />
            <Card.Content>
                <Title>{item.fullName}</Title>
                <Paragraph>{item.email}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <CurrentUserContext.Consumer>
                    {({ user }) => (
                        <Button
                            onPress={() => onAddClient(item.id, user.id)}
                        >
                            Add
                        </Button>
                    )}
                </CurrentUserContext.Consumer>
            </Card.Actions>
        </Card>
    )
}

