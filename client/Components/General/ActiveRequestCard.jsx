import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React from "react";

const ActiveRequestCard = ({ request, navigation }) => {
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate("Resume", { item: request })}
    >
      <View style={styles.container}>
        <Text>{request.affair}</Text>
        <Text>HORA</Text>
        <Text>{request.date}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ActiveRequestCard;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 150,
    backgroundColor: "red",
    margin: 10,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
