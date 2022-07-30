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

import {
	Image,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from 'react-native';
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
import {
	getAllRequest,
	getAllBudgets,
	getAllProfessionals,
} from '../../Redux/Action';

const Home_Client = ({ navigation }) => {
	const user = useSelector((state) => state.user);
	const requests = useSelector((state) => state.allRequests);
  
	const dispatch = useDispatch();
  
	useEffect(() => {
    if (user.googleId.includes('p')) {
      dispatch(getAllRequest('professional', user.googleId));
		} else {
      dispatch(getAllRequest('client', user.googleId));
			dispatch(getAllProfessionals('Unknown'));
      console.log('-----------------', requests)
		}
	}, [user]);

	console.log('ESTOY EN HOME', user);

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
				{user.googleId.includes('c') ? (
					<React.Fragment>
						<PrimaryButton
							onPress={() => navigation.navigate('SolutionForm')}
							title='Necesito una solucion'
							trailing={(props) => <Icon2 name='house-damage' {...props} />}
						/>

						<View style={styles.buttonContainer}>
							<TouchableOpacity
								onPress={() => navigation.navigate('List', { data: 'active' })}
								style={styles.button}
							>
								<View>
									<Text style={styles.textButton}>Solicitudes activas</Text>
								</View>
							</TouchableOpacity>
							<View style={styles.buttonWrapper}>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate('List', { data: 'pending' })
									}
									style={[styles.button, { width: '45%' }]}
								>
									<View>
										<Text style={styles.textButton}>
											Presupuestos recibidos
										</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										dispatch(getAllBudgets(user.googleId));
										navigation.navigate('List', { data: 'request' });
									}}
									style={[styles.button, { width: '45%' }]}
								>
									<View>
										<Text style={styles.textButton}>Solicitudes enviadas</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</React.Fragment>
				) : (
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={() => navigation.navigate('List', { data: 'active' })}
							style={styles.button}
						>
							<View>
								<Text style={styles.textButton}>Solicitudes activas</Text>
							</View>
						</TouchableOpacity>
						<View style={styles.buttonWrapper}>
							<TouchableOpacity
								onPress={() => navigation.navigate('List', { data: 'pending' })}
								style={[styles.button, { width: '45%' }]}
							>
								<View>
									<Text style={styles.textButton}>Solicitudes recibidas</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									dispatch(getAllBudgets(user.googleId));
									navigation.navigate('List', { data: 'budget' });
								}}
								style={[styles.button, { width: '45%' }]}
							>
								<View>
									<Text style={styles.textButton}>Presupuestos enviados</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</Flex>
		</>
	);
};

export default Home_Client;
