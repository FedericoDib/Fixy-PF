import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TouchableHighlight,
	Alert,
	ScrollView,
	TextInput,
	Alert,
} from 'react-native';
import IconCalendar from 'react-native-vector-icons/EvilIcons';
import IconPhone from 'react-native-vector-icons/Feather';
import style from './ResumeStyle';
import {
	getBudgetDetail,
	setBudgetAndRequestComplete,
	userDetail,
} from '../../Redux/Action/generalActions';

export default function Resume({ navigation, route }) {
	const user = useSelector((state) => state.generalReducer.user);
	const dispatch = useDispatch();
	const budgetDetail = useSelector(
		(state) => state.generalReducer.budgetDetail
	);
	console.log(budgetDetail, 'budget');
	const item = route.params.item;
	const [code, setCode] = useState(null);

	useEffect(() => {
		dispatch(getBudgetDetail(item.id));
	}, [item]);

	const handlePress = () => {
		if (code == budgetDetail.validationCode) {
			dispatch(setBudgetAndRequestComplete(budgetDetail.id));
			dispatch(userDetail(budgetDetail.clientId, 'client'));
			navigation.navigate('Review');
		} else {
			Alert.alert('El codigo de validacion no es valido');
		}
	};

	return (
		<ScrollView style={style.mainContainer}>
			<View style={style.calendarPhoneContainer}>
				<View style={style.calendarContainer}>
					<Text>{item.date}</Text>
					<IconCalendar
						name='calendar'
						size={30}
						color='#1a57d2'
					></IconCalendar>
				</View>
				<View style={style.phoneContainer}>
					<IconPhone
						onPress={() => {
							Alert.alert('Llamado');
						}}
						name='phone-call'
						size={30}
						color='green'
					></IconPhone>
				</View>
			</View>
			<View style={style.textContainer}>
				<Text>Horario</Text>
				<View style={style.centerField}>
					<Text>{budgetDetail.turn}</Text>
				</View>
			</View>

			<View style={style.textContainer}>
				<Text>Presupuesto Aproximado</Text>
			</View>
			<View style={style.endField}>
				<Text>${budgetDetail.estimatedBudget}</Text>
			</View>
			<View style={style.textContainer}>
				<Text>Descripcion del problema</Text>
				<View style={style.centerField}>
					<Text>{item.description}</Text>
				</View>
			</View>
			<View style={style.textContainer}>
				<Text>Comentarios</Text>
				<View style={style.centerField}>
					<Text>{budgetDetail.description}</Text>
				</View>
			</View>
			{user && user.googleId[0] === 'c' ? (
				<Text>
					Brindale al profesional el siguiente codigo para finalizar la visita:{' '}
					{budgetDetail.validationCode}
				</Text>
			) : (
				<View>
					<Text>Ingresa el codigo de validacion: </Text>
					<TextInput onChangeText={(text) => setCode(text)} />
					<TouchableHighlight
						style={style.button}
						activeOpacity={0.6}
						underlayColor='#F9CE67'
						onPress={() => handlePress()}
					>
						<View style={style.textButton}>
							<Text>Visita Finalizada</Text>
						</View>
					</TouchableHighlight>
				</View>
			)}
		</ScrollView>
	);
}
