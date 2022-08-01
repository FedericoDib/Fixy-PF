import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./CardListStyle";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Entypo";
import { getBudgetDetail } from "../../Redux/Action";

const RequestCard = ({ item, navigation }) => {
  console.log("ITEM", item);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      underlayColor="white"
      onPress={() => {
        navigation.navigate(
          item.status === "active" ? "Resume" : "HomeClient",
          {
            item: item,
          }
        );
      }}
    >
      <View style={styles.cardContainer}>
        <View style={styles.textContainer}>
          <View style={styles.nameAndReviewContainer}>
            <Text style={styles.textName}>{item.affair}</Text>
          </View>
          <Text style={styles.textProfession}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RequestCard;
