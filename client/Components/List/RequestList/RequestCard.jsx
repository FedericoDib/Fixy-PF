import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useCallback } from "react";
import styles from "../CardListStyle";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../../Redux/Action/generalActions";
import { useFocusEffect } from "@react-navigation/native";
import theme from "../../../theme/theme";

const RequestCard = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.generalReducer.user);
  const detail = useSelector((state) => state.generalReducer.userDetail);
  useFocusEffect(
    useCallback(() => {
      dispatch(userDetail(item.clientId, "client"));
    }, [])
  );

  console.log("item", item);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      underlayColor="white"
      onPress={() => {
        if (user && user.googleId[0] === "c") {
          navigation.navigate("RequestDetail", {
            item: item,
            buttons: "client",
          });
        } else if (user && user.googleId[0] === "p") {
          dispatch(userDetail(item.clientId, "client"));
          navigation.navigate("RequestDetail", {
            item: item,
            buttons: "prof",
          });
        }
      }}
    >
      <View style={[styles.cardContainer, { ...theme.shadows.dark }]}>
        <View style={styles.imageContainer}>
          {console.log("detail", detail)}
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
            <Text style={styles.textProfession}>{detail.name}</Text>
          </View>
          <Text style={{ fontSize: 17 }}>{item.affair}</Text>
          <Text
            style={{
              fontSize: 16,
              color: theme.colors.threePalet.primary,
            }}
          >
            {item.date && item.date.length < 9
              ? "20" + item.date.split("/").reverse().join("-")
              : item.date && item.date.slice(0, 10)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RequestCard;
