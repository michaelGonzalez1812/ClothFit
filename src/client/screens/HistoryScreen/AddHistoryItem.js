import React, { useState, useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import moment from 'moment';
import { firebase } from '../../../firebase/config'
import { CurrentUserContext } from '../../../auth';
import {
    Avatar,
    TextInput,
    Title,
    Button,
    RadioButton,
    Snackbar,
    Subheading,
    Headline
} from 'react-native-paper';

export default function AddHistoryItem({ route, navigation }) {
    /*
    * It can be the client or the provider.
    * Depent if acutal signed user is client of provider
    */
    var user = route.params.client;

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("payment");
    const [visible, setVisible] = useState(false);
    const [transacId, setTransacId] = useState("");

    const currentSignedUser = useContext(CurrentUserContext).user;

    const onDismissSnackBar = () => setVisible(false);

    const onDateChange = (event, selectedDate) => {
        setShow(false);
        setDate(selectedDate);
    };

    const onAmountChange = (text) => {
        setAmount(text.replace(/[^0-9]/g, ''));
    }

    const onUndoTransaction = () => {
        firebase.firestore().collection("balance-history")
            .doc(transacId)
            .delete()
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }

    const updateClientBalance = (clientId, balance) => {
        firebase.firestore().collection("users")
            .doc(clientId)
            .update({
                balance
            })
            .then(function () {
                setVisible(!visible)
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

    const onAcceptPress = () => {
        Keyboard.dismiss();
        intAmount = parseInt(amount);
        client_id = currentSignedUser.isProvider ? user.id : currentSignedUser.id;

        if (type == "sale") {
            balance = currentSignedUser.isProvider ? user.balance + intAmount : currentSignedUser.balance + intAmount;
        }
        else {
            balance = currentSignedUser.isProvider ? user.balance - intAmount : currentSignedUser.balance - intAmount;
        }

        data = {
            client_id,
            provider_id: currentSignedUser.isProvider ? currentSignedUser.id : user.id,
            date,
            amount: intAmount,
            balance,
            description,
            type
        };

        firebase.firestore().collection("balance-history")
            .add(data)
            .then((docRef) => {
                setTransacId(docRef.id)
                updateClientBalance(this.data.client_id, this.data.balance)
            })
            .catch((error) => {
                alert(error)
            });

    }

    return (

        <View style={styles.general}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always">
                <View style={styles.title}>
                    <Avatar.Icon size={100} icon="account" />

                    {currentSignedUser.isProvider ?
                        <>
                            <Title> {user.fullName} </Title>
                            <Button icon="cash" mode="text" >
                                {user.balance}
                            </Button>
                        </>
                        : 
                        <>
                            <Title> {user.fullName} </Title>
                            <Button icon="cash" mode="text" > 
                                {currentSignedUser.balance} 
                            </Button>
                        </>
                    }
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
                    value={description}
                    numberOfLines={4}
                    multiline={true}
                    onChangeText={(text) => {
                        setDescription(text)
                    }}
                />

                <RadioButton.Group
                    onValueChange={value => setType(value)}
                    value={type}
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

                <Button
                    style={styles.button}
                    mode="contained"
                    onPress={onAcceptPress}
                >
                    Accept
                </Button>

                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Deshacer',
                        onPress: () => { onUndoTransaction() }
                    }}>
                    Transacción realizada!
                </Snackbar>

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
            </KeyboardAwareScrollView>
        </View >
    );
}
