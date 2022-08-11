import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../General/PrimaryButton';
import styles from './BudgetFormStyles';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { createBudget } from '../../Redux/Action/professionalActions';
import Toast from 'react-native-root-toast';
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/AntDesign";
import COLORS from "../SignUpForm/ClientSignUp/Colors";



const BudgetForm = ({ navigation }) => {
	const dispatch = useDispatch();
	const professional = useSelector((state) => state.generalReducer.user);
	const request = useSelector((state) => state.generalReducer.requestDetail);
	const [turn, setTurn] = useState(professional.availableTimes[0]);
	const [minBudget, setMinBudget] = useState(0);
	const [maxBudget, setMaxBudget] = useState(0);
	const [input, setInput] = useState({
		professionalId: professional.googleId,
	});

	const handleTurns = () => {
		const turns = [];
		if (professional.availableTimes.length > 0) {
			for (
				let i = parseInt(professional.availableTimes[0]);
				i <= parseInt(professional.availableTimes[1]);
				i++
			) {
				if (i < professional.availableTimes[1]) {
					turns.push(`${i}:00`);
					turns.push(`${i}:30`);
				} else {
					turns.push(`${i}:00`);
				}
			}
		}
		return turns;
	};

	const handleSubmit = () => {
		
	}

	return (
		<ScrollView
			style={styles.mainContainer}
			showsVerticalScrollIndicator={false}
			bounces={false}
			contentContainerStyle={{ alignItems: "center" }}
		>
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Pressable
						onPress={() => navigation.goBack()}
						style={{ paddingVertical: 5, marginBottom: 10}}
						>
						<Ionicons
							name="arrow-back"
							size={24}
							color={theme.colors.threePalet.primary}
						/>
					</Pressable>
					<Text style={styles.mainTitle}>PRESUPUESTO</Text>
				</View>
				<Text style={styles.label}>Precio de la visita:</Text>
				<View style={styles.inputContainer}>
					<Icon
						name="attach-money"
						color={COLORS.light}
						size={30}
						style={styles.inputIcon}
					/>
					<TextInput
						placeholder="Precio..."
						onChangeText={(text) => setInput({ ...input, price: text })}
						style={styles.input}
					/>
				</View>
				<View>
					<Text style={styles.label}>Comentarios:</Text>
					<View style={{ marginTop: 15, alignItems: "center", width: "100%" }}>
						<TextInput
							multiline
							numberOfLines={5}
							style={{
							margin: 12,
							borderWidth: 2,
							borderRadius: 5,
							width: "100%",
							height: 250,
							borderColor: theme.colors.threePalet.secondary,
							padding: 10,
							textAlignVertical: "top",
							}}
							onChangeText={(text) => setInput({ ...input, description: text })}
							placeholder="Agregue comentarios..."
						/>
					</View>
				</View>
				<View>
					<Text style={styles.label}>Presupuesto total estimado:</Text>				
					<View
						style={[
							styles.inputContainer,
							{ flexDirection: 'row', justifyContent: 'space-evenly' },
						]}
					>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-evenly',
								alignItems: 'center',
							}}
						>
							<Text style={styles.text}>Min</Text>
							<Icon
								name="attach-money"
								color={COLORS.light}
								size={20}
								style={styles.inputIcon}
							/>
							<TextInput
								placeholder='Precio'
								style={styles.minmaxInput}
								onChangeText={(text) => setMinBudget(text)}
							/>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-evenly',
								alignItems: 'center',
							}}
						>
							<Text style={styles.text}>Max</Text>
							<Icon
								name="attach-money"
								color={COLORS.light}
								size={20}
								style={styles.inputIcon}
							/>
							<TextInput
								placeholder='Precio'
								style={styles.minmaxInput}
								onChangeText={(text) => setMaxBudget(text)}
							/>
						</View>
					</View>
					<Text style={{marginBottom: 20}}>
						El presupuesto estimado incluye los posibles costos de reparacion.
						Es netamente informativo
					</Text>
					<View>
						<Text style={styles.label}>Horario de visita:</Text>
						<Picker
							selectedValue={turn}
							onValueChange={(value, index) => setTurn(value)}
							mode='dropdown'
							style={{ borderRadius: 5 }}
						>
							{professional &&
								handleTurns().map((item) => (
									<Picker.Item
										label={item}
										value={item}
										key={`turn-${item}`}
									/>
								))}
						</Picker>
					</View>
				</View>
				<View style={{flex: 1,width: "100%", justifyContent: "center", alignItems: "center", marginVertical: 10}}>
					<PrimaryButton
						title={input.price && input.description && minBudget && maxBudget ? 'Enviar presupuesto' : 'Aguardando datos'}
						disabled={input.price && input.description && minBudget && maxBudget ? false : true}
						onPress={() => {
							dispatch(
								createBudget({
									clientId: request.clientId,
									requestId: request.id,
									estimatedBudget: `${minBudget} - ${maxBudget}`,
									turn: turn,
									...input,
								})
								);
								let toast = Toast.show('Presupuesto enviado!', {
									duration: Toast.durations.LONG,
								position: Toast.positions.BOTTOM,
								shadow: true,
								animation: true,
								hideOnPress: true,
								delay: 0,
								backgroundColor: 'green',
							});
							
							setTimeout(function () {
								Toast.hide(toast);
							}, 1000);
							navigation.popToTop();
						}}/>
						
				</View>
			</View>
		</ScrollView>
	);
};

export default BudgetForm;
