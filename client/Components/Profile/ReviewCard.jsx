import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { messageToAdmin } from "../../Redux/Action/generalActions";
import Toast from "react-native-root-toast";
import styles from "../UserDetail/UserDetailStyle";

const ReviewCard = ({ name, comment, review, id }) => {
  const user = useSelector((state) => state.generalReducer.user);
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(
      messageToAdmin({
        idUser: user.googleId,
        idReview: id,
        message: { name: name, comment: comment },
        asunto: "COMENTARIO DENUNCIADO",
      })
    );
    let toast = Toast.show("Comentario denunciado!", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: "green",
    });

    setTimeout(function () {
      Toast.hide(toast);
    }, 1000);
  };

  return (
    <View style={styles.review}>
      <TouchableHighlight onPress={() => handlePress()}>
        <Ionicons name="flag-outline" size={24} color="black" />
      </TouchableHighlight>
      <View style={styles.reviewHeader}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.name}>{review}</Text>
      </View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
};

export default ReviewCard;
