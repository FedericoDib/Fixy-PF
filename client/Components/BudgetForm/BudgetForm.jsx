import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../General/PrimaryButton';
import styles from './BudgetFormStyles';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

const BudgetForm = () => {
	const professional = useSelector((state) => state.user);
	const [turn, setTurn] = useState(professional.availableTimes[0]);
	const [minBudget, setMinBudget] = useState(0);
	const [maxBudget, setMaxBudget] = useState(0);
	const [input, setInput] = useState({});

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

	return (
		<SafeAreaView style={styles.mainContainer}>
			<Text style={styles.title}>Presupuesto</Text>
			<View style={styles.wrapper}>
				<View style={[styles.horizontalWrapper, styles.inputContainer]}>
					<Text style={styles.text}>Precio de la visita:</Text>
					<TextInput
						placeholder='Precio'
						style={[styles.input, { width: '40%' }]}
						onChangeText={(text) => setInput({ ...input, price: text })}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={[styles.text, { marginBottom: 10 }]}>Comentarios</Text>
					<TextInput
						multiline
						numberOfLines={20}
						placeholder='Agruegue comentarios ...'
						style={styles.input}
						onChangeText={(text) => setInput({ ...input, description: text })}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.text}>Presupuesto total estimado:</Text>
					<Text>
						El presupuesto estimado incluye los posibles costos de reparacion.
						Es netamente informativo
					</Text>
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
							<TextInput
								placeholder='Precio'
								style={styles.input}
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
							<TextInput
								placeholder='Precio'
								style={styles.input}
								onChangeText={(text) => setMaxBudget(text)}
							/>
						</View>
					</View>
					<View>
						<Text style={styles.text}>Horario de visita</Text>
						<Picker
							selectedValue={turn}
							onValueChange={(value, index) => setTurn(value)}
							mode='dropdown'
							style={{ borderRadius: 5 }}
						>
							{professional &&
								handleTurns().map((item) => (
									<Picker.Item label={item} value={item} key={`turn-${item}`} />
								))}
						</Picker>
					</View>
				</View>
			</View>
			<PrimaryButton title='Enviar presupuesto' onPress={()=>console.log({estimatedBudget: `${minBudget} - ${maxBudget}`, turn:turn, ...input})} />
		</SafeAreaView>
	);
};

export default BudgetForm;
