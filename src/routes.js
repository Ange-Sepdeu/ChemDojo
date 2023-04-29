
import {
    createStackNavigator,
} from '@react-navigation/stack';
import Register from './views/Authentication/Register';
import Login from './views/Authentication/Login';
import Home from './views/Home';
import Learn from './views/Learn';


const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false,
}

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
}

function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Learn" component={Learn} />
        </Stack.Navigator>

    )
}

export { AuthStack, RootStack }