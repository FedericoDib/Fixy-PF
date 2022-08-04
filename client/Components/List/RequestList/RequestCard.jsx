import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../CardListStyle';
import { useSelector } from 'react-redux';
// import { useDispatch } from "react-redux";
// import Icon from "react-native-vector-icons/Entypo";
// import { getBudgetDetail } from "../../Redux/Action";

const RequestCard = ({ item, navigation }) => {
	const user = useSelector((state) => state.generalReducer.user);
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			underlayColor='white'
			onPress={() => {
				if (user && user.googleId[0] === 'c') {
					navigation.navigate('RequestDetail', {
						item: item,
						buttons: 'client',
					});
				} else if (user && user.googleId[0] === 'p') {
					navigation.navigate('RequestDetail', { item: item, buttons: 'prof' });
				}
			}}
		>
			<View style={styles.cardContainer}>
				<View style={styles.textContainer}>
					<View style={styles.nameAndReviewContainer}>
						<Text style={styles.textName}>{item.affair}</Text>
					</View>
					<Text style={styles.textProfession}>{item.date}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default RequestCard;
