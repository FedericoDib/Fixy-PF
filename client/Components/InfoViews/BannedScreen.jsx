import { View, Text, TouchableHighlight, Image } from "react-native";
import React from "react";
import theme from "../../theme/theme";
import BannedUser from "../../assets/noProblemHome.png"

const BannedScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.threePalet.primary, justifyContent: "center", alignItems: "center"}}>
      <Text style={{fontSize: 40, textAlign: "center", color: "#fff"}}>Lo sentimos!</Text>
      <Text style={{fontSize: 40, textAlign: "center", color: "#fff", marginBottom: 30}}>Tu usuario ha sido deshabilitado</Text>
      <Image source={BannedUser} style={{width: "40%", height: "40%", marginBottom: 30}}/>
      <TouchableHighlight onPress={() => navigation.navigate("SupportForm")}>
        <Text style={{fontSize: 20, padding: 30, textAlign: "center", color: theme.colors.threePalet.primary, backgroundColor: "#fff", borderRadius: 15, fontWeight: "800"}}>CONTACTARSE CON SOPORTE</Text>
      </TouchableHighlight>
    </View>
  );
};

export default BannedScreen;
