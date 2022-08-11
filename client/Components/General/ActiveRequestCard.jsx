import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialIcons";
import theme from "../../theme/theme";

const ActiveRequestCard = ({ request, navigation }) => {
  return (
    <TouchableHighlight
      style={{ height: 180 }}
      onPress={() => navigation.navigate("Resume", { item: request })}
    >
      <View style={[styles.container, { ...theme.shadows.dark }]}>
        <View>
          <Icon2
            name={
              request.category === "electricista"
                ? "lightning-bolt-circle"
                : request.category === "gasista"
                ? "gas-cylinder"
                : request.category === "plomero"
                ? "water-pump"
                : "account"
            }
            color={theme.colors.threePalet.secondary}
            size={60}
          />
        </View>
        <View>
          <Text numberOfLines={1} style={styles.affair}>
            {request.affair}
          </Text>
          <Text style={styles.turn}>{request.budget[0].turn}</Text>
          <Text style={styles.date}>{request.date && request.date.length < 9
                      ? "20" + request.date.split("/").reverse().join("-")
                      : request.date && request.date.slice(0, 10)}</Text>
          
        </View>
        <View>
          <Icon name="keyboard-arrow-right" color={"#010101"} size={30} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ActiveRequestCard;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 150,
    backgroundColor: "#f1f1f1",
    margin: 10,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  affair: {
    textTransform: "uppercase",
    color: theme.colors.threePalet.primary,
    fontWeight: "800",
    fontSize: 20,
  },
});
