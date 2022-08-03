import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Components/Login/LoginDev';
import NotRegisteredStack from './NotRegisteredStack';
import ClientStack from './ClientStack';
import ProfessionalStack from './ProfessionalStack';
import InitialScreen from '../Components/InitialScreen/InitialScreen';
import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { googleLogin } from '../Redux/Action/generalActions';


const Stack = createNativeStackNavigator();

const InitialStack = () => {
	const user = useSelector((state) => state.generalReducer.user);
	const [activeToken, setActiveToken] = useState(null);
	const dispatch = useDispatch();
  
	//CHEQUEA SI HAY DATOS EN EL SECURE STORE
	useEffect(() => {
			if (__DEV__) {
				getSecureData();
				if (activeToken) {
					fetchUserInfoSigned(activeToken);
				}
			}
			return () => console.log('desmontado');
		}, [activeToken])

	//TRAE DATOS DEL SECURE STORE DATOS DEL USUARIO
	async function getSecureData() {
		let credentials = await SecureStore.getItemAsync('key');
		if (credentials) setActiveToken(credentials);
	}

	// BUSCA EN API DE GOOGLE CON TOKEN DE UN LOGUEO ANTERIOR
	function fetchUserInfoSigned(token) {
		fetch('https://www.googleapis.com/userinfo/v2/me', {
			headers: { Authorization: `Bearer ${token} ` },
		})
			.then((response) => response.json())
			.then((json) => dispatch(googleLogin(json)))
			.catch((error) => console.error(error));
	}

	const getStack = () => {
		if (Object.getOwnPropertyNames(user).length === 0) {
			return (
				<Stack.Screen
					name='Login'
					component={Login}
					options={{ headerShown: false }}
					initialParams={{ modo: __DEV__ ? 'dev' : 'prod' }}
				/>
			);
		} else {
			if (user.isRegistered && user.googleId[0] === 'c') {
				return (
					<Stack.Screen
						name='ClientStack'
						component={ClientStack}
						options={{ headerShown: false }}
					/>
				);
			} else if (user.isRegistered && user.googleId[0] === 'p') {
				return (
					<Stack.Screen
						name='ProfessionalStack'
						component={ProfessionalStack}
						options={{ headerShown: false }}
					/>
				);
			} else {
				return (
					<Stack.Screen
						name='NotRegisteredStack'
						component={NotRegisteredStack}
						options={{ headerShown: false }}
					/>
				);
			}
		}
	};

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

	return <Stack.Navigator>{getStack()}</Stack.Navigator>;
};

export default InitialStack;
