import {
	View,
	FlatList,
	StyleSheet,
	Alert,
	TouchableHighlight,
	Text,
} from 'react-native';
import CardList from './CardList';
import { Stack, TextInput, IconButton } from '@react-native-material/core';
import React, { useState, useEffect } from 'react';
import style from './ListStyle';
import { useSelector, useDispatch } from 'react-redux';
import {
	getAllProfessionals,
	getAllRequest,
	searchProfessional,
	getAllBudgets,
} from '../../Redux/Action';
import Loader from '../General/Loader';
import BudgetCard from './BudgetCard';
// import { professionals, user, requests } from "./Hardcode";

export default function List({ navigation, route }) {
	const [inputSearch, setInputSearch] = useState('');
	const [filterData, setFilterData] = useState([]);
	const [data, setData] = useState([]);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const professionals = useSelector((state) => state.professionals);
	const requests = useSelector((state) => state.allRequests);
	const user = useSelector((state) => state.user);
	const budgets = useSelector((state) => state.budgets);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user.googleId[0] === 'c') {
			console.log(
				'HHHHHHHHHHHHDDDDDDDDDDDDDDDDDDDDDDDDDDPPPPPPPPPPPPPPP',
				requests
			);
			// if(route&&route.params.data === 'active'){
			//   console.log
			// }
			if (professionals.length) setData(professionals);
		} else {
			if (route && route.params.data === 'budget') {
				setData(budgets);
			} else {
				if (requests.requests.length) {
					let filteredRequests = requests.requests.filter((e) =>
						route ? e.status === route.params.data : e.status.includes('')
					);
					setData(filteredRequests);
				}
			}
		}
		console.log('DATA', data);
	}, [professionals, requests, user, budgets, route.params.data]);

	// useEffect(() => {
	// 	const unsubscribe = navigation.addListener('blur', () => {
	// 		setData([])
	// 	});

	// 	return unsubscribe;
	// }, [navigation]);

	// console.log("PROFESSIONALS", professionals);
	let newdata = [];
	let dataDefault = [
		{
			name: 'Profesional no encontrado',
		},
	];
	function onChange(e) {
		setInputSearch(e.text);
		newdata = professionals.filter((user) => user.name.includes(e.text));
		setFilterData(newdata);
	}
	const handleChange = (e) => {
		dispatch(searchProfessional(e.text));
	};

	const onRefresh = () => {
		dispatch(getAllRequest(user.googleId));
	};

	return (
		<View style={style.mainContainer}>
			{user.googleId[0] === 'c' ? (
				<View style={{ flex: 1 }}>
					<View style={{ flex: 1 }}>
						<TextInput
							onChangeText={(text) => handleChange({ text })}
							label='Buscar'
							variant='outlined'
							// trailing={(props) => (
							//     <IconButton
							//         icon={(props) => <Icon name="search" {...props} />}
							//         {...props}
							//     />
							// )}
						/>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-around',
						}}
					>
						<View style={[style.button, { backgroundColor: '#EEECF7' }]}>
							<View style={[style.textButton]}>
								<Text style={{ fontSize: 14, fontWeight: 'bold' }}>
									Ordenar por:{' '}
								</Text>
							</View>
						</View>
						<TouchableHighlight
							style={style.button}
							activeOpacity={0.6}
							underlayColor='white'
							onPress={() => {
								Alert.alert('hola');
							}}
						>
							<View style={style.textButton}>
								<Text>Cercania</Text>
							</View>
						</TouchableHighlight>
						<TouchableHighlight
							style={style.button}
							activeOpacity={0.6}
							underlayColor='#white'
							onPress={() => {
								orderByReviews();
							}}
						>
							<View style={style.textButton}>
								<Text>Reviews</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>
			) : (
				<View></View>
			)}
			<View style={{ flex: 6 }}>
				{!data.length ? (
					<Text>No se encontraron</Text>
				) : (
					<FlatList
						data={data}
						onRefresh={onRefresh}
						refreshing={isRefreshing}
						renderItem={({ item }) =>
							item.estimatedBudget ? (
								<BudgetCard item={item} navigation={navigation} />
							) : (
								<CardList
									navigation={navigation}
									item={item}
									route={route ? route.params.data : 'pending'}
								/>
							)
						}
					/>
				)}
			</View>
		</View>
	);
}
