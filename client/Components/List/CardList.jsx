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
  getAllClients,
  getRequestDetail,
  requestToProfessional,
  averageReview,
  countAddition,
  userDetail,
} from "../../Redux/Action";
import styles from "./CardListStyle";
// import { professionals, user } from "./Hardcode";

let rating;
export default function CardList({ item, navigation, route }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const request = useSelector((state) => state.request);
  const order = useSelector((state) => state.order);
  const count = useSelector((state) => state.count);
  const professionals = useSelector((state) => state.professionals);
  const averageReviews = useSelector((state) => state.averageReviews);
  // console.log("ITEMmmmmmmmmmmmmmmmmmm", item);
  // console.log("user", user);
  if (user.googleId[0] === "c") {
    if (item.reviews) {
      rating = item.reviews.map((e) => e.rating);
      // console.log("ratinggggg en el iffffffff", rating);
      rating = rating.filter((e) => e !== undefined);

      rating = rating.length
        ? rating.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          ) / item.reviews.length
        : 1;
      console.log("ratingggggggg antes del dispatch", rating);
      console.log("countttttttttttt", count);
      if (count < professionals.length) {
        console.log("ratingggggggggg", rating);
        dispatch(averageReview({ count, rating }));
        dispatch(countAddition());
        // console.log("order", order);
        // console.log(count);
      } else if (count === professionals.length) {
        let prof = [];
        for (let i = 0; i < professionals.length; i++) {
          prof = professionals[i].averageReview = averageReviews[i];
        }
      }
    }
  }
  // console.log("card list");
  //console.log("item hdp", item);
  const handleSubmit = () => {
    if (user.googleId.includes("c")) {
      dispatch(userDetail(item.googleId, "professional"));
      navigation.navigate("ProfileDetail");
    } else {
      dispatch(getRequestDetail(item.id));
      dispatch(getAllClients(item.clientId));
      route === "pending"
        ? navigation.navigate("RequestDetail")
        : navigation.navigate("Resume", { item: item });
    }
  };

  return (
    <ScrollView>
      {user.googleId[0] === "c" ? (
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="white"
          onPress={() => handleSubmit()}
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
                    <Text style={styles.textName}>{rating}</Text>
                  </View>
                </View>
                <Text style={styles.textProfession}>{item.profession}</Text>
              </View>
            </View>
          </React.Fragment>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="white"
          onPress={() => handleSubmit()}
        >
          <View style={styles.cardContainer}>
            <View style={styles.textContainer}>
              <View style={styles.nameAndReviewContainer}>
                <Text style={styles.textName}>
                  {item.affair && item.affair.length < 20
                    ? `${item.affair}`
                    : `${item.affair.slice(0, 20)} ...`}
                </Text>
                <Text style={styles.textName}>{item.date}</Text>
              </View>
              <View style={styles.nameAndReviewContainer}>
                {/* <Text style={styles.textProfession}>{item.client.name}</Text> */}
                <Text style={styles.textName}>{item.address}</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      )}
    </ScrollView>
  );
}
