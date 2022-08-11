import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useCallback } from "react";
import styles from "../CardListStyle";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Entypo";
import {
  getBudgetDetail,
  userDetail,
} from "../../../Redux/Action/generalActions";
import { useFocusEffect } from "@react-navigation/native";

const BudgetCard = ({ item, navigation }) => {
  const user = useSelector((state) => state.generalReducer.user);
  const detail = useSelector((state) => state.generalReducer.userDetail);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(userDetail(item.professionalId, "professional"));
    }, [])
  );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      underlayColor="white"
      onPress={() => {
        dispatch(getBudgetDetail(item.id));
        navigation.navigate("BudgetDetail", {
          buttons: user.googleId[0] === "c" ? "true" : "false",
        });
      }}
    >
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={{ borderRadius: 100 }}
            source={{
              uri: detail.perfilPic,
              width: 65,
              height: 65,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameAndReviewContainer}>
            <Text style={styles.textName}>{detail.name}</Text>
          </View>
          <Text style={styles.textProfession}>
            {"Turno de la visita: " + item.turn}
          </Text>
          <Text style={styles.textProfession}>Ver detalle</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BudgetCard;
