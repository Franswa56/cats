import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Pages/HomeScreen'; // Ton écran principal
import HistoryScreen from '../Pages/HistoryScreen'; // Écran pour afficher les identifications

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Insect Identifier' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Historique des identifications' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;