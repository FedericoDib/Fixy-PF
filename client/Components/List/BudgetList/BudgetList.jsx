import { View, FlatList, Text } from "react-native";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import React, { useState, useEffect, useCallback } from "react";
import style from "../ListStyle";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getAllBudgetsFromClient } from "../../../Redux/Action/clientActions";
import { getAllBudgetsFromProfessional } from "../../../Redux/Action/professionalActions";
import BudgetCard from "./BudgetCard";
import theme from "../../../theme/theme";

export default function BudgetList({ navigation, route }) {
  const user = useSelector((state) => state.generalReducer.user);
  let budgets = useSelector((state) => state.generalReducer.budgets);
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsRefreshing(false);
      if (user && user.googleId[0] === "c") {
        dispatch(getAllBudgetsFromClient(user.googleId));
      } else if (user && user.googleId[0] === "p") {
        dispatch(getAllBudgetsFromProfessional(user.googleId));
      }
      setIsRefreshing(true);
    }, [])
  );

  return (
    <View style={style.mainContainer}>
      <View style={{ flex: 6 }}>
        {budgets === undefined || !budgets.length ? (
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 28, color: theme.colors.threePalet.primary }}
            >
              No se encontraron presupuestos
            </Text>
          </View>
        ) : (
          <FlatList
            data={budgets.filter((b) => b.status === "pending")}
            extraData={isRefreshing}
            renderItem={({ item }) => (
              <BudgetCard item={item} navigation={navigation} />
            )}
          />
        )}
      </View>
    </View>
  );
}
