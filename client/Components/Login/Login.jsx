import React, { useState, useEffect } from 'react';
import { Text, TouchableHighlight, View, Platform } from 'react-native';
import { styles } from './LoginStyles';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../Redux/Action';
import Logo from '../../assets/FIXy.svg';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

// const Login = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {initAsync()},[]);

//   initAsync= async () => {
//     await GoogleSignIn.initAsync({
//       clientId:"302940809798-hp8en72fg1o8uiinc47q10oc92909f4a.apps.googleusercontent.com"
//     });
//     _syncUserWithStateAsync();
//   }

//   _syncUserWithStateAsync = async () => {
//     const userI = await GoogleSignIn.signInSilentlyAsync();
//     const userData = {
//       id: userI.uid,
//       email: userI.email,
//       name: userI.name
//     };
//     dispatch(googleLogin(userData));
//   }

//   signInAsync = async () => {
//     try {
//       await GoogleSignIn.askForPlayServicesAsync();
//       const { type, user } = await GoogleSignIn.signInAsync();
//       if (type === 'success') {
//         _syncUserWithStateAsync();
//       }
//     } catch ({ message }) {
//       alert('login: Error:' + message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Logo />
//       <View style={styles.wrapper}>
//         <Text style={styles.mainTitle}>¡Bienvenido/a!</Text>
//         <Text style={styles.subTitle}>Ingresa o Registrate para continuar</Text>
//         <TouchableHighlight
//           onPress={signInAsync}
//           activeOpacity={0.6}
//           underlayColor="#ccc"
//           style={styles.button}
//         >
//           <Text style={styles.textbutton}>Continuar con Google</Text>
//         </TouchableHighlight>
//       </View>
//     </View>
//   );
// }

WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({ useProxy: false, path: 'InitialScreen' });

const Login = ({ route, navigation }) => {
	const [accesToken, setAccessToken] = useState(null);
	//const [activeToken, setActiveToken] = useState(null);
	const [isLogged, setIsLogged] = useState(false);
	const [request, response, promptAsync] = isLogged
		? null
		: Google.useAuthRequest({
				expoClientId:
					'302940809798-bb9fvtjipv232sglpnrglc228fp28r1q.apps.googleusercontent.com',
		  });

	const dispatch = useDispatch();

	//CHEQUEA SI HAY DATOS EN EL SECURE STORE
	// useFocusEffect(() => {

	//   getSecureData();
	//   if (activeToken) {
	//     fetchUserInfoSigned(activeToken);
	//   }
	// }, [navigation,activeToken]);

	//TRAE DATOS DEL SECURE STORE DATOS DEL USUARIO
	// async function getSecureData() {
	//   let credentials = await SecureStore.getItemAsync("key");

	//   if (credentials) setActiveToken(credentials);
	// }

	// BUSCA EN API DE GOOGLE CON TOKEN DE UN LOGUEO ANTERIOR
	// function fetchUserInfoSigned(token) {
	//   fetch("https://www.googleapis.com/userinfo/v2/me", {
	//     headers: { Authorization: `Bearer ${token} ` },
	//   })
	//     .then((response) => response.json())

	//     .then((json) => dispatch(googleLogin(json)))
	//     .catch((error) => console.error(error));
	// }

	useEffect(() => {
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
	}, [response, accesToken]);

	// BUSCA EN API GOOGLE INFO DEL USER
	function fetchUserInfo() {
		fetch(`https://www.googleapis.com/userinfo/v2/me`, {
			headers: { Authorization: `Bearer ${accesToken}` },
		})
			.then((response) => response.json())
			.then((json) => dispatch(googleLogin(json)))
			.catch((error) => console.error(error));
		// .finally(() =>
		// 	// navigation.navigate('InicialStack', { screen: 'InitialScreen' })
		// );
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

export default Login;
