
import {
    createStackNavigator,
} from '@react-navigation/stack';
import Register from './views/Authentication/Register';
import Login from './views/Authentication/Login';
import Home from './views/Home';
import Learn from './views/Learn';
import LearnTwo from './views/LearnTwo';
import Levels from './views/Levels';
import MoleculeDetails from './views/MoleculeDetails';
import Quiz from './views/Quiz';
import QuizInt from './views/QuizInt';
import QuizTopics from './views/QuizTopics';
import SplashTwo from './views/SplashTwo';
import Splash from './views/Splash';


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
            <Stack.Screen name="LearnTwo" component={LearnTwo} />
            <Stack.Screen name="Levels" component={Levels} />
            <Stack.Screen name="MoleculeDetails" component={MoleculeDetails} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="SplashTwo" component={SplashTwo} />
            <Stack.Screen name="QuizTopic" component={QuizTopics} />
            <Stack.Screen name="QuizInt" component={QuizInt} />
        </Stack.Navigator>

    )
}

export { AuthStack, RootStack }