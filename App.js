import React, { useContext } from 'react';
import { AuthProvider } from './src/providers/AuthProvider';
import { AuthStack, RootStack } from './src/routes';

import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './src/providers/AuthProvider';
import { Text, View } from 'react-native';


export default function App() {
  const { user } = useContext(AuthContext);
  console.log("Fasdf")
  return (
    <View><Text>Hello</Text></View>
  );

}