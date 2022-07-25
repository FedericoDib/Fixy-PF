import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import theme from "../../theme/theme";

export default function OnBoardingItem({ item }) {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.description}>{item.description}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "transparent",
    backgroundColor: "#D6D4D8",
    height: 800,
    marginBottom: 200,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 60,
    color: "#493d8a",
    textAlign: "center",
  },
  description: {
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 30,
    marginTop: 45,
    fontSize: 20,
    color: theme.colors.threePalet.primary,
    backgroundColor: "#D6D4D8",
  },
});
