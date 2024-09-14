<<<<<<< HEAD
=======
// AppNavigator.js
>>>>>>> 4c420f03ab06f5f19863395dd060b7acbea6e9d9
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Pages/HomeScreen'; // Ton écran principal
<<<<<<< HEAD
import HistoryScreen from '../Pages/HistoryScreen'; // Écran pour afficher les identifications
=======
import History from '../Pages/History'; // Écran pour afficher les identifications
>>>>>>> 4c420f03ab06f5f19863395dd060b7acbea6e9d9

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Insect Identifier' }} />
<<<<<<< HEAD
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Historique des identifications' }} />
=======
        <Stack.Screen name="History" component={IdentificationHistoryScreen} options={{ title: 'Historique des identifications' }} />
>>>>>>> 4c420f03ab06f5f19863395dd060b7acbea6e9d9
      </Stack.Navigator>
    </NavigationContainer>
  );
};

<<<<<<< HEAD
export default AppNavigator;
=======
export default AppNavigator;
>>>>>>> 4c420f03ab06f5f19863395dd060b7acbea6e9d9
