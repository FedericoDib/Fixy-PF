import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';
//import AppLoading from "expo-app-loading";
import {
	Flex,
	Spacer,
	Box,
	Text,
	IconButton,
	Wrap,
} from '@react-native-material/core';

import { Image } from 'react-native';
// import {
//   Exo2_100Thin,
//   Exo2_100Thin_Italic,
//   Exo2_200ExtraLight,
//   Exo2_200ExtraLight_Italic,
//   Exo2_300Light,
//   Exo2_300Light_Italic,
//   Exo2_400Regular,
//   Exo2_400Regular_Italic,
//   Exo2_500Medium,
//   Exo2_500Medium_Italic,
//   Exo2_600SemiBold,
//   Exo2_600SemiBold_Italic,
//   Exo2_700Bold,
//   Exo2_700Bold_Italic,
//   Exo2_800ExtraBold,
//   Exo2_800ExtraBold_Italic,
//   Exo2_900Black,
//   Exo2_900Black_Italic,
// } from "@expo-google-fonts/exo-2";

import Icon from '@expo/vector-icons/MaterialIcons';
import Icon2 from '@expo/vector-icons/FontAwesome5';
import { styles } from './Home_Client_Style';
import PrimaryButton from '../General/PrimaryButton';
import { getAllRequest } from '../../Redux/Action';

const Home_Client = ({ navigation }) => {
	const user = useSelector((state) => state.user);
	const request = useSelector((state) => state.allRequests);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllRequest(user.googleId));
		// dispatch(getClient(request.requests[0].clientId));
	}, []);

	console.log('ESTOY EN HOME', request);

	// let [fontsLoaded, error] = useFonts({
	//   Exo2_100Thin,
	//   Exo2_100Thin_Italic,
	//   Exo2_200ExtraLight,
	//   Exo2_200ExtraLight_Italic,
	//   Exo2_300Light,
	//   Exo2_300Light_Italic,
	//   Exo2_400Regular,
	//   Exo2_400Regular_Italic,
	//   Exo2_500Medium,
	//   Exo2_500Medium_Italic,
	//   Exo2_600SemiBold,
	//   Exo2_600SemiBold_Italic,
	//   Exo2_700Bold,
	//   Exo2_700Bold_Italic,
	//   Exo2_800ExtraBold,
	//   Exo2_800ExtraBold_Italic,
	//   Exo2_900Black,
	//   Exo2_900Black_Italic,
	// });perdon fede

	// if (!fontsLoaded) {
	//   return <Text>Loading...</Text>;
	// }

	return (
		<>
			<Flex inline justify='space-between'>
				<Box style={{ marginTop: 70 }} m={30}>
					<Text variant='h6'>Hola, {user.name}</Text>
					<Text>Cómo podemos ayudarte?</Text>
				</Box>
				<Box style={{ marginTop: 70 }} m={30}>
					<IconButton
						icon={(props) => <Icon name='notifications' {...props} />}
					/>
				</Box>
			</Flex>
			<Flex style={styles.wrapper} center fill>
				<Wrap style={{ justifyContent: 'space-evenly' }} m={4}>
					<Box
						ml={10}
						w={180}
						h={50}
						style={{
							backgroundColor: '#faf089',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 10,
							overflow: 'hidden',
						}}
					>
						<Text>Solicitudes activas: 0</Text>
					</Box>
				</Wrap>

				<PrimaryButton
					onPress={() => navigation.navigate('BudgetForm')}
					title='Necesito una solucion'
					trailing={(props) => <Icon2 name='house-damage' {...props} />}
				/>
				<Image
					source={require('../../assets/noProblemHome.png')}
					alignSelf='center'
					style={styles.image}
				/>
			</Flex>
		</>
	);
};

export default Home_Client;
