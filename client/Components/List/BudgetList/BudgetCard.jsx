import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../CardListStyle';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { getBudgetDetail } from '../../../Redux/Action/generalActions';

const BudgetCard = ({ item, navigation }) => {
	const dispatch = useDispatch();
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			underlayColor='white'
			onPress={() => {
				dispatch(getBudgetDetail(item.id));
				navigation.navigate('BudgetDetail', { button: false });
			}}
		>
			<View style={styles.cardContainer}>
				<View style={styles.imageContainer}>
					<Icon name='user' color='black' size={40} />
				</View>
				<View style={styles.textContainer}>
					<View style={styles.nameAndReviewContainer}>
						<Text style={styles.textName}>{item.description}</Text>
					</View>
					<Text style={styles.textProfession}>{item.turn}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default BudgetCard;
