import React from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import styles from './styles';

export const ClientCard = ({ item }) => {

    const LeftContent = props => <Avatar.Icon {...props} icon="account" />

    return (
        <Card style={styles.clientCard}>
            <Card.Title title={item.fullName} left={LeftContent} />
            <Card.Content>
                <Title>{item.fullName}</Title>
                <Paragraph>{item.email}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button>Add</Button>
            </Card.Actions>
        </Card>
    )
}

