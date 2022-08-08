import { View, Text, TouchableHighlight } from "react-native";
import React from "react";

const BannedScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Estas baneado Kpo</Text>
      <TouchableHighlight onPress={() => navigation.navigate("SupportForm")}>
        <Text>Contactarse con soporte</Text>
      </TouchableHighlight>
    </View>
  );
};

export default BannedScreen;
