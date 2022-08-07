import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TouchableHighlight,
	Alert,
	ScrollView,
	TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import style from './ReviewStyle';
import Icon from 'react-native-vector-icons/Entypo';
import IconStart from 'react-native-vector-icons/Foundation';
import { useSelector, useDispatch } from 'react-redux';
import {
	averageReview,
	createReviewProfessional,
} from '../../Redux/Action/clientActions';
import { createReviewClient } from '../../Redux/Action/professionalActions';
import { deleteReviewPending } from '../../Redux/Action/generalActions';

const professionals = {
	googleId: '3',
	expoToken: '1',
	isRegistered: null,
	firstLogin: true,
	email: 'jose@fixy.com',
	name: 'Maximiliano Silva',
	phoneNumber: '1142451823',
	perfilPic: 'unafoto',
	province: 'cordoba',
	city: 'berazategui',
	address: 'Guemes 1234',
	reviews: [
		{
			rating: 2,
		},
		{
			rating: 1,
		},
	],
};

const client = {
	googleId: '3',
	expoToken: '1',
	isRegistered: null,
	firstLogin: true,
	email: 'jose@fixy.com',
	name: 'Javier Martinez',
	phoneNumber: '1142451823',
	perfilPic: 'unafoto',
	province: 'cordoba',
	city: 'berazategui',
	address: 'Calle 123',
	reviews: [
		{
			rating: 5,
		},
		{
			rating: 4,
		},
	],
};
let averageRating;

export default function Review({ navigation }) {
	const [comment, setComment] = useState('');
	const [rating, setRating] = useState(0);

	const [stars, setStars] = useState({
		one: false,
		two: false,
		three: false,
		four: false,
		five: false,
	});

	const dispatch = useDispatch();
	const user = useSelector((state) => state.generalReducer.user);
	const otherUser = useSelector((state) => state.generalReducer.userDetail);

	console.log(user, otherUser, 'USERRRRSSS');
	//const user = { googleId: "c165158165" };

	if (otherUser.reviews && otherUser.reviews.length) {
		averageRating = otherUser.reviews.map((e) => e.rating);
		averageRating = (
			averageRating.reduce(
				(accumulator, currentValue) => accumulator + currentValue
			) / averageRating.length
		).toFixed(1);
	} else {
		averageRating = 3;
	}

	console.log(otherUser);

	function selectStars(number) {
		setRating(number);
		if (number > 0) {
			setStars({
				...stars,
				one: true,
				two: false,
				three: false,
				four: false,
				five: false,
			});
		}
		if (number > 1) {
			setStars({
				...stars,
				one: true,
				two: true,
				three: false,
				four: false,
				five: false,
			});
		}
		if (number > 2) {
			setStars({
				...stars,
				one: true,
				two: true,
				three: true,
				four: false,
				five: false,
			});
		}
		if (number > 3) {
			setStars({
				...stars,
				one: true,
				two: true,
				three: true,
				four: true,
				five: false,
			});
		}
		if (number > 4) {
			setStars({
				...stars,
				one: true,
				two: true,
				three: true,
				four: true,
				five: true,
			});
		}
	}

	function sendReview() {
		if (user.googleId[0] === 'c') {
			dispatch(
				createReviewProfessional({
					rating: rating,
					comment: comment,
					nameClient: user.name,
					idProfessional: otherUser.googleId,
					idClient: user.googleId,
				})
			);
			dispatch(deleteReviewPending(user.googleId));
			navigation.navigate('HomeClient');
		} else {
			dispatch(
				createReviewClient({
					rating: rating,
					comment: comment,
					nameProfessional: user.name,
					idProfessional: user.googleId,
					idClient: otherUser.googleId,
				})
			);
			dispatch(deleteReviewPending(user.googleId));
			navigation.navigate('HomeProfessional');
		}
	}

	return (
		<ScrollView style={style.mainContainer}>
			<TouchableHighlight
				activeOpacity={0.9}
				underlayColor='white'
				onPress={() =>
					navigation.navigate('ProfileDetail', {
						averageReviews: item.averageReviews,
					})
				}
			>
				<View style={style.cardContainer}>
					<View style={style.imageContainer}>
						<Icon name='user' color='black' size={40} />
						{/* <Image
        source={item.image}
    /> */}
					</View>
					<View style={style.textCardContainer}>
						<View style={style.nameAndReviewContainer}>
							<Text style={style.textName}>{otherUser.name}</Text>
							<View style={style.reviewContainer}>
								<IconStart name='star' color='#E1C85A' size={19} />
								<Text style={style.textName}>{averageRating}</Text>
							</View>
						</View>
						<Text style={style.textProfession}>{otherUser.address}</Text>
					</View>
				</View>
			</TouchableHighlight>
			<View style={style.textContainer}>
				<Text>Cantidad de estrellas</Text>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<TouchableHighlight
					activeOpacity={0.4}
					underlayColor='#FFF5E7'
					onPress={() => selectStars(1)}
				>
					<IconStart
						style={stars.one ? style.starOn : style.starOff}
						name='star'
						size={19}
					/>
				</TouchableHighlight>
				<TouchableHighlight
					activeOpacity={0.4}
					underlayColor='#FFF5E7'
					onPress={() => selectStars(2)}
				>
					<IconStart
						style={stars.two ? style.starOn : style.starOff}
						name='star'
						size={19}
					/>
				</TouchableHighlight>
				<TouchableHighlight
					activeOpacity={0.4}
					underlayColor='#FFF5E7'
					onPress={() => selectStars(3)}
				>
					<IconStart
						style={stars.three ? style.starOn : style.starOff}
						name='star'
						size={19}
					/>
				</TouchableHighlight>
				<TouchableHighlight
					activeOpacity={0.4}
					underlayColor='#FFF5E7'
					onPress={() => selectStars(4)}
				>
					<IconStart
						style={stars.four ? style.starOn : style.starOff}
						name='star'
						size={19}
					/>
				</TouchableHighlight>
				<TouchableHighlight
					activeOpacity={0.4}
					underlayColor='#FFF5E7'
					onPress={() => selectStars(5)}
				>
					<IconStart
						style={stars.five ? style.starOn : style.starOff}
						name='star'
						size={19}
					/>
				</TouchableHighlight>
			</View>
			<View style={style.textContainer}>
				<Text>Comentario</Text>
				<View style={style.centerField}>
					<TextInput
						onChangeText={(text) => setComment(text)}
						placeholder='Escriba su comentario'
						multiline
						textAlignVertical='top'
						numberOfLines={5}
					></TextInput>
				</View>
			</View>
			<TouchableHighlight
				style={style.button}
				activeOpacity={0.6}
				underlayColor='#F9CE67'
				onPress={() => {
					sendReview();
				}}
			>
				<View style={style.textButton}>
					<Text>Enviar review</Text>
				</View>
			</TouchableHighlight>
		</ScrollView>
	);
}
