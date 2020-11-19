import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image, Text, View } from 'react-native'
import {
    Avatar,
    Surface,
    TextInput,
    Title,
    Button,
    RadioButton
} from 'react-native-paper';
import styles from './styles';
import moment from 'moment';


export default function AddHistoryItem({ route, navigation }) {
    var client = route.params.client;

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState("");
    const [value, setValue] = React.useState('payment');

    const onDateChange = (event, selectedDate) => {
        setShow(false);
        setDate(selectedDate);
    };

    const onAmountChange = (text) => {
        setAmount(text.replace(/[^0-9]/g, ''));
    }

    return (
        <View style={styles.general}>
            <Surface style={styles.surface}>
                <View style={styles.title}>
                    <Avatar.Icon size={100} icon="account" />
                    <Title>{client ? client.fullName : ""}</Title>
                </View>
                <Button
                    style={styles.button}
                    icon="calendar"
                    mode="outlined"
                    onPress={() => {
                        setShow(true);
                    }}>
                    {moment(date).format('DD-MM-YYYY')}
                </Button>
                <TextInput
                    style={styles.input}
                    label="Amount"
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={onAmountChange}
                />
                <TextInput
                    style={styles.input}
                    label="Description"
                    numberOfLines={4}
                    multiline={true}
                />
                <Button
                    style={styles.acceptButton}
                    mode="contained"
                >
                    Accept
                </Button>

                <RadioButton.Group 
                    onValueChange={value => setValue(value)} 
                    value={value}
                >
                    <RadioButton.Item 
                        style={styles.radionButton}
                        label="Payment" 
                        value="payment" 
                    />
                    <RadioButton.Item 
                        style={styles.radionButton}
                        label="Sale" 
                        value="sale" 
                    />
                </RadioButton.Group>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onDateChange}
                    />
                )}
            </Surface>
        </View>
    );
}