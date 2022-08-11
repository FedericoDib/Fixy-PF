import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import IconStart from "react-native-vector-icons/Foundation";
import { useDispatch, useSelector } from "react-redux";
import {
  //getClientId,
  getRequestDetail,
  userDetail,
} from "../../../Redux/Action/generalActions";
import {
  averageReview,
  countAddition,
  requestToProfessional,
} from "../../../Redux/Action/clientActions";
import styles from "../CardListStyle";
// import { professionals, user } from "./Hardcode";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import theme from "../../../theme/theme";

let rating;
export default function ProfessionalCard({ item, navigation, route }) {
  console.log("item", item);
  const dispatch = useDispatch();
  const request = useSelector((state) => state.clientReducer.request);

  const onPress = () => {
    dispatch(userDetail(item.googleId, "professional"));
    setTimeout(() => {
      navigation.navigate("ProfileDetail", {
        averageReviews: item.averageReviews,
        button: "true",
      });
    }, 1000);
  };

  const leftSwipe = (progess, dragX) => {
    return (
      <View style={styles.background}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
          Enviando solicitud
        </Text>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        leftThreshold={1000}
        onSwipeableWillClose={(left) => {
          dispatch(
            requestToProfessional({
              googleId: item.googleId,
              idRequest: request.id,
            })
          );
          let toast = Toast.show("Solicitud enviada!", {
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
        }}
        overshootLeft={false}
        renderLeftActions={(progess, dragX) => leftSwipe(progess, dragX)}
      >
        <TouchableHighlight
          activeOpacity={0.9}
          style={{ width: "100%" }}
          underlayColor="white"
          onPress={() => onPress()}
        >
          <View style={[styles.cardContainer, { ...theme.shadows.dark }]}>
            <View style={styles.imageContainer}>
              <Image
                style={{ borderRadius: 100 }}
                source={{
                  uri: item.perfilPic,
                  width: 65,
                  height: 65,
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textName}>{item.name}</Text>
              <Text style={styles.textProfession}>{item.profession}</Text>
            </View>
            <View style={styles.reviewContainer}>
              <IconStart name="star" color="#E1C85A" size={19} />
              <Text style={{ color: "#fff" }}>{item.averageReviews}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
    // </View>
  );
}
