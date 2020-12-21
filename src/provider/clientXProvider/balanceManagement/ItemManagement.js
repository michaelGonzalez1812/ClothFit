import React, { useEffect, useState, useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import moment from 'moment';
import { firebase } from '../../../firebase/config';
import { CurrentUserContext } from '../../../auth';
import { ClientXProviderContext } from '../../../context';
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
export default function ItemManagement({ route }) {
         
    /* It can be the client or the provider.
     * Depent if acutal signed clientXProvider is client of provider
     */
    const item = route.params.item;
    const subhistory = route.params.subhistory;
    
    /***** item info *****/
    //To know if we are modifying an item or adding a new one
    const isModifying = item.docId == ""? false : true;
    //const [isModifying, setIsModifying] = 
     //   useState(updating);
    const [date, setDate] = 
        useState(isModifying? item.date : item.date);
    const [amount, setAmount] = useState((item.amount != 0)? item.amount.toString() : "");
    const [description, setDescription] = useState(item.description);
    const [type, setType] = useState(item.type);
    
    /***** GUI flags *****/
    const [show, setShow] = useState(false);
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [showBalanceUpdateErrorSnackbar, setShowBalanceUpdateErrorSnackbar] = useState(false);

    /***** Context *****/
    const { clientXProvider, dispatchClientXProvider } = useContext(ClientXProviderContext);
    const currentSignedUser = useContext(CurrentUserContext).user;
    
    useEffect(() => {
        /* Update item info */
        //setIsModifying(item.docId == ""? false : true);
        const isModifying = item.docId == ""? false : true;
        setDate(isModifying? item.date : item.date);
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
        var intAmount = parseInt(amount);

        var newBalance = (type == "sale")? clientXProvider.balance + intAmount :
            clientXProvider.balance - intAmount;

        const data = {
            date: firebase.firestore.FieldValue.serverTimestamp(),
            amount: intAmount,
            balance: newBalance,
            description,
            type,
            modified: false
        };

        // Get a new write batch
        var batch = firebase.firestore().batch();

        var clientXProviderDocRef = firebase.firestore()
            .collection("client-x-provider").doc(clientXProvider.docId);
        var newHistoryItemDocRef = clientXProviderDocRef
            .collection("balance-history")
            .doc();

        batch.set(newHistoryItemDocRef, data);
        batch.update(clientXProviderDocRef, { balance: newBalance });

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
            clientXProvider.balance - item.amount :
            clientXProvider.balance + item.amount;

        balance = (type == "sale")? 
            balance + intAmount : 
            balance - intAmount

        const fixFactor = balance - clientXProvider.balance;
        
        data = {
            //date, do not modify
            amount: intAmount,
            balance,
            description,
            type,
            modified: true
        };

        
        const db = firebase.firestore();
        const batch = db.batch();
        const clientXProviderDocRef = db.collection("client-x-provider")
            .doc(clientXProvider.docId);
        var balanceHistoryItemDocRef = clientXProviderDocRef
            .collection("balance-history")
            .doc(item.docId);

        batch.update(balanceHistoryItemDocRef, data);

        if (fixFactor != 0)
            subhistory.forEach(element => {
                balanceHistoryItemDocRef =  clientXProviderDocRef
                    .collection("balance-history")
                    .doc(element.docId);
                batch.update(balanceHistoryItemDocRef, { balance: element.balance + fixFactor })
            });

        batch.update(clientXProviderDocRef, { balance });

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
        clientXProvider?
            <View style={styles.general}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="always">
                    <View style={styles.title}>
                        <Avatar.Icon size={100} icon="account" />

                        {currentSignedUser.isProvider ?
                            <Title> {clientXProvider.clientData.fullName} </Title>: 
                            <Title> {clientXProvider.providerData.fullName} </Title>
                        }
                        
                        <Button icon="cash" mode="text" >
                            {clientXProvider.balance}
                        </Button>
                    </View>
                    <Button
                        style={styles.button}
                        icon="calendar"
                        mode="outlined"
                        disabled= {true}
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
                            label="Pago"
                            value="payment"
                        />
                        <RadioButton.Item
                            style={styles.radionButton}
                            label="Venta"
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
                        >
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
            <View><Button
            style={styles.button}
            mode="contained"
        >
            Actualizar
        </Button></View>
    );
}
