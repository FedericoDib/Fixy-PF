import React from 'react';
import { Pressable, Text, TouchableHighlight, View } from 'react-native';
import { styles } from './LoginStyles';

const Login = () => {
	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.mainTitle}>¡Bienvenido/a!</Text>
				<Text style={styles.subTitle}>Ingresa o Registrate para continuar</Text>
				<TouchableHighlight
					onPress={() => alert('hola')}
					activeOpacity={0.6}
					underlayColor='#ccc'
					style={styles.button}
				>
					<Text>Continuar con Google</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
};

export default Login;
