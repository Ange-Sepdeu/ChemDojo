
import {
    createStackNavigator,
} from '@react-navigation/stack';
import Register from './views/Register';
import Home from './views/Home';


const Stack = createStackNavigator();


function AuthStack() {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
    );
}

function RootStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>

    )
}

export {AuthStack, RootStack}