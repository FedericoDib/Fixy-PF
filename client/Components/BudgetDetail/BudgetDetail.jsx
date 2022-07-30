import React from 'react';
import { useSelector } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TouchableHighlight,
	Alert,
	ScrollView,
} from 'react-native';
import IconCalendar from 'react-native-vector-icons/EvilIcons';
import IconPhone from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import style from './BudgetDetailStyle';
import PrimaryButton from '../General/PrimaryButton';

export default function BudgetDetail({ navigation }) {
	const user = useSelector((state) => state.user);
	return (
		<View style={style.mainContainer}>
			<View style={style.restContainer}>
				<View style={style.textContainer}>
					<Text>Presupuesto Aproximado</Text>
				</View>
				<View style={style.endField}>
					<Text>$ 2.000</Text>
				</View>
				<View style={style.textContainer}>
					<Text>Comentarios</Text>
					<View style={style.centerField}>
						<Text>
							Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
							en demostraciones de tipografías o de borradores de diseño para
							probar el diseño visual antes de insertar el texto final.
						</Text>
					</View>
				</View>
				<View style={style.textContainer}>
					<Text>Precio de la visita</Text>
				</View>
				<View style={style.endField}>
					<Text>$ 1.000</Text>
				</View>
			</View>
			<View style={style.buttonContainer}>
				<View style={{ flex: 1 }}>
					{user.googleId[0] === 'c' && (
						<PrimaryButton
							onPress={() => navigation.navigate('Resume')}
							title='Aceptar'
							trailing={(props) => <Icon2 name='house-damage' {...props} />}
						/>
					)}
				</View>
				<View style={{ flex: 1 }}>
					{user.googleId[0] === 'c' && (
						<PrimaryButton
							onPress={() => navigation.navigate('HomeClient')}
							title='Rechazar'
							trailing={(props) => <Icon2 name='house-damage' {...props} />}
						/>
					)}
				</View>
			</View>
		</View>
	);
}
