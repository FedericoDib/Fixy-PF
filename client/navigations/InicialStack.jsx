import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Components/Login/Login';
import NotRegisteredStack from './NotRegisteredStack';
import ClientStack from './ClientStack';
import ProfessionalStack from './ProfessionalStack';
import InitialScreen from '../Components/InitialScreen/InitialScreen';

const Stack = createNativeStackNavigator();

const InicialStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Group>
				<Stack.Screen
					name='InitialScreen'
					component={InitialScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Login'
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='NotRegisteredStack'
					component={NotRegisteredStack}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='ClientStack'
					component={ClientStack}
					options={{ headerShown: false }}
				/>
        <Stack.Screen
					name='ProfessionalStack'
					component={ProfessionalStack}
					options={{ headerShown: false }}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
};

export default InicialStack;
