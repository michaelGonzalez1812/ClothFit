import React from 'react';
import { BalanceHistory } from './balanceManagement';
import { 
    ClientXProviderContextProvider
} from '../../context';

/*
 * This component needs the doc id to provide de information
 * @param clientXProviderId: docment id
 */
export default function RootNavigator({route, navigation}) {

    var clientXProviderId = route.params.clientXProviderId;

    return (
        <ClientXProviderContextProvider clientXProviderId = { clientXProviderId } >
            <BalanceHistory/>
        </ClientXProviderContextProvider>
    );
}

