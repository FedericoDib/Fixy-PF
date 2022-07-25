import React from "react";
import { View, Text, TouchableOpacity, Image, Appearance } from "react-native";
import style from "./SelectionStyles";

export default function Selection({ navigation }) {
  const goToForm = () => {
    navigation.navigate("ClientSignUp");
  };
  return (
    <View style={style.mainContainer}>
      <View style={style.titleContainer}>
        <Text style={style.title}>Seleccione cómo desea registrarse</Text>
      </View>
      <View style={style.buttonsContainer}>
        <View>
          <TouchableOpacity style={style.button} onPress={goToForm}>
            <Text style={style.text}>Cliente</Text>
            <View>
              <Image
                source={require("../../assets/clientSelect.png")}
                style={{
                  width: 200,
                  height: 200,
                  margin: 10,
                  borderRadius: 15,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={style.button}>
          <Text style={style.text}>Profesional</Text>
          <View>
            <Image
              style={{ width: 200, height: 200, margin: 10, borderRadius: 15 }}
              source={require("../../assets/profesionalSelect.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
