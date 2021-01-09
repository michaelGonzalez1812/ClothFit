import React from 'react';
import { BottomNavigation , Text } from 'react-native-paper';
import { RootNavigator as BalanceManagementRootNavigatior } from './balanceManagement';

const RecentsRoute = () => <Text>Recents</Text>;

export default function RootNavigator({}) {

    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
      { key: 'balance', title: 'Balance', icon: 'album' },
      { key: 'catalog', title: 'Catalogo', icon: 'album' },
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      balance: BalanceManagementRootNavigatior,
      catalog: RecentsRoute
    });
  
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    );
}

