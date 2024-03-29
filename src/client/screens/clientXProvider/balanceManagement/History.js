import React, { useEffect, useState, useContext } from "react";
import { FlatList, View } from "react-native";
import moment from "moment";
import styles from "./styles";
import { ClientXProviderContext } from "../../../../context";
import { ActivityIndicator } from "react-native-paper";
import {
  IconButton,
  Card,
  Caption,
  Paragraph,
  Avatar,
} from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

export default function History({ route, navigation }) {
  const { clientXProvider, dispatchClientXProvider } = useContext(
    ClientXProviderContext
  );
  const [balanceHistory, setBalanceHistory] = useState([]);

  const HistoryItemCard = ({ item, index }) => {
    const LeftContent = (type) =>
      type == "sale" ? (
        <IconButton icon="cart-arrow-down" size={25} />
      ) : (
        <IconButton icon="cash-refund" size={25} />
      );

    return (
      <Card style={item.type == "sale" ? styles.cardSale : styles.cardPayment}>
        <Card.Title
          title={"₡ ".concat(item.amount)}
          subtitle={"balance: ₡ ".concat(item.balance)}
          left={() => LeftContent(item.type)}
        />
        <Card.Content>
          <View style={{ alignItems: "center" }}>
            <Paragraph>{item.description}</Paragraph>
          </View>
        </Card.Content>
        <Card.Actions>
          <View style={{ padding: 5 }}>
            <Caption>
              {item.date ? moment(item.date.toDate()).format("DD-MM-YYYY") : ""}
            </Caption>
          </View>
        </Card.Actions>
      </Card>
    );
  };

  useEffect(() => {
    //Get history

    setBalanceHistory([]); // Clean when change the ClientXProvider

    if (clientXProvider != null) {
      var unsubscribe = firestore()
        .collection("client-x-provider")
        .doc(clientXProvider.docId)
        .collection("balance-history")
        .orderBy("date", "desc")
        .onSnapshot(
          (querySnapshot) => {
            var historyItem = [];
            querySnapshot.forEach((doc) => {
              var data = doc.data();
              data.docId = doc.id;
              historyItem.push(data);
            });
            setBalanceHistory(historyItem);
          },
          (error) => {
            console.error(error);
          }
        );
      //TODO: Check it is unsubscribir correctly
      return () => unsubscribe();
    }
  }, [clientXProvider]);

  const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

  return clientXProvider != null ? (
    <>
      <Card style={styles.cardTittle}>
        <Card.Title
          title={clientXProvider.providerData.fullName}
          subtitle={"₡ ".concat(clientXProvider.balance.toString())}
          left={LeftContent}
        />
      </Card>

      <FlatList
        data={balanceHistory}
        renderItem={HistoryItemCard}
        keyExtractor={(item) => item.docId}
        extraData={navigation}
      />
    </>
  ) : (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} />
    </View>
  );
}
