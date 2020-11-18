import React from 'react'
import { Text, View } from 'react-native'

export default function History({ route, navigation}) {
    
    //TODO: Logic to know if info is commig or I am 
    //signed as a client account
    var client = route.params.item;
    
    return (
        <View>
            <Text>{ client.balance }</Text>
        </View>
    )
}
