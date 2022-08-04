import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getBudgetDetail } from "../../Redux/Action/generalActions";

export default function Resume({ navigation, route }) {
  const dispatch = useDispatch();
  const budgetDetail = useSelector(
    (state) => state.generalReducer.budgetDetail
  );

  const item = route.params.item;

  useEffect(() => {
    dispatch(getBudgetDetail(item.id));
  }, [item]);

  return (
    <ScrollView style={style.mainContainer}>
      <View style={style.calendarPhoneContainer}>
        <View style={style.calendarContainer}>
          <Text>{item.date}</Text>
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
          <Text>{budgetDetail.turn}</Text>
        </View>
      </View>

      <View style={style.textContainer}>
        <Text>Presupuesto Aproximado</Text>
      </View>
      <View style={style.endField}>
        <Text>${budgetDetail.estimatedBudget}</Text>
      </View>
      <View style={style.textContainer}>
        <Text>Descripcion del problema</Text>
        <View style={style.centerField}>
          <Text>{item.description}</Text>
        </View>
      </View>
      <View style={style.textContainer}>
        <Text>Comentarios</Text>
        <View style={style.centerField}>
          <Text>{budgetDetail.description}</Text>
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
