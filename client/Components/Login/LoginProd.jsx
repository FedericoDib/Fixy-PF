import React, { useEffect } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { styles } from './LoginStyles';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../Redux/Action/generalActions';
import Logo from '../../assets/FIXy.svg';
import * as GoogleSignIn from 'expo-google-sign-in';

const LoginProd = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		initAsync();
	}, []);

	initAsync = async () => {
		await GoogleSignIn.initAsync({
			clientId:
				'302940809798-hp8en72fg1o8uiinc47q10oc92909f4a.apps.googleusercontent.com',
		});
		_syncUserWithStateAsync();
	};

	_syncUserWithStateAsync = async () => {
		const userI = await GoogleSignIn.signInSilentlyAsync();
		const userData = {
			id: userI.uid,
			email: userI.email,
			name: userI.name,
		};
		dispatch(googleLogin(userData));
	};

	signInAsync = async () => {
		try {
			await GoogleSignIn.askForPlayServicesAsync();
			const { type, user } = await GoogleSignIn.signInAsync();
			if (type === 'success') {
				_syncUserWithStateAsync();
			}
		} catch ({ message }) {
			alert('login: Error:' + message);
		}
	};

	return (
		<View style={styles.container}>
			<Logo />
			<View style={styles.wrapper}>
				<Text style={styles.mainTitle}>¡Bienvenido/a!</Text>
				<Text style={styles.subTitle}>Ingresa o Registrate para continuar</Text>
				<TouchableHighlight
					onPress={signInAsync}
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

export default LoginProd;
