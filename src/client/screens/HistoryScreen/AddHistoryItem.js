import React, { useEffect, useState, useContext } from 'react'
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
} from 'react-native-paper';


/* To use this component you should:
 * - call it with an empty item if you are going to add a new one
 * - or call it with a full item to modify it
 */
export default function AddHistoryItem({ route, navigation }) {
    
    /* It can be the client or the provider.
     * Depent if acutal signed user is client of provider
     */
    var user = route.params.client;
    var item = route.params.item;
    
    /***** item info *****/
    //To know if we are modifying an item or adding a new one
    const [isModifying, setIsModifying] = 
        useState(item.id == ""? false : true)
    const [date, setDate] = 
        useState(isModifying? item.data.date.toDate() : item.data.date);
    const [amount, setAmount] = useState(item.data.amount.toString());
    const [description, setDescription] = useState(item.data.description);
    const [type, setType] = useState(item.data.type);
    const [transacId, setTransacId] = useState(item.id);
    
    /***** GUI flags *****/
    const [show, setShow] = useState(false);
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [showBalanceUpdateErrorSnackbar, setShowBalanceUpdateErrorSnackbar] = useState(false);
    
    /***** Context *****/
    const currentSignedUser = useContext(CurrentUserContext).user;

    useEffect(() => {
        /* Update item info */
        setIsModifying(item.id == ""? false : true);
        setDate(isModifying? item.data.date.toDate() : item.data.date);
        setAmount(item.data.amount.toString());
        setDescription(item.data.description);
        setType(item.data.type);
        setTransacId(item.id);
    }, [item]);

    /* Hide all Snackbar */
    const onDismissSnackBar = () => {
        setShowSuccessSnackbar(false);
        setShowBalanceUpdateErrorSnackbar(false);
    }

    const onDateChange = (event, selectedDate) => {
        setShow(false);
        setDate(selectedDate);
    };

    const onAmountChange = (text) => {
        setAmount(text.replace(/[^0-9]/g, ''));
    }

    const updateClientBalance = (clientId, balance) => {
        firebase.firestore().collection("users")
            .doc(clientId)
            .update({
                balance
            })
            .then(function () {
                isModifying ? 
                    setShowSuccessSnackbar(!showSuccessSnackbar) :
                    setShowSuccessSnackbar(!showSuccessSnackbar)
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                showBalanceUpdateErrorSnackbar(true);
            });
    }

    /**********************************************************************
     * Add new item logic
     **********************************************************************/
    const onAddPress = () => {
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
            type,
            modified: false
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

    const onUndoAdd = () => {
        firebase.firestore().collection("balance-history")
            .doc(transacId)
            .delete()
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }

    /**********************************************************************
     * Modify item logic
     **********************************************************************/

    const onModifyPress = () => {

        Keyboard.dismiss();
        intAmount = parseInt(amount);
        client_id = currentSignedUser.isProvider ? user.id : currentSignedUser.id;

        /* Revert last effect in the balance */
        /* item var has the original value */
        if (item.data.type == "sale") {
            balance = currentSignedUser.isProvider ? 
                user.balance - item.data.amount : 
                currentSignedUser.balance - item.data.amount;
        }
        else {
            balance = currentSignedUser.isProvider ? 
                user.balance + item.data.amount : 
                currentSignedUser.balance + item.data.amount;
        }

        balance = (type == "sale") ? balance + intAmount : balance - intAmount
        
        data = {
            client_id,
            provider_id: currentSignedUser.isProvider ? currentSignedUser.id : user.id,
            date,
            amount: intAmount,
            balance,
            description,
            type,
            modified: true
        };

 
        firebase.firestore().runTransaction(function(transaction) {
            transaction.update(
                firebase.firestore().collection("balance-history").doc(transacId), 
                data
            );
            transaction.update(
                firebase.firestore().collection("users").doc(data.client_id),
                {
                    balance: data.balance
                }
            );
            return Promise.resolve('transaction complete');   
        }).then(function() {
            console.log("Transaction successfully committed!");
        }).catch(function(error) {
            console.log("Transaction failed: ", error);
        })
    }

    const onUndoModify = () => {
        firebase.firestore().collection("balance-history")
            .doc(transacId)
            .delete()
            .catch(function (error) {
                console.error("Error removing document: ", error);
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
                    onPress= { isModifying? onModifyPress : onAddPress }
                >
                    { isModifying? "Actualizar" : "Agregar" }
                </Button>

                <Snackbar
                    visible={showSuccessSnackbar}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Deshacer',
                        onPress: () => { isModifying? onUndoModify() : onUndoAdd() }
                    }}>
                    Transacción realizada!
                </Snackbar>
                
                {/* BalanceUpdateErrorSnackbar */}
                <Snackbar
                    visible={showBalanceUpdateErrorSnackbar}
                    onDismiss={onDismissSnackBar}
                    >
                    Error actualizando el balance del ciente!
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
