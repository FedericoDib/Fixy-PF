import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Components/Login/Login';
import NotRegisteredStack from './NotRegisteredStack';
import ClientStack from './ClientStack';
import ProfessionalStack from './ProfessionalStack';
import InitialScreen from '../Components/InitialScreen/InitialScreen';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const InicialStack = () => {
	const [intialRouteName, setInitialRouteName] = useState('InitialScreen');
	const user = useSelector((state) => state.user);

	// useEffect(() => {
	// 	if (Object.getOwnPropertyNames(user).length === 0) {

	// 		setInitialRouteName('Login');
	// 		return navigation.navigate('Login', {
	// 			screen: 'Login',
	// 			params: { user: user },
	// 		});
	// 	} else {
	// 		if (user && user.googleId[0] === 'c') {

	// 			return setInitialRouteName('ClientStack');
	// 		} else if (user && user.googleId[0] === 'p') {

	// 			return setInitialRouteName('ProfessionalStack');
	// 		} else {

	// 			return setInitialRouteName('NotRegisteredStack');
	// 		}
	// 	}
	// }, [user]);

	return (
		<Stack.Navigator initialRouteName={intialRouteName}>
			<Stack.Group>
				<Stack.Screen
					name='InitialScreen'
					component={InitialScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Group>
			<Stack.Group>
				<Stack.Screen
					name='Login'
					component={Login}
					options={{ headerShown: false }}
				/>
			</Stack.Group>
			<Stack.Group>
				<Stack.Screen
					name='NotRegisteredStack'
					component={NotRegisteredStack}
					options={{ headerShown: false }}
				/>
			</Stack.Group>

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
		</Stack.Navigator>
	);
};

export default InicialStack;
