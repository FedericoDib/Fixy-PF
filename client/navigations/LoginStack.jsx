import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginDev from '../Components/Login/LoginDev';
import LoginProd from '../Components/Login/LoginProd';

const Stack = createNativeStackNavigator();

const LoginStack = ({ modo }) => {
	return (
		<Stack.Navigator>
			{modo === 'dev' ? (
				<Stack.Screen
					name='LoginDev'
					component={LoginDev}
					options={{ headerShown: false }}
				/>
			) : (
				<Stack.Screen
					name='LoginProd'
					component={LoginProd}
					options={{ headerShown: false }}
				/>
			)}
		</Stack.Navigator>
	);
};

export default LoginStack;
