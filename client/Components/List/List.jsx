import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useSelector } from "react-redux/es/exports";
import CardList from "./CardList";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import Icon from "react-native-vector-icons/EvilIcons";
import React, { useState } from "react";

export default function List() {
    const [inputSearch, setInputSearch] = useState("");
    const [filterData, setFilterData] = useState([]);
    // const users = useSelector((state) => state.users);
    // const typeOfUser = useSelector((state) => state.typeOfUser.value);
    // console.log(typeOfUser);
    let newdata = [];
    let dataDefault = [
        {
            name: "Profesional no encontrado",
        },
    ];
    let data = [
        { name: "Maximiliano Blas Silva", profession: "electricista" },
        { name: "Javi", profession: "electricista" },
        { name: "Federico Hugo Dib", profession: "electricista" },
        { name: "Fiorenza Seia", profession: "electricista" },
        { name: "Maxemiliano Blas Silva", profession: "electricista" },
    ];
    function onChange(e) {
        setInputSearch(e.text);
        newdata = data.filter((user) => user.name.includes(e.text));
        setFilterData(newdata);
    }

    return (
        <View>
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
