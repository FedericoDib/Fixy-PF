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
} from "../../Redux/Action/generalActions";

import styles from "./CardListStyle";
// import { professionals, user } from "./Hardcode";
import theme from "../../theme/theme";

let rating;
export default function ClientCard({ item, navigation, route, status }) {
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

  // closeInstantly = () => {
  //     const { dragX, rowTranslation } = this.state;
  //     dragX.setValue(0);
  //     rowTranslation.setValue(0);
  //     this.setState({ rowState: Math.sign(0) });
  // };
  
  return (
    // <View style={styles.background}>
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
              { status ? (<Text style={styles.textProfession}>{item.address}</Text>) : null}
            </View>
            <View style={styles.reviewContainer}>
              <IconStart name="star" color="#E1C85A" size={19} />
              <Text style={{ color: "#fff" }}>{item.averageReviews}</Text>
            </View>
          </View>
        </TouchableHighlight>
  );
}
