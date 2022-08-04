// import {
//     View,
//     FlatList,
//     StyleSheet,
//     Alert,
//     TouchableHighlight,
//     Text,
// } from "react-native";
// import CardList from "./ProfessionalList/ProfessionalCard";
// import { Stack, TextInput, IconButton } from "@react-native-material/core";
// import React, { useState, useEffect } from "react";
// import style from "./ListStyle";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllRequest } from "../../Redux/Action/generalActions";
// import {
//     searchProfessional,
//     orderByCity,
//     orderByReview,
// } from "../../Redux/Action/clientActions";

// // import { professionals, user, requests } from "./Hardcode";
// import Loader from "../General/Loader";
// //import BudgetCard from "./BudgetCard";
// import RequestCard from "./RequestCard";

// export default function List({ navigation, route }) {
//     const [inputSearch, setInputSearch] = useState("");
//     const [filterData, setFilterData] = useState([]);
//     const [data, setData] = useState([]);
//     const [isRefreshing, setIsRefreshing] = useState(false);
//     const professionals = useSelector((state) => state.professionals);
//     const requests = useSelector((state) => state.allRequests);
//     const user = useSelector((state) => state.user);
//     const order = useSelector((state) => state.order);
//     const notOrder = useSelector((state) => state.notOrder);
//     const averageReviews = useSelector((state) => state.averageReviews);
//     const budgets = useSelector((state) => state.budgets);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (user.googleId[0] === "c") {
//             if (route && route.params.data === "active") {
//                 let filteredRequests = requests[0].requests.filter((e) =>
//                     route ? e.status === "active" : null
//                 );
//                 return setData(filteredRequests);
//             }
//             if (route && route.params.data === "request") {
//                 let filteredRequests = requests[0].requests.filter((e) =>
//                     route ? e.status === "pending" : null
//                 );
//                 return setData(filteredRequests);
//             }
//             if (professionals.length)
//                 route.params.data === "pending"
//                     ? setData(budgets)
//                     : setData(professionals);
//         } else {
//             if (route && route.params.data === "budget") {
//                 setData(budgets);
//             } else {
//                 if (requests.requests.length) {
//                     let filteredRequests = requests.requests.filter((e) =>
//                         route
//                             ? e.status === route.params.data
//                             : e.status.includes("")
//                     );
//                     setData(filteredRequests);
//                 }
//             }
//         }
//         //onsole.log("DATA", data);
//     }, [professionals, requests, user, budgets, route.params.data]);

//     // useEffect(() => {
//     // 	const unsubscribe = navigation.addListener('blur', () => {
//     // 		setData([])
//     // 	});

//     // 	return unsubscribe;
//     // }, [navigation]);

//     // if (!data.length) {
//     //     if (user.googleId[0] === "c") {
//     //         if (professionals.length) {
//     //             setData(professionals);
//     //         } else {
//     //             setData([{ name: "no se encontro profesional" }]);
//     //         }
//     //     } else {
//     //         let filteredRequests = requests.requests.filter(
//     //             (e) => e.status === "pending"
//     //         );
//     //         setData(filteredRequests);
//     //     }
//     // }

//     let newdata = [];
//     let dataDefault = [
//         {
//             name: "Profesional no encontrado",
//         },
//     ];
//     function onChange(e) {
//         setInputSearch(e.text);
//         newdata = professionals.filter((user) => user.name.includes(e.text));
//         setFilterData(newdata);
//     }
//     const handleChange = (e) => {
//         dispatch(searchProfessional(e.text));
//     };

//     const orderCity = (e) => {
//         dispatch(orderByCity(user.city));
//         setData(professionals);
//     };

//     const orderReview = (e) => {
//         // dispatch(orderByReview());
//         dispatch(orderByReview());

//         setData(professionals);
//     };

//     const onRefresh = () => {
//         dispatch(getAllRequest(user.googleId));
//     };

//     return (
//         <View style={style.mainContainer}>
//             {user.googleId[0] === "c" ? (
//                 <View style={{ flex: 1 }}>
//                     <View style={{ flex: 1 }}>
//                         <TextInput
//                             onChangeText={(text) => handleChange({ text })}
//                             label="Buscar"
//                             variant="outlined"
//                             // trailing={(props) => (
//                             //     <IconButton
//                             //         icon={(props) => <Icon name="search" {...props} />}
//                             //         {...props}
//                             //     />
//                             // )}
//                         />
//                     </View>
//                     <View
//                         style={{
//                             flex: 1,
//                             flexDirection: "row",
//                             justifyContent: "space-around",
//                         }}
//                     >
//                         <View
//                             style={[
//                                 style.button,
//                                 { backgroundColor: "#EEECF7" },
//                             ]}
//                         >
//                             <View style={[style.textButton]}>
//                                 <Text
//                                     style={{ fontSize: 14, fontWeight: "bold" }}
//                                 >
//                                     Ordenar por:{" "}
//                                 </Text>
//                             </View>
//                         </View>
//                         <TouchableHighlight
//                             style={style.button}
//                             activeOpacity={0.6}
//                             underlayColor="white"
//                             onPress={(e) => {
//                                 orderCity(e);
//                             }}
//                         >
//                             <View style={style.textButton}>
//                                 <Text>Cercania</Text>
//                             </View>
//                         </TouchableHighlight>
//                         <TouchableHighlight
//                             style={style.button}
//                             activeOpacity={0.6}
//                             underlayColor="#white"
//                             onPress={(e) => {
//                                 orderReview(e);
//                             }}
//                         >
//                             <View style={style.textButton}>
//                                 <Text>Reviews</Text>
//                             </View>
//                         </TouchableHighlight>
//                     </View>
//                 </View>
//             ) : (
//                 <View></View>
//             )}
//             <View style={{ flex: 6 }}>
//                 {!data.length ? (
//                     <Text>No se encontraron</Text>
//                 ) : (
//                     <FlatList
//                         data={data}
//                         onRefresh={onRefresh}
//                         refreshing={isRefreshing}
//                         renderItem={({ item }) =>
//                             item.estimatedBudget ? (
//                                 <BudgetCard
//                                     item={item}
//                                     navigation={navigation}
//                                 />
//                             ) : item.status ? (
//                                 <RequestCard
//                                     item={item}
//                                     navigation={navigation}
//                                 />
//                             ) : (
//                                 <CardList
//                                     navigation={navigation}
//                                     item={item}
//                                     route={
//                                         route ? route.params.data : "pending"
//                                     }
//                                 />
//                             )
//                         }
//                     />
//                 )}
//             </View>
//         </View>
//     );
// }
