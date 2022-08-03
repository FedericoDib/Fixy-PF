import React, { useState, useEffect, useCallback } from 'react';
import { Text, TouchableHighlight, View, Platform } from 'react-native';
import { styles } from './LoginStyles';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../../Redux/Action/generalActions';
import Logo from '../../assets/FIXy.svg';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({
	useProxy: false,
	path: 'InitialScreen',
});

const LoginDev = () => {

	const [accesToken, setAccessToken] = useState(null);

	const [isLogged, setIsLogged] = useState(false);
	const [request, response, promptAsync] = isLogged
		? null
		: Google.useAuthRequest({
				expoClientId:
					'302940809798-bb9fvtjipv232sglpnrglc228fp28r1q.apps.googleusercontent.com',
		  });

	const dispatch = useDispatch();

	useEffect(() => {
		//CHEQUEA SI EL LOGUEO EN GOOGLE FUE CORRECTO, GUARDA LOS DATOS EN SECURE STORE Y PIDE DATOS DEL USUARIO
		if (response?.type === 'success') {
			const auth = response.params.access_token;
			const storageValue = JSON.stringify(auth);

			if (Platform.OS !== 'web') {
        console.log('ESTOY SETEANDOOOOOOOO')
				SecureStore.setItemAsync('key', storageValue);
			}
			const { authentication } = response;
			setAccessToken(authentication.accessToken);
			accesToken && fetchUserInfo();
		}
	}, [response, accesToken]);

	// BUSCA EN API GOOGLE INFO DEL USER
	function fetchUserInfo() {
		fetch(`https://www.googleapis.com/userinfo/v2/me`, {
			headers: { Authorization: `Bearer ${accesToken}` },
		})
			.then((response) => response.json())
			.then((json) => dispatch(googleLogin(json)))
			.catch((error) => console.error(error))
	}

	return (
		<View style={styles.container}>
			<Logo />
			<View style={styles.wrapper}>
				<Text style={styles.mainTitle}>¡Bienvenido/a!</Text>
				<Text style={styles.subTitle}>Ingresa o Registrate para continuar</Text>
				<TouchableHighlight
					onPress={() => {
						promptAsync({ redirectUri });
					}}
					activeOpacity={0.6}
					underlayColor='#ccc'
					style={styles.button}
				>
					<Text style={styles.textbutton}>Continuar con Google</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
};

export default LoginDev;
