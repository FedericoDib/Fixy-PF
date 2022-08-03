import React, { useCallback, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Flex, Box, Text, IconButton, Wrap } from '@react-native-material/core';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import Icon2 from '@expo/vector-icons/FontAwesome5';
import { styles } from './HomeClientStyle';
import PrimaryButton from '../General/PrimaryButton';
import { getAllRequest } from '../../Redux/Action/generalActions';
import ActiveRequestCard from '../General/ActiveRequestCard';

const HomeClient = () => {
	const user = useSelector((state) => state.generalReducer.user);
	const requests = useSelector((state) => state.generalReducer.allRequests);
	const [activeRequests, setActiveRequests] = useState([]);
	const dispatch = useDispatch();

	useFocusEffect(
		useCallback(() => {
			dispatch(getAllRequest('client', user.googleId));
		}, [])
	);

	useFocusEffect(
		useCallback(() => {
			if (requests.length > 0) {
				let aux = requests.filter((req) => {
					return req.status === 'active';
				});
				setActiveRequests(aux);
			}
		}, [requests])
	);

	const renderActiveCard = ({ item }) => {
		return <ActiveRequestCard request={item} />;
	};

	return (
		<View style={{ flex: 1, width: '100%', backgroundColor: 'pink' }}>
			<View></View>
			<View></View>
			<View style={{ flex: 1, width: '100%', backgroundColor: 'blue' }}>
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
					<Wrap
						style={{ justifyContent: 'space-evenly', backgroundColor: 'green' }}
						m={4}
					>
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
							<Text>
								Solicitudes activas: {activeRequests && activeRequests.length}
							</Text>
						</Box>
					</Wrap>

					<View style={styles.buttonContainer}>
						{!activeRequests.length ? (
							<Text>No tenes solicitudes activas</Text>
						) : (
							<FlatList
								style={{ width: '100%', backgroundColor: 'cyan', flex: 1 }}
								data={activeRequests}
								renderItem={renderActiveCard}
								keyExtractor={(item, index) => `activeReq-${index}`}
								horizontal
								showsHorizontalScrollIndicator={false}
							/>
						)}
						<View style={styles.buttonWrapper}>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('BudgetList', { data: 'pendingBudgets' })
								}
								style={[styles.button, { width: '45%' }]}
							>
								<View>
									<Text style={styles.textButton}>Presupuestos recibidos</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('RequestList', { data: 'pendingRequest' });
								}}
								style={[styles.button, { width: '45%' }]}
							>
								<View>
									<Text style={styles.textButton}>Solicitudes enviadas</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
					<PrimaryButton
						onPress={() => navigation.navigate('SolutionForm')}
						title='Necesito una solucion'
						trailing={(props) => <Icon2 name='house-damage' {...props} />}
					/>
				</Flex>
			</View>
		</View>
	);
};

export default HomeClient;