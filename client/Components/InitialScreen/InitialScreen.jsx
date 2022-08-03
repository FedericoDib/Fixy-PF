import { View, Text } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../../Redux/Action/generalActions';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

const InitialScreen = ({ navigation }) => {
	const user = useSelector((state) => state.generalReducer.user);
	const [activeToken, setActiveToken] = useState(null);
	const dispatch = useDispatch();

	//CHEQUEA SI HAY DATOS EN EL SECURE STORE
	useFocusEffect(
		useCallback(() => {
			getSecureData();
			if (activeToken) {
				fetchUserInfoSigned(activeToken);
			}
			return () => console.log('desmontado');
		}, [user, activeToken])
	);

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

	useFocusEffect(
		useCallback(() => {
			console.log(user);
			if (user && Object.getOwnPropertyNames(user).length === 0) {
				return navigation.navigate('Login', {
					screen: 'Login',
					params: { user: user },
				});
			} else {
				if (user && user.googleId[0] === 'c') {
					return navigation.navigate('ClientStack', {
						screen: 'HomeClient',
						params: { user: user },
					});
				} else if (user && user.googleId[0] === 'p') {
					return navigation.navigate('ProfessionalStack', {
						screen: 'HomeClient',
						params: { user: user },
					});
				} else {
					return navigation.navigate('NotRegisteredStack', {
						screen: 'OnBoarding',
						params: { user: user },
					});
				}
			}
		}, [user])
	);

	return (
		<View>
			<Text>InitialScreen</Text>
		</View>
	);
};

export default InitialScreen;
