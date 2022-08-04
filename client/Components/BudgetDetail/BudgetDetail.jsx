import React from "react";
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
import style from "./BudgetDetailStyle";
import PrimaryButton from "../General/PrimaryButton";
import { rejectBudgetClient } from "../../Redux/Action/clientActions";

export default function BudgetDetail({ navigation, route }) {
  const dispatch = useDispatch();
const {buttons} = route.params
  const budgetDetail = useSelector((state) => state.generalReducer.budgetDetail);

  return (
    <View style={style.mainContainer}>
      <View style={style.restContainer}>
        <View style={style.textContainer}>
          <Text>Presupuesto Aproximado</Text>
        </View>
        <View style={style.endField}>
          <Text>{budgetDetail.estimatedBudget}</Text>
        </View>
        <View style={style.textContainer}>
          <Text>Comentarios</Text>
          <View style={style.centerField}>
            <Text>{budgetDetail.description}</Text>
          </View>
        </View>
        <View style={style.textContainer}>
          <Text>Precio de la visita</Text>
        </View>
        <View style={style.endField}>
          <Text>$ {budgetDetail.price}</Text>
        </View>
      </View>
      <View style={style.buttonContainer}>
        <View style={{ flex: 1 }}>
          {buttons&& (
            <PrimaryButton
              onPress={() =>
                navigation.navigate("Paypal", { price: budgetDetail.price })
              }
              title="Aceptar"
              trailing={(props) => <Icon2 name="house-damage" {...props} />}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          {buttons(
            <PrimaryButton
              onPress={() => {
                navigation.navigate("HomeClient");
                dispatch(
                  rejectBudgetClient({
                    clientId: user.googleId,
                    budgetId: budgetDetail.id,
                  })
                );
              }}
              title="Rechazar"
              trailing={(props) => <Icon2 name="house-damage" {...props} />}
            />
          )}
        </View>
      </View>
    </View>
  );
}
