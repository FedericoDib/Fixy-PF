import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Components/Login/Login';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Group>
				<Stack.Screen
					name='Login'
					component={Login}
					options={{ headerShown: false }}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
};

export default LoginStack;
