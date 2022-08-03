import {
    View,
    FlatList,
    StyleSheet,
    Alert,
    TouchableHighlight,
    Text,
} from "react-native";
import CardList from "./ProfessionalList/ProfessionalCard";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import React, { useState, useEffect } from "react";
import style from "./ListStyle";
import { useSelector, useDispatch } from "react-redux";
import { getAllRequest } from "../../Redux/Action/generalActions";
import {
    searchProfessional,
    orderByCity,
    orderByReview,
} from "../../Redux/Action/clientActions";

// import { professionals, user, requests } from "./Hardcode";
import Loader from "../General/Loader";
import BudgetCard from "./BudgetCard";
import RequestCard from "./RequestCard";

export default function List({ navigation, route }) {
    const [inputSearch, setInputSearch] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [data, setData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const professionals = useSelector((state) => state.professionals);
    const requests = useSelector((state) => state.allRequests);
    const user = useSelector((state) => state.user);
    const budgets = useSelector((state) => state.budgets);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.googleId[0] === "c") {
            if (route && route.params.data === "active") {
                let filteredRequests = requests[0].requests.filter((e) =>
                    route ? e.status === "active" : null
                );
                return setData(filteredRequests);
            }
            if (route && route.params.data === "request") {
                let filteredRequests = requests[0].requests.filter((e) =>
                    route ? e.status === "pending" : null
                );
                return setData(filteredRequests);
            }
            if (professionals.length)
                route.params.data === "pending"
                    ? setData(budgets)
                    : setData(professionals);
        } else {
            if (route && route.params.data === "budget") {
                setData(budgets);
            } else {
                if (requests.requests.length) {
                    let filteredRequests = requests.requests.filter((e) =>
                        route
                            ? e.status === route.params.data
                            : e.status.includes("")
                    );
                    setData(filteredRequests);
                }
            }
        }
        //onsole.log("DATA", data);
    }, [professionals, requests, user, budgets, route.params.data]);

    // useEffect(() => {
    // 	const unsubscribe = navigation.addListener('blur', () => {
    // 		setData([])
    // 	});

    // 	return unsubscribe;
    // }, [navigation]);

    // if (!data.length) {
    //     if (user.googleId[0] === "c") {
    //         if (professionals.length) {
    //             setData(professionals);
    //         } else {
    //             setData([{ name: "no se encontro profesional" }]);
    //         }
    //     } else {
    //         let filteredRequests = requests.requests.filter(
    //             (e) => e.status === "pending"
    //         );
    //         setData(filteredRequests);
    //     }
    // }

    const onRefresh = () => {
        dispatch(getAllRequest(user.googleId));
    };

    return (
        <View style={style.mainContainer}>
            <View style={{ flex: 6 }}>
                {!data.length ? (
                    <Text>No se encontraron</Text>
                ) : (
                    <FlatList
                        data={data}
                        onRefresh={onRefresh}
                        refreshing={isRefreshing}
                        renderItem={({ item }) => (
                            <RequestCard item={item} navigation={navigation} />
                        )}
                    />
                )}
            </View>
        </View>
    );
}
