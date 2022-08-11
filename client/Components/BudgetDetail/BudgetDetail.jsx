import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Alert,
  ScrollView,
  Pressable,
  ViewBase,
} from "react-native";
import IconCalendar from "react-native-vector-icons/EvilIcons";
import IconPhone from "react-native-vector-icons/Feather";
import style from "./BudgetDetailStyle";
import PrimaryButton from "../General/PrimaryButton";
import {
  rejectBudgetClient,
  cleanBudgets,
} from "../../Redux/Action/clientActions";
import { deleteBudget } from "../../Redux/Action/professionalActions";
import { userDetail } from "../../Redux/Action/generalActions";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme/theme";

import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import Card from "../List/ClientCard";

let averageRating;
export default function BudgetDetail({ navigation, route }) {
  const user = useSelector((state) => state.generalReducer.user);
  const dispatch = useDispatch();
  const { buttons } = route.params;
  const budgetDetail = useSelector(
    (state) => state.generalReducer.budgetDetail
  );
  const professional = useSelector((state) => state.generalReducer.userDetail);
  if (professional.reviews && professional.reviews.length) {
    averageRating = professional.reviews.map((e) => e.rating);
    averageRating = (
      averageRating.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      ) / averageRating.length
    ).toFixed(1);
  } else {
    averageRating = 3;
  }

  professional.averageReviews = averageRating;

  useFocusEffect(
    useCallback(() => {
      dispatch(userDetail(budgetDetail.professionalId, "professional"));
      dispatch(userDetail(budgetDetail.professionalId, "professional"));
    }, [])
  );

  return (
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
              <Text style={style.mainTitle}>DETALLE DE PRESUPUESTO</Text>
            </View>
              <Card item={professional} navigation={navigation}></Card>
              <View style={{marginTop: 10}}>
                <Text style={style.label}>Precio de la visita</Text>
              </View>
              <View style={style.centerField}>
                <Text style={style.desc}>$ {budgetDetail.price}</Text>
              </View>
              <View style={style.textContainer}>
                <Text style={style.label}>Comentarios</Text>
                <View style={style.centerField}>
                  <Text style={style.desc}>{budgetDetail.description}</Text>
                </View>
              </View>
              <View>
                <Text style={style.label}>Presupuesto Aproximado</Text>
              </View>
              <View style={style.centerField}>
                <Text style={style.desc}>{budgetDetail.estimatedBudget}</Text>
              </View>
              <View>
                <Text style={style.label}>Horario:</Text>
              </View>
              <View style={style.centerField}>
                <Text style={style.desc}>{budgetDetail.turn}</Text>
              </View>
            
            <View style={style.buttonContainer}>
              <View>
                {buttons === "false" && (
                  <TouchableHighlight
                    onPress={() => {
                      dispatch(deleteBudget(budgetDetail.id));
                      navigation.goBack();
                    }}
                  ><><Text style={style.text}>Rechazar</Text><Icon2 style={{color: "#fff", fontSize: 18}} name="close" /></></TouchableHighlight>
                )}
              </View>
              <View>
                {buttons === "true" && (
                  <TouchableHighlight
                    style={style.button}
                    onPress={() =>
                      navigation.navigate("Paypal", {
                        price: budgetDetail.price,
                      })
                    }
                  ><><Text style={style.text}>Aceptar</Text><Icon style={{color: "#fff", fontSize: 18}} name="check-circle" /></></TouchableHighlight>
                )}
              </View>
              <View>
                {buttons === "true" && (
                  <TouchableHighlight
                    style={style.button}
                    onPress={() => {
                      dispatch(
                        rejectBudgetClient({
                          clientId: user.googleId,
                          budgetId: budgetDetail.id,
                        })
                      );

                      navigation.popToTop();
                    }}
                  ><><Text style={style.text}>Rechazar</Text><Icon2 style={{color: "#fff", fontSize: 18}} name="close" /></></TouchableHighlight>
                )}
              </View>
            </View>
          </View>
    </View>
  );
}
