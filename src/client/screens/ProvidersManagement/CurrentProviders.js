import React, { useEffect, useState, useContext } from "react";
import { FlatList } from "react-native";
import { Avatar, Button, Card, Paragraph } from "react-native-paper";
import styles from "./styles";
import { CurrentUserContext } from "../../../auth";
import { ClientXProviderContext } from "../../../context";
import firestore from "@react-native-firebase/firestore";

export default function CurrentProviders({ navigation }) {
  const [currentProviders, setCurrentProviders] = useState([]);
  const userId = useContext(CurrentUserContext).user.id;
  const { clientXProviderState, dispatchClientXProvider } = useContext(
    ClientXProviderContext
  );

  const CurrentProviderCard = ({ item }) => {
    const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

    return (
      <Card
        style={styles.clientCard}
        onPress={() => {
          dispatchClientXProvider({
            type: "UPDATE",
            clientXProviderDocId: item.docId,
          });
          navigation.push("BalanceHistory");
        }}
      >
        <Card.Title title={item.providerData.fullName} left={LeftContent} />
        <Card.Content>
          <Paragraph>{item.providerData.email}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button icon="cash" mode="text">
            {item.balance}
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  useEffect(() => {
    //Get current providers
    var unsubscribe = firestore()
      .collection("client-x-provider")
      .where("clientId", "==", userId)
      .onSnapshot((querySnapshot) => {
        var providers = [];
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          data.docId = doc.id;
          providers.push(data);
        });
        setCurrentProviders(providers);
      });

    //TODO: Check it is unsubscribing correctly
    return () => unsubscribe();
  }, []);

  return (
    <FlatList
      data={currentProviders}
      renderItem={CurrentProviderCard}
      keyExtractor={(item) => item.docId}
      extraData={navigation}
    />
  );
}
