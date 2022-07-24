import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useSelector } from "react-redux/es/exports";
import CardList from "./CardList";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import React, { useState, useEffect } from "react";
import style from "./ListStyle";
import { useSelector, useDispatch } from "react-redux";
import { getAllProfessionals } from "../../Redux/Action";

export default function List() {
    const [inputSearch, setInputSearch] = useState("");
    const [filterData, setFilterData] = useState([]);
    const professionals = useSelector((state) => state.professionals);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProfessionals());
    }, []);
    let newdata = [];
    let dataDefault = [
        {
            name: "Profesional no encontrado",
        },
    ];
    function onChange(e) {
        setInputSearch(e.text);
        newdata = professionals.filter((user) => user.name.includes(e.text));
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
                        : professionals
                }
                renderItem={({ item }) => <CardList item={item} />}
            />
        </View>
    );
}
