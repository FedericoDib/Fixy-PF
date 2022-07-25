import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";
import IconCalendar from "react-native-vector-icons/EvilIcons";
import IconPhone from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import style from "./ResumeStyle";

export default function Resume({ navigation }) {
  return (
    <ScrollView style={style.mainContainer}>
      <View style={style.calendarPhoneContainer}>
        <View style={style.calendarContainer}>
          <Text>15/09/2022</Text>
          <IconCalendar
            name="calendar"
            size={30}
            color="#1a57d2"
          ></IconCalendar>
        </View>
        <View style={style.phoneContainer}>
          <IconPhone
            onPress={() => {
              Alert.alert("Llamado");
            }}
            name="phone-call"
            size={30}
            color="green"
          ></IconPhone>
        </View>
      </View>
      <View style={style.textContainer}>
        <Text>Horario</Text>
        <View style={style.centerField}>
          <Text>09:30 hs</Text>
        </View>
      </View>

      <View style={style.textContainer}>
        <Text>Presupuesto Aproximado</Text>
      </View>
      <View style={style.endField}>
        <Text>$ 2.000</Text>
      </View>
      <View style={style.textContainer}>
        <Text>Metodo de pago</Text>
        <View style={style.centerField}>
          <Text>Paypal</Text>
        </View>
      </View>
      <View style={style.textContainer}>
        <Text>Descripcion del problema</Text>
        <View style={style.centerField}>
          <Text>
            Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
            en demostraciones de tipografías o de borradores de diseño para
            probar el diseño visual antes de insertar el texto final.
          </Text>
        </View>
      </View>
      <View style={style.textContainer}>
        <Text>Comentarios</Text>
        <View style={style.centerField}>
          <Text>
            Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
            en demostraciones de tipografías o de borradores de diseño para
            probar el diseño visual antes de insertar el texto final.
          </Text>
        </View>
      </View>
      <TouchableHighlight
        style={style.button}
        activeOpacity={0.6}
        underlayColor="#F9CE67"
        onPress={() => {
          navigation.navigate("HomeClient");
        }}
      >
        <View style={style.textButton}>
          <Text>Visita Finalizada</Text>
        </View>
      </TouchableHighlight>
    </ScrollView>
  );
}
