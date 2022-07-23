import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function OnBoardingItem({ item }) {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.container, { width, height }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          style={[
            styles.btnNyP,
            {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#493d8a",
            },
          ]}
        >
          <Text style={{ color: "#493d8a", fontWeight: "bold", fontSize: 18 }}>
            Skip
          </Text>
        </TouchableOpacity>
        <View style={{ width: 20 }}></View>
        <TouchableOpacity style={styles.btnNyP}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 0.5,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 70,
    color: "#493d8a",
    textAlign: "center",
  },
  description: {
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 30,
    marginTop: 45,
    fontSize: 20,
    color: "#62656b",
  },
  btnNyP: {
    backgroundColor: "#493d8a",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    width: 100,
    alignItems: "center",
  },
});
