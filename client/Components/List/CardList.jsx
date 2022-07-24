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
import styles from "./CardListStyle";

export default function CardList({ item, navigation }) {
  return (
    <ScrollView>
      <TouchableHighlight
        activeOpacity={0.9}
        underlayColor="white"
        onPress={() => navigation.navigate("Resume")}
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
                <Text style={styles.textName}>{item.reviews[0].rating}</Text>
              </View>
            </View>
            <Text style={styles.textProfession}>{item.profession}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </ScrollView>
  );
}
