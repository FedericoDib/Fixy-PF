import { View, FlatList, StyleSheet, Alert } from "react-native";
import CardList from "./CardList";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import React, { useState } from "react";
import style from "./ListStyle";
import { useSelector, useDispatch, useEffect } from "react-redux";
import getAllProfessionalsJson from "../../Redux/Action";

export default function List() {
    const [inputSearch, setInputSearch] = useState("");
    const [filterData, setFilterData] = useState([]);
    const professionals = useSelector((state) => state.professionals);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProfessionalsJson());
    }, []);
    console.log(professionals);
    // const typeOfUser = useSelector((state) => state.typeOfUser.value);
    // console.log(typeOfUser);
    let newdata = [];
    let dataDefault = [
        {
            name: "Profesional no encontrado",
        },
    ];
    let data = [
        {
            name: "Maximiliano Blas Silva",
            profession: "electricista",
            review: "4.8",
        },
        { name: "Javi", profession: "electricista", review: "3.8" },
        {
            name: "Federico Hugo Dib",
            profession: "electricista",
            review: "4.5",
        },
        { name: "Fiorenza Seia", profession: "electricista", review: "4.2" },
        {
            name: "Maxemiliano Blas Silva",
            profession: "electricista",
            review: "4.9",
        },
    ];
    function onChange(e) {
        setInputSearch(e.text);
        newdata = data.filter((user) => user.name.includes(e.text));
        setFilterData(newdata);
    }

    return (
        <View style={style.mainContainer}>
            <View>
                <TextInput
                    onChangeText={(text) => onChange({ text })}
                    label="Buscar"
                    variant="outlined"
                    // trailing={(props) => (
                    //     <IconButton
                    //         icon={(props) => <Icon name="search" {...props} />}
                    //         {...props}
                    //     />
                    // )}
                />
            </View>
            <FlatList
                data={
                    filterData.length
                        ? filterData
                        : inputSearch.length
                        ? dataDefault
                        : data
                }
                renderItem={({ item }) => <CardList item={item} />}
            />
        </View>
    );
}
