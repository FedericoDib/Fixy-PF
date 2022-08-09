import React, { useEffect } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { styles } from './LoginStyles';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../Redux/Action/generalActions';
import * as GoogleSignIn from 'expo-google-sign-in';
import Logo from '../../assets/FIXy.svg';
import GoogleLogo from '../../assets/google.svg';

const LoginProd = () => {
	const dispatch = useDispatch();

	const ios =
		'302940809798-7p2sl1hf6nb258ltkkfp7kb4oqnun290.apps.googleusercontent.com';
	const android =
		'302940809798-hp8en72fg1o8uiinc47q10oc92909f4a.apps.googleusercontent.com';

	// Platform.OS === 'android' ? android : ios

	useEffect(() => {
		initAsync();
	}, []);

	const initAsync = async () => {
		await GoogleSignIn.initAsync({
			clientId:
				'302940809798-hp8en72fg1o8uiinc47q10oc92909f4a.apps.googleusercontent.com',
		});
		_syncUserWithStateAsync();
	};

	const _syncUserWithStateAsync = async () => {
		const userI = await GoogleSignIn.signInSilentlyAsync();
		const userData = {
			id: userI.uid,
			email: userI.email,
			name: userI.displayName,
		};
		dispatch(googleLogin(userData));
		// setLocalUser(userData);
	};

	const signInAsync = async () => {
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
				<TouchableHighlight
					onPress={signInAsync}
					activeOpacity={0.6}
					underlayColor='#ccc'
					style={{ borderRadius: 14 }}
				>
					<View style={styles.button}>
						<GoogleLogo />
						<Text style={styles.textbutton}>Continuar con Google</Text>
					</View>
				</TouchableHighlight>
			</View>
		</View>
	);
};

export default LoginProd;
