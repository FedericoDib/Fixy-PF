import React from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableHighlight,
	Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconStart from 'react-native-vector-icons/Foundation';
import { useDispatch, useSelector } from 'react-redux';
import {
	//getClientId,
	getRequestDetail,
	userDetail,
} from '../../../Redux/Action/generalActions';
import {
	averageReview,
	countAddition,
	requestToProfessional,
} from '../../../Redux/Action/clientActions';
import styles from '../CardListStyle';
// import { professionals, user } from "./Hardcode";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-root-toast';

let rating;
export default function ProfessionalCard({ item, navigation, route }) {
	const dispatch = useDispatch();
	const request = useSelector((state) => state.clientReducer.request);

	const onPress = () => {
		dispatch(userDetail(item.googleId, 'professional'));
		setTimeout(() => {
			navigation.navigate('ProfileDetail', {
				averageReviews: item.averageReviews,
			});
		}, 1000);
	};

	// closeInstantly = () => {
	//     const { dragX, rowTranslation } = this.state;
	//     dragX.setValue(0);
	//     rowTranslation.setValue(0);
	//     this.setState({ rowState: Math.sign(0) });
	// };

	const leftSwipe = (progess, dragX) => {
		return (
			<View style={styles.background}>
				<Text>Enviando solicitud</Text>
			</View>
		);
	};
	// console.log("itemmmmmmmmmmmmmmm",item);
	// console.log("requestttttttttttttttttttttt", request);
	return (
		// <View style={styles.background}>
		<GestureHandlerRootView>
			<Swipeable
				leftThreshold={1000}
				onSwipeableWillClose={(left) => {
					dispatch(
						requestToProfessional({
							googleId: item.googleId,
							idRequest: request.id,
						})
					);
					let toast = Toast.show('Solicitud enviada!', {
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
				}}
				overshootLeft={false}
				renderLeftActions={(progess, dragX) => leftSwipe(progess, dragX)}
			>
				<TouchableHighlight
					activeOpacity={0.9}
					underlayColor='white'
					onPress={() => onPress()}
				>
					<React.Fragment>
						<View style={styles.cardContainer}>
							<View style={styles.imageContainer}>
								<Icon name='user' color='black' size={40} />
								{/* <Image
        source={item.image}
    /> */}
							</View>
							<View style={styles.textContainer}>
								<View style={styles.nameAndReviewContainer}>
									<Text style={styles.textName}>{item.name}</Text>
									<View style={styles.reviewContainer}>
										<IconStart name='star' color='#E1C85A' size={19} />
										<Text style={styles.textName}>{item.averageReviews}</Text>
									</View>
								</View>
								<Text style={styles.textProfession}>{item.profession}</Text>
							</View>
						</View>
					</React.Fragment>
				</TouchableHighlight>
			</Swipeable>
		</GestureHandlerRootView>
		// </View>
	);
}
