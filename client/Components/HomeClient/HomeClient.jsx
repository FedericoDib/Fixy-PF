import React, { useCallback, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
	Flex,
	Spacer,
	Box,
	Text,
	IconButton,
	Wrap,
} from '@react-native-material/core';
import { useFocusEffect } from '@react-navigation/native';

import { TouchableOpacity, View } from 'react-native';

import Icon from '@expo/vector-icons/MaterialIcons';
import Icon2 from '@expo/vector-icons/FontAwesome5';
import { styles } from './HomeClientStyle';
import PrimaryButton from '../General/PrimaryButton';

// const HomeClient = ({ navigation }) => {
// 	const user = useSelector((state) => state.generalReducer.user);
// const requests = useSelector((state) => state.generalReducer.allRequests)
//   const dispatch = useDispatch();

//   useFocusEffect(
//     useCallback(
//       () => {
//         dispatch(getAllRequest('client', user.googleId))
//       },
//       [user]
//     )
//   )

// 	// const requests = useSelector((state) => state.allRequests);

// 	// useEffect(() => {
// 	// 	if (user.googleId.includes('p')) {
// 	// 		dispatch(getAllRequest('professional', user.googleId));
// 	// 	} else {
// 	// 		dispatch(getAllRequest('client', user.googleId));
// 	// 		//dispatch(getAllProfessionals('Unknown'));
// 	// 		dispatch(getAllBudgetsClient(user.googleId));
// 	// 	}
// 	// }, [user]);

// 	return (
// 		<>

//
// 		</>
// 	);
// };

// export default HomeClient;

import { getAllRequest } from '../../Redux/Action/generalActions';

const HomeClient = () => {
	const user = useSelector((state) => state.generalReducer.user);
	const requests = useSelector((state) => state.generalReducer.allRequests);
	const [activeRequests, setActiveRequests] = useState();
	const dispatch = useDispatch();

	useFocusEffect(
		useCallback(() => {
			console.log('hola');
			dispatch(getAllRequest('client', user.googleId));
		}, [])
	);

	useFocusEffect(
		useCallback(() => {
			if (requests) {
				activeRequests = requests.requests.filter((req) => {
					req.status === 'active';
				});
			}
		}, [requests])
	);
	console.log('HOME', activeRequests);

	return (
		<View>
			<View></View>
			<View></View>
			<View>
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
						></Box>
						<Text>
							Solicitudes activas: {activeRequests && activeRequests.length}
						</Text>
					</Wrap>
					<PrimaryButton
						onPress={() => navigation.navigate('SolutionForm')}
						title='Necesito una solucion'
						trailing={(props) => <Icon2 name='house-damage' {...props} />}
					/>

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('List', { data: 'activeRequests' })
							}
							style={styles.button}
						>
							<View>
								<Text style={styles.textButton}>Solicitudes activas</Text>
							</View>
						</TouchableOpacity>
						<View style={styles.buttonWrapper}>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('List', { data: 'pendingBudgets' })
								}
								style={[styles.button, { width: '45%' }]}
							>
								<View>
									<Text style={styles.textButton}>Presupuestos recibidos</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('List', { data: 'pendingRequest' });
								}}
								style={[styles.button, { width: '45%' }]}
							>
								<View>
									<Text style={styles.textButton}>Solicitudes enviadas</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</Flex>
			</View>
		</View>
	);
};

export default HomeClient;
