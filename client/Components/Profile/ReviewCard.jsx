import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { messageToAdmin } from "../../Redux/Action/generalActions";
import Toast from "react-native-root-toast";
import theme from "../../theme/theme";
import IconStart from "react-native-vector-icons/Foundation";

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
    }, 3000);
  };

  return (
    <View style={[styles.review, { ...theme.shadows.dark }]}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingVertical: 10,
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <View style={styles.reviewHeader}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.reviewsContainer}>
          <IconStart
            name="star"
            color={theme.colors.threePalet.secondary}
            size={19}
          />
          <Text style={{ color: "#fff", marginLeft: 3 }}>{review}</Text>
        </View>
        <View style={{ width: 40 }}>
          <TouchableHighlight onPress={() => handlePress()}>
            <Ionicons
              name="flag-outline"
              size={24}
              color={theme.colors.threePalet.primary}
            />
          </TouchableHighlight>
        </View>
      </View>

      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  review: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginVertical: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    color: theme.colors.threePalet.primary,
  },
  reviewHeader: {
    justifyContent: "center",
    alignItems: "center",
    height: 55,
  },
  reviewsContainer: {
    flexDirection: "row",
    borderColor: theme.colors.threePalet.secondary,
    borderWidth: 3,
    backgroundColor: theme.colors.threePalet.primary,
    borderRadius: 10,
    width: "13%",
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  comment: {
    fontSize: 19,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

export default ReviewCard;
