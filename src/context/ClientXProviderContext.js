import React, {createContext, useState, useReducer} from 'react';
import { firebase } from '../firebase/config';

const defaultValue = {
    unsubscribe: null, //unsubcribe firestore listener
};

const ClientXProviderContext = createContext(defaultValue);  

export default function ClientXProviderContextProvider({children}) {

    const [clientXProvider, setClientXProvider] = useState();

    const updateClientXProvider = (state, clientXProviderDocId) => {
        setClientXProvider(undefined);

        if(state.unsubscribe) state.unsubscribe();
    
        state.unsubscribe = firebase.firestore().collection("client-x-provider")
        .doc(clientXProviderDocId)
        .onSnapshot(function(doc) {
            var data = doc.data();
            data.docId = clientXProviderDocId;
            setClientXProvider(data);
        },  function(error) {
            console.error(error);
        });
        
        return state;
    };
    
    const reducer = (state, action) => {
        //logica para obtener datos de firebase
        switch (action.type) {
            case "UPDATE": return updateClientXProvider(state, action.clientXProviderDocId);
            default: return state;
        }
    };
    
    const [clientXProviderState, dispatchClientXProvider] = useReducer(reducer, defaultValue);

    return (
        <ClientXProviderContext.Provider value= {{clientXProvider, dispatchClientXProvider}}>
            {children}
        </ClientXProviderContext.Provider>
    );
}

export {ClientXProviderContext, defaultValue};