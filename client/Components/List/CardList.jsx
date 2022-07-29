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
import { requestToProfessional } from "../../Redux/Action";
import styles from "./CardListStyle";

export default function CardList({ item, navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const request = useSelector((state) => state.request);
  const professionals = useSelector((state) => state.professionals);

  console.log("ITEM", item);

  if (user.googleId[0] === "c") {
    if (professionals.length) {
      let rating = item.reviews.map((e) => e.rating);
      rating =
        rating.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        ) / item.reviews.length;
    }
  }

  const handleSubmit = () => {
    dispatch(
      requestToProfessional({ googleId: item.googleId, idRequest: request.id })
    );
  };

  return (
    <ScrollView>
      {user.googleId[0] === "c" ? (
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="white"
          onPress={() => handleSubmit()}
        >
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
                  <Text style={styles.textName}>{item.rating}</Text>
                </View>
              </View>
              <Text style={styles.textProfession}>{item.profession}</Text>
            </View>
          </View>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="white"
          onPress={() => navigation.navigate("Resume")}
        >
          <View style={styles.cardContainer}>
            <View style={styles.textContainer}>
              <View style={styles.nameAndReviewContainer}>
                <Text style={styles.textName}>
                  {item.affair.length < 20
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
