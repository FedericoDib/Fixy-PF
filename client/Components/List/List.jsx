import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Text,
} from "react-native";
import CardList from "./CardList";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import React, { useState, useEffect } from "react";
import style from "./ListStyle";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProfessionals,
  getAllRequest,
  searchProfessional,
} from "../../Redux/Action";
// import { professionals, user, requests } from "./Hardcode";

export default function List({ navigation }) {
  const [inputSearch, setInputSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState([]);
  const professionals = useSelector((state) => state.professionals);
  const requests = useSelector((state) => state.allRequests);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!data.length) {
    if (user.googleId[0] === "c") {
      if (professionals.length) {
        setData(professionals);
      } else {
        setData([{ name: "no se encontro profesional", reviews: [3] }]);
      }
    } else {
      let filteredRequests = requests.requests.filter(
        (e) => e.status === "pending"
      );
      setData(filteredRequests);
    }
  }

  // console.log("PROFESSIONALS", professionals);
  console.log("DATA", data);
  let newdata = [];
  let dataDefault = [
    {
      name: "Profesional no encontrado",
      reviews: [3],
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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View style={[style.button, { backgroundColor: "#EEECF7" }]}>
              <View style={[style.textButton]}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  Ordenar por:{" "}
                </Text>
              </View>
            </View>
            <TouchableHighlight
              style={style.button}
              activeOpacity={0.6}
              underlayColor="white"
              onPress={() => {
                Alert.alert("hola");
              }}
            >
              <View style={style.textButton}>
                <Text>Cercania</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={style.button}
              activeOpacity={0.6}
              underlayColor="#white"
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
        <FlatList
          data={data.length ? data : dataDefault}
          renderItem={({ item }) => (
            <CardList navigation={navigation} item={item} />
          )}
        />
      </View>
    </View>
  );
}
