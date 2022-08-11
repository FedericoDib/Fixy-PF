import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Linking from "expo-linking";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Alert,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import IconCalendar from "react-native-vector-icons/EvilIcons";
import IconGmail from "react-native-vector-icons/MaterialCommunityIcons";
import IconWhatsapp from "react-native-vector-icons/FontAwesome";
import style from "./ResumeStyle";
import {
  getBudgetDetail,
  setBudgetAndRequestComplete,
  userDetail,
} from "../../Redux/Action/generalActions";
import IconStart from "react-native-vector-icons/Foundation";
import Card from "../List/ClientCard";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme/theme";

let averageRating;
export default function Resume({ navigation, route }) {
  const user = useSelector((state) => state.generalReducer.user);
  const detail = useSelector((state) => state.generalReducer.userDetail);
  const dispatch = useDispatch();
  const budgetDetail = useSelector(
    (state) => state.generalReducer.budgetDetail
  );

  const item = route.params.item;
  const [code, setCode] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  if (detail.reviews && detail.reviews.length) {
    averageRating = detail.reviews.map((e) => e.rating);
    averageRating = (
      averageRating.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      ) / averageRating.length
    ).toFixed(1);
  } else {
    averageRating = 3;
  }
  let date;
      if (item.date.length < 9) {
        date = "20" + item.date.split("/").reverse().join("-");
      } else {
        date = item.date.slice(0, 10);
      }
  detail.averageReviews = averageRating;

  useEffect(() => {
    dispatch(getBudgetDetail(item.id));
  }, [item]);

  useFocusEffect(
    useCallback(() => {
      user.googleId[0] === "p"
        ? dispatch(userDetail(item.clientId, "client"))
        : dispatch(userDetail(budgetDetail.professionalId, "professional"));
    }, [refreshing])
  );

  useFocusEffect(
    useCallback(() => {
      refreshing ? null : setRefreshing(true);
    }, [detail])
  );

  const handlePress = () => {
    if (code == budgetDetail.validationCode) {
      dispatch(setBudgetAndRequestComplete(budgetDetail.id));
      dispatch(userDetail(budgetDetail.clientId, "client"));
      navigation.navigate("Review");
    } else {
      Alert.alert("El codigo de validacion no es valido");
    }
  };

  const handleWhatsapp = async () => {
    await Linking.openURL("https://wa.me/" + detail.phoneNumber);
  };

  const handleEmail = async () => {
    await Linking.openURL(
      `mailto:${detail.email}?subject=FIXY:%20${item.affair}&body=${budgetDetail.description}`
    );
  };

  return (
    <ScrollView>
    <View style={style.mainContainer}>
      <View style={style.container}>
        <View style={style.titleContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ paddingVertical: 5, marginBottom: 10}}
          >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.threePalet.primary}
          />
        </Pressable>
        <Text style={style.mainTitle}>DETALLE DE VISITA</Text>
      </View>
      <Card item={detail} status={true} navigation={navigation}></Card>
      <View style={style.calendarPhoneContainer}>
        <View style={style.calendarContainer}>
          <IconCalendar
            name="calendar"
            size={35}
            color={theme.colors.threePalet.primary}
          ></IconCalendar>
          <Text style={{fontSize: 18, marginLeft: 10}}>{date}</Text>
        </View>
        <View style={style.phoneContainer}>
          <IconWhatsapp style={{marginRight: 10}}
            onPress={() => {
              handleWhatsapp();
            }}
            name="whatsapp"
            size={40}
            color={theme.colors.threePalet.primary}
          ></IconWhatsapp>
          <IconGmail style={{marginRight: 10}}
            onPress={() => {
              handleEmail();
            }}
            name="gmail"
            size={40}
            color={theme.colors.threePalet.primary}
          ></IconGmail>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={style.label}>Asunto:</Text>
      </View>
      <View style={style.centerField}>
        <Text style={style.desc}>{item.affair}</Text>
      </View>
      <View>
        <Text style={style.label}>Horario:</Text>
      </View>
      <View style={style.centerField}>
        <Text style={style.desc}>{budgetDetail.turn}</Text>
      </View>
      <View>
        <Text style={style.label}>Presupuesto aproximado:</Text>
      </View>
      <View style={style.centerField}>
        <Text style={style.desc}>{budgetDetail.estimatedBudget}</Text>
      </View>
      <View>
        <Text style={style.label}>Descripcion del problema:</Text>
      </View>
      <View style={style.centerField}>
        <Text style={style.desc}>{item.description}</Text>
      </View>
      <View>
        <Text style={style.label}>Comentarios del profesional:</Text>
      </View>
      <View style={style.centerField}>
        <Text style={style.desc}>{budgetDetail.description}</Text>
      </View>
      {user && user.googleId[0] === "c" ? (
        <Text style={style.label}>
          Brindale al profesional el siguiente código para finalizar la visita:{" "}
          {budgetDetail.validationCode}
        </Text>
      ) : (
        <View>
          <Text style={style.label}>Ingresa el código de validacion: </Text>
          <TextInput maxLength={4} style={style.code} onChangeText={(text) => setCode(text)} />
          <TouchableHighlight
            style={style.button}
            activeOpacity={0.6}
            underlayColor="#F9CE67"
            onPress={() => handlePress()}
          >
            <View style={style.textButton}>
              <Text style={style.text}>Visita Finalizada</Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </View>
    </View>
    </ScrollView>
  );
}
