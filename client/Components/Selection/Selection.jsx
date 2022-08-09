import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import style from './SelectionStyles';

export default function Selection({ navigation }) {
	const goToForm = (user) => {
		user === 'client'
			? navigation.navigate('ClientSignUp')
			: navigation.navigate('ProfessionalSignUp');
	};
	return (
		<View style={style.mainContainer}>
			<View style={style.titleContainer}>
				<Text style={style.title}>Seleccione cómo</Text>
				<Text style={style.title}>desea registrarse</Text>
			</View>
			<View style={style.buttonsContainer}>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<TouchableOpacity
						style={style.button}
						onPress={() => goToForm('client')}
					>
						<Image
							source={require('../../assets/clientSelect.png')}
							style={{
								width: 180,
								height: 180,
								margin: 10,
								borderRadius: 200,
							}}
						/>
					</TouchableOpacity>
					<Text style={style.text}>Cliente</Text>
				</View>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<TouchableOpacity
						style={style.button}
						onPress={() => goToForm('professional')}
					>
						<Image
							style={{ width: 180, height: 180, margin: 10, borderRadius: 200 }}
							source={require('../../assets/profesionalSelect.png')}
						/>
					</TouchableOpacity>
					<Text style={style.text}>Profesional</Text>
				</View>
			</View>
		</View>
	);
}
