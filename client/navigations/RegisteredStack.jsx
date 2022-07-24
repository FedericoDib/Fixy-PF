import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home_Client from '../Components/Home_Client/Home_Client';

const Stack = createNativeStackNavigator();

const RegisteredStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Group>
				<Stack.Screen
					name='HomeClient'
					component={Home_Client}
					options={{ headerShown: false }}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
};

export default RegisteredStack;
