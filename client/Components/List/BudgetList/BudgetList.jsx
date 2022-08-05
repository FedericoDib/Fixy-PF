import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Text,
} from "react-native";
//import CardList from './ProfessionalList/ProfessionalCard';
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import React, { useState, useEffect, useCallback } from "react";
import style from "../ListStyle";
import { useSelector, useDispatch } from "react-redux";
// import { getAllRequest } from '../../Redux/Action/generalActions';
// import {
// 	searchProfessional,
// 	orderByCity,
// 	orderByReview,
// } from '../../Redux/Action/clientActions';
import { useFocusEffect } from "@react-navigation/native";
import { getAllBudgetsFromClient } from "../../../Redux/Action/clientActions";
import { getAllBudgetsFromProfessional } from "../../../Redux/Action/professionalActions";
import BudgetCard from "./BudgetCard";

// import { professionals, user, requests } from "./Hardcode";
// import Loader from '../General/Loader';
// import BudgetCard from './BudgetCard';
// import RequestCard from './RequestCard';

export default function BudgetList({ navigation, route }) {
  // const [inputSearch, setInputSearch] = useState('');
  // const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState([]);
  // const [isRefreshing, setIsRefreshing] = useState(false);
  // const professionals = useSelector((state) => state.professionals);
  // const requests = useSelector((state) => state.allRequests);
  // const user = useSelector((state) => state.user);
  // const order = useSelector((state) => state.order);
  // const notOrder = useSelector((state) => state.notOrder);
  // const averageReviews = useSelector((state) => state.averageReviews);
  // const budgets = useSelector((state) => state.budgets);

  // const dispatch = useDispatch();

  // useEffect(() => {
  // 	if (user.googleId[0] === 'c') {
  // 		if (route && route.params.data === 'active') {
  // 			let filteredRequests = requests[0].requests.filter((e) =>
  // 				route ? e.status === 'active' : null
  // 			);
  // 			return setData(filteredRequests);
  // 		}
  // 		if (route && route.params.data === 'request') {
  // 			let filteredRequests = requests[0].requests.filter((e) =>
  // 				route ? e.status === 'pending' : null
  // 			);
  // 			return setData(filteredRequests);
  // 		}
  // 		if (professionals.length)
  // 			route.params.data === 'pending'
  // 				? setData(budgets)
  // 				: setData(professionals);
  // 	} else {
  // 		if (route && route.params.data === 'budget') {
  // 			setData(budgets);
  // 		} else {
  // 			if (requests.requests.length) {
  // 				let filteredRequests = requests.requests.filter((e) =>
  // 					route ? e.status === route.params.data : e.status.includes('')
  // 				);
  // 				setData(filteredRequests);
  // 			}
  // 		}
  // 	}
  // 	//onsole.log("DATA", data);
  // }, [professionals, requests, user, budgets, route.params.data]);

  // // useEffect(() => {
  // // 	const unsubscribe = navigation.addListener('blur', () => {
  // // 		setData([])
  // // 	});

  // // 	return unsubscribe;
  // // }, [navigation]);

  // // if (!data.length) {
  // //     if (user.googleId[0] === "c") {
  // //         if (professionals.length) {
  // //             setData(professionals);
  // //         } else {
  // //             setData([{ name: "no se encontro profesional" }]);
  // //         }
  // //     } else {
  // //         let filteredRequests = requests.requests.filter(
  // //             (e) => e.status === "pending"
  // //         );
  // //         setData(filteredRequests);
  // //     }
  // // }

  // let newdata = [];
  // let dataDefault = [
  // 	{
  // 		name: 'Profesional no encontrado',
  // 	},
  // ];
  // function onChange(e) {
  // 	setInputSearch(e.text);
  // 	newdata = professionals.filter((user) => user.name.includes(e.text));
  // 	setFilterData(newdata);
  // }
  // const handleChange = (e) => {
  // 	dispatch(searchProfessional(e.text));
  // };

  // const orderCity = (e) => {
  // 	dispatch(orderByCity(user.city));
  // 	setData(professionals);
  // };

  // const orderReview = (e) => {
  // 	// dispatch(orderByReview());
  // 	dispatch(orderByReview());

  // 	setData(professionals);
  // };

  // const onRefresh = () => {
  // 	dispatch(getAllRequest(user.googleId));
  // };

  const user = useSelector((state) => state.generalReducer.user);
  let budgets = useSelector((state) => state.generalReducer.budgets);
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsRefreshing(false);
      if (user && user.googleId[0] === "c") {
        dispatch(getAllBudgetsFromClient(user.googleId));
      } else if (user && user.googleId[0] === "p") {
        dispatch(getAllBudgetsFromProfessional(user.googleId));
      }
      setIsRefreshing(true);
    }, [])
  );

  console.log("BUDGET HDP", budgets);

  return (
    <View style={style.mainContainer}>
      <View style={{ flex: 6 }}>
        {!budgets.length ? (
          <Text>No se encontraron</Text>
        ) : (
          <FlatList
            data={budgets.filter((b) => b.status === "pending")}
            extraData={isRefreshing}
            // onRefresh={onRefresh}
            // refreshing={isRefreshing}
            renderItem={({ item }) => (
              <BudgetCard item={item} navigation={navigation} />
            )}
          />
        )}
      </View>
    </View>
  );
}
