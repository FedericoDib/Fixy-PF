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
} from "../../../Redux/Action/clientActions";
import styles from "../CardListStyle";
// import { professionals, user } from "./Hardcode";

let rating;
export default function ProfessionalCard({ item, navigation, route }) {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(userDetail(item.googleId, "professional"));
    setTimeout(() => {
      navigation.navigate("ProfileDetail", {
        averageReviews: item.averageReviews,
      });
    }, 1000);
  };

  return (
    <View>
      <TouchableHighlight
        activeOpacity={0.9}
        underlayColor="white"
        onPress={() => onPress()}
      >
        <React.Fragment>
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <Icon name="user" color="black" size={40} />
              {/* <Image
        source={item.image}
    /> */}
            </View>
            <View style={styles.textContainer}>
              <View style={styles.nameAndReviewContainer}>
                <Text style={styles.textName}>{item.name}</Text>
                <View style={styles.reviewContainer}>
                  <IconStart name="star" color="#E1C85A" size={19} />
                  <Text style={styles.textName}>{item.averageReviews}</Text>
                </View>
              </View>
              <Text style={styles.textProfession}>{item.profession}</Text>
            </View>
          </View>
        </React.Fragment>
      </TouchableHighlight>
    </View>
  );
}
