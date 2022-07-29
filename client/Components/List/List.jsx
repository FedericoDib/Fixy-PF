import { View, FlatList, StyleSheet, Alert } from "react-native";
import CardList from "./CardList";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import React, { useState, useEffect } from "react";
import style from "./ListStyle";
import { useSelector, useDispatch } from "react-redux";
import { getAllProfessionals, searchProfessional } from "../../Redux/Action";

export default function List({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const professionals = useSelector((state) => state.professionals);
  const requests = useSelector((state) => state.allRequests);
  const [inputSearch, setInputSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState([]);

  // if (!data.length) {
  // if (user.googleId[0] === "c") {
  //   // if (professionals.length) {
  //   return setData(professionals);
  //  // } else {
  //   // setData([{}]);
  //   // }
  // } else {
  //   return setData(requests.requests);
  // }
  // }

  console.log("PROFESSIONALS", professionals);
  // console.log(data);
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
  const handleChange = (e) => {
    dispatch(searchProfessional(e.text));
  };
  return (
    <View style={style.mainContainer}>
      {user.googleId[0] === "c" ? (
        <View style={{ flex: 1 }}>
          <TextInput
            onChangeText={(text) => handleChange({ text })}
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
      ) : (
        <View></View>
      )}
      <View style={{ flex: 10 }}>
        <FlatList
          data={
            filterData.length
              ? filterData
              : inputSearch.length
              ? dataDefault
              : data
          }
          renderItem={({ item }) => (
            <CardList navigation={navigation} item={item} />
          )}
        />
      </View>
    </View>
  );
}
