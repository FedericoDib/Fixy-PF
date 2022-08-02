import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const InitialScreen = ({ navigation }) => {
	const user = useSelector((state) => state.user);
	const [activeToken, setActiveToken] = useState(null);
	const dispatch = useDispatch();

	//CHEQUEA SI HAY DATOS EN EL SECURE STORE
	useEffect(() => {
		getSecureData();
		if (activeToken) {
			fetchUserInfoSigned(activeToken);
		}
	}, [navigation, activeToken]);

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

	useEffect(() => {
		console.log(user);
		if (Object.getOwnPropertyNames(user).length === 0) {
			console.log('Login');
			return navigation.navigate('Login', {
				screen: 'Login',
				params: { user: user },
			});
		} else {
			if (user && user.googleId[0] === 'c') {
				console.log('Client');
				return navigation.navigate('ClientStack', {
					screen: 'HomeClient',
					params: { user: user },
				});
			} else if (user && user.googleId[0] === 'p') {
				console.log('Professional');
				return navigation.navigate('ProfessionalStack', {
					screen: 'HomeClient',
					params: { user: user },
				});
			} else {
				console.log('NR');
				return navigation.navigate('NotRegisteredStack', {
					screen: 'OnBoarding',
					params: { user: user },
				});
			}
		}
	}, [navigation, user]);

	return (
		<View>
			<Text>InicialScreen</Text>
		</View>
	);
};

export default InitialScreen;
