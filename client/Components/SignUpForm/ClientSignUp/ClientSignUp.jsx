import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	SafeAreaView,
	View,
	Text,
	Button,
	TextInput,
	Image,
	useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import STYLES from './ClientSignUpStyles';
import COLORS from './Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { createUser } from '../../../Redux/Action';

const falseUser = {
	googleId: 'hfuidshfuisdhfrereuidqqshf',
	expoToken: '989089080',
	firstLogin: true,
	email: 'elami@elami.com',
	name: 'Ami',
	phoneNumber: '4546445',
	perfilPic: 'fsdfsdfdsfsd',
	province: 'dsadasdsad',
	city: 'dsadasdas',
	address: 'dasdsadas',
};

const SignUpScreen = ({ navigation }) => {
	const { width, height } = useWindowDimensions();
	const [image, setImage] = useState(null);
	const dispatch = useDispatch();

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const goToHome = () => {
		navigation.navigate('HomeClient');
	};
	return (
		<SafeAreaView
			style={[
				{ paddingHorizontal: 40, flex: 3, backgroundColor: '#fff' },
				{ width, height },
			]}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ marginTop: 90 }}>
					<Text
						style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.dark }}
					>
						Bienvenido
					</Text>
					<Text style={{ fontSize: 15, fontWeight: 'bold', color: 'green' }}>
						Sapo Verde
					</Text>
					<Text
						style={{
							marginTop: 30,
							fontSize: 19,
							fontWeight: 'bold',
							color: COLORS.light,
						}}
					>
						Registrate para continuar
					</Text>
				</View>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: 20,
					}}
				>
					<Button title='Elige una foto de tu Galeria' onPress={pickImage} />
					{image && (
						<Image
							source={{ uri: image }}
							style={{ width: 200, height: 200, marginTop: 10 }}
						/>
					)}
				</View>
				<View style={{ marginTop: 20 }}>
					<View style={STYLES.inputContainer}>
						<Icon
							name='phone-iphone'
							color={COLORS.light}
							size={20}
							style={STYLES.inputIcon}
						/>
						<TextInput placeholder='Celular' style={STYLES.input} />
					</View>
					<View style={STYLES.inputContainer}>
						<Icon
							name='location-pin'
							color={COLORS.light}
							size={20}
							style={STYLES.inputIcon}
						/>
						<TextInput placeholder='Provincia' style={STYLES.input} />
					</View>
					<View style={STYLES.inputContainer}>
						<Icon
							name='location-pin'
							color={COLORS.light}
							size={20}
							style={STYLES.inputIcon}
						/>
						<TextInput placeholder='Ciudad' style={STYLES.input} />
					</View>
					<View style={STYLES.inputContainer}>
						<Icon
							name='home'
							color={COLORS.light}
							size={20}
							style={STYLES.inputIcon}
						/>
						<TextInput placeholder='Dirección' style={STYLES.input} />
					</View>

					<View style={STYLES.btnPrimary}>
						<TouchableOpacity onPress={() => dispatch(createUser(falseUser))}>
							<Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
								Registrate
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUpScreen;
