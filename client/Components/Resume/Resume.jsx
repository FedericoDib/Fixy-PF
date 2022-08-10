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

let averageRating;
export default function Resume({ navigation, route }) {
  const user = useSelector((state) => state.generalReducer.user);
  const detail = useSelector((state) => state.generalReducer.userDetail);
  const dispatch = useDispatch();
  const budgetDetail = useSelector(
    (state) => state.generalReducer.budgetDetail
  );

  console.log("resume", detail);

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
    averageRating = 1;
  }

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
    <ScrollView style={style.mainContainer}>
      <TouchableHighlight
        style={{ marginBottom: 15 }}
        activeOpacity={0.9}
        underlayColor="white"
        onPress={() =>
          navigation.navigate("ProfileDetail", {
            averageReviews: averageRating,
            button: "false",
          })
        }
      >
        <View style={style.cardContainer}>
          <View style={style.imageContainer}>
            {/* <Icon name="user" color="black" size={40} /> */}
            <Image
              style={{ borderRadius: 100 }}
              source={{
                uri: detail.perfilPic,
                width: 65,
                height: 65,
              }}
            />
          </View>
          <View style={style.textCardContainer}>
            <View style={style.nameAndReviewContainer}>
              <Text style={style.textName}>{detail.name}</Text>
              <View style={style.reviewContainer}>
                <IconStart name="star" color="#E1C85A" size={19} />
                <Text style={style.textName}>
                  {averageRating && averageRating}
                </Text>
              </View>
            </View>
            <Text style={style.textProfession}>{detail.address}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
          <IconWhatsapp
            onPress={() => {
              handleWhatsapp();
            }}
            name="whatsapp"
            size={30}
            color="green"
          ></IconWhatsapp>
          <IconGmail
            onPress={() => {
              handleEmail();
            }}
            name="gmail"
            size={30}
            color="red"
          ></IconGmail>
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
      {user && user.googleId[0] === "c" ? (
        <Text>
          Brindale al profesional el siguiente codigo para finalizar la visita:{" "}
          {budgetDetail.validationCode}
        </Text>
      ) : (
        <View>
          <Text>Ingresa el codigo de validacion: </Text>
          <TextInput onChangeText={(text) => setCode(text)} />
          <TouchableHighlight
            style={style.button}
            activeOpacity={0.6}
            underlayColor="#F9CE67"
            onPress={() => handlePress()}
          >
            <View style={style.textButton}>
              <Text>Visita Finalizada</Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </ScrollView>
  );
}
