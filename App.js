import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './src/views/Splash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './src/views/Register'
import Login from "./src/views/Login"
import Learn from "./src/views/Learn"
import MoleculeDetails from './src/views/MoleculeDetails';
import Home from './src/views/Home';
import QuizInt from './src/views/QuizInt';
import QuizTopics from './src/views/QuizTopics';
import Levels from './src/views/Levels';
import Quiz from './src/views/Quiz';
import LearnTwo from './src/views/LearnTwo';
import SplashTwo from './src/views/SplashTwo';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Register />
    );// <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name='Learn' component={Learn} options={{headerShown: false}} />
        <Stack.Screen name='Splash' component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}} />
        {/* <Stack.Screen name='MoleculeDetails' component={MoleculeDetails} options={{headerShown: false}} /> */}
      // </Stack.Navigator> */}
      {/* <Splash /> */}
      {/* <Login /> */}
      {/* <Learn /> */}
      {/* <Register /> */}
      
      // </NavigationContainer>
    
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
