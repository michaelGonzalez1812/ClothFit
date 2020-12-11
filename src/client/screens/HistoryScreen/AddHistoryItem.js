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
     * Depent if acutal signed client_x_provider is client of provider
     */
    var client_x_provider = route.params.client_x_provider;
    var item = route.params.item;
    
    /***** item info *****/
    //To know if we are modifying an item or adding a new one
    const [isModifying, setIsModifying] = 
        useState(item.docId == ""? false : true)
    const [date, setDate] = 
        useState(isModifying? item.date.toDate() : item.date);
    const [amount, setAmount] = useState((item.amount != 0)? item.amount.toString() : "");
    const [description, setDescription] = useState(item.description);
    const [type, setType] = useState(item.type);
    
    /***** GUI flags *****/
    const [show, setShow] = useState(false);
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [showBalanceUpdateErrorSnackbar, setShowBalanceUpdateErrorSnackbar] = useState(false);
    
    /***** Context *****/
    const currentSignedUser = useContext(CurrentUserContext).user;

    useEffect(() => {
        /* Update item info */
        setIsModifying(item.docId == ""? false : true);
        setDate(isModifying? item.date.toDate() : item.date);
        setAmount((item.amount != 0)? item.amount.toString() : "");
        setDescription(item.description);
        setType(item.type);
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


    /**********************************************************************
     * Add new item logic
     **********************************************************************/
    const onAddPress = () => {
        Keyboard.dismiss();
        intAmount = parseInt(amount);

        balance = (type == "sale")? client_x_provider.balance + intAmount :
            client_x_provider.balance - intAmount;

        data = {
            date,
            amount: intAmount,
            balance,
            description,
            type,
            modified: false
        };

        // Get a new write batch
        var batch = firebase.firestore().batch();

        var client_x_providerDocRef = firebase.firestore()
            .collection("client-x-provider").doc(client_x_provider.docId);
        var newHistoryItemDocRef = client_x_providerDocRef
            .collection("balance-history")
            .doc();

        batch.set(newHistoryItemDocRef, data);
        batch.update(client_x_providerDocRef, { balance });

        // TODO: Check catch to commit
        // Commit the batch
        batch.commit().then(function () {
            setShowSuccessSnackbar(!showSuccessSnackbar)
        });
    }

    //TODO: develope
    /*
    const onUndoAdd = () => {
        firebase.firestore().collection("balance-history")
            .doc(transacId)
            .delete()
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }
    */

    /**********************************************************************
     * Modify item logic
     **********************************************************************/

    const onModifyPress = () => {
        Keyboard.dismiss();
        intAmount = parseInt(amount);

        /* Revert last effect in the balance */
        /* item var has the original value */
        balance = (type == "sale")? 
            client_x_provider.balance - item.amount :
            client_x_provider.balance + item.amount;

        balance = (type == "sale")? 
            balance + intAmount : 
            balance - intAmount
        
        data = {
            date,
            amount: intAmount,
            balance,
            description,
            type,
            modified: true
        };

        var batch = firebase.firestore().batch();

        var client_x_providerDocRef = firebase.firestore()
            .collection("client-x-provider").doc(client_x_provider.docId);
        var historyItemDocRef = client_x_providerDocRef
            .collection("balance-history")
            .doc(item.docId);
 
        batch.update(historyItemDocRef, data);
        batch.update(client_x_providerDocRef, { balance });

        // TODO: Check catch to commit
        // Commit the batch
        batch.commit().then(function () {
            setShowSuccessSnackbar(!showSuccessSnackbar)
        });
    }

    //TODO: develope
    /*
    const onUndoModify = () => {
        firebase.firestore().collection("balance-history")
            .doc(transacId)
            .delete()
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }
    */

    return (
        client_x_provider?
            <View style={styles.general}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="always">
                    <View style={styles.title}>
                        <Avatar.Icon size={100} icon="account" />

                        {currentSignedUser.isProvider ?
                            <Title> {client_x_provider.clientData.fullName} </Title>: 
                            <Title> {client_x_provider.providerData.fullName} </Title>
                        }
                        
                        <Button icon="cash" mode="text" >
                            {client_x_provider.balance}
                        </Button>
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
            </View > :
            <View></View>
    );
}
