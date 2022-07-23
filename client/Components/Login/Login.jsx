import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { fetchUserInfoAsync } from 'expo-auth-session';
import { Text, TouchableHighlight, View, Platform } from 'react-native';
import { styles } from './LoginStyles';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../Redux/Action';
// "client_id":"302940809798-bb9fvtjipv232sglpnrglc228fp28r1q.apps.googleusercontent.com"
// "client_secret":"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"

const MY_SECURE_AUTH_STATE_KEY = '1234';

WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({ useProxy: false });

const Login = () => {
	const [accesToken, setAccessToken] = useState(null);
	const [user, setUser] = useState(null);
	const [activeToken, setActiveToken] = useState(null);
	const [isLogged, setIsLogged] = useState(false);
	const [request, response, promptAsync] = isLogged
		? null
		: Google.useAuthRequest({
				expoClientId:
					'302940809798-bb9fvtjipv232sglpnrglc228fp28r1q.apps.googleusercontent.com',
		  });

	const dispatch = useDispatch();

	console.log(user);
	useEffect(() => {
		if (user) {
			dispatch(googleLogin(user.id));
		}
	}, [user]);

	useEffect(() => {
		//CHEQUE SI HAY DATOS EN EL SECURE STORE
		// let secureData = getSecureData().then(token);
		// // getSecureData()
		// // .then(token)
		// console.log('U',secureData);
		// if (res){
		// 	setAccessToken(res);
		// 	accesToken && fetchUserInfo();
		// }

		if (activeToken) {
		}
		//CHEQUEA SI EL LOGUEO EN GOOGLE FUE CORRECTO, GUARDA LOS DATOS EN SECURE STORE Y PIDE DATOS DEL USUARIO
		if (response?.type === 'success') {
			const auth = response.params.access_token;
			const storageValue = JSON.stringify(auth);

			if (Platform.OS !== 'web') {
				SecureStore.setItemAsync('key', storageValue);
			}
			const { authentication } = response;
			setAccessToken(authentication.accessToken);
			accesToken && fetchUserInfo();
		}
		// getValue()
		// .then(res => {console.log('AUTH DATA',res)});
	}, [response, accesToken]);

	// BUSCA EN API GOOGLE INFO DEL USER
	function fetchUserInfo() {
		fetch(`https://www.googleapis.com/userinfo/v2/me`, {
			headers: { Authorization: `Bearer ${accesToken}` },
		})
			.then((response) => response.json())
			.then((json) => setUser(json))
			.catch((error) => console.error(error));
	}

	//TRAE DATOS DEL SECURE STORE DATOS DEL USUARIO
	async function getSecureData() {
		let credentials = await SecureStore.getItemAsync('key');

		if (credentials) setActiveToken(credentials);
		// if(credentials){
		// 	// console.log('json',credentials)
		// 		return credentials;
		// }
		// else {
		// 	return null;
		// }
	}

	// LOGOUT
	const handleLogOut = () => {
		setUser(null);
		SecureStore.deleteItemAsync('key');
	};

	// function handleLogOut(){

	// }

	return (
		<View style={styles.container}>
			{user === null ? (
				<View style={styles.wrapper}>
					<Text style={styles.mainTitle}>¡Bienvenido/a!</Text>
					<Text style={styles.subTitle}>
						Ingresa o Registrate para continuar
					</Text>
					<TouchableHighlight
						onPress={() => promptAsync({ redirectUri })}
						activeOpacity={0.6}
						underlayColor='#ccc'
						style={styles.button}
					>
						<Text>Continuar con Google</Text>
					</TouchableHighlight>
				</View>
			) : (
				<View>
					<Text>Lo lograste!</Text>
					<TouchableHighlight
						onPress={() => {
							handleLogOut();
						}}
					>
						<Text>LOGOUT</Text>
					</TouchableHighlight>
				</View>
			)}
		</View>
	);
};

export default Login;
