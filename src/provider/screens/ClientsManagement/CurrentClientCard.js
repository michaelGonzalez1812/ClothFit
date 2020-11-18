import React from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { CurrentUserContext } from '../../../auth';
import styles from './styles';
import { firebase } from '../../../firebase/config';

export const CurrentClientCard = ({ navigation, item }) => {

    const LeftContent = props => <Avatar.Icon {...props} icon="account" />

    return (
        <Card style={styles.clientCard} onPress={() => {
            navigation.navigate('ClientHistory', {item})
        }}>
            <Card.Title title={item.fullName} left={LeftContent} />
            <Card.Content>
                <Title>{item.fullName}</Title>
                <Paragraph>{item.email}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button icon="cash" mode="text">
                    {item.balance}
                </Button>
            </Card.Actions>
        </Card>
    )
}

