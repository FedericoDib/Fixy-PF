import { View, FlatList, Text } from "react-native";

import React, { useState, useEffect, useCallback } from "react";
import style from "../ListStyle";
import { useSelector, useDispatch } from "react-redux";
import { getAllRequest } from "../../../Redux/Action/generalActions";
import RequestCard from "./RequestCard";
import { useFocusEffect } from "@react-navigation/native";
import theme from "../../../theme/theme";

export default function RequestList({ navigation, route }) {
  const requests = useSelector((state) => state.generalReducer.allRequests);
  const user = useSelector((state) => state.generalReducer.user);
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsRefreshing(false);
      if (user && user.googleId[0] === "c") {
        dispatch(getAllRequest("client", user.googleId));
      } else if (user && user.googleId[0] === "p") {
        dispatch(getAllRequest("professional", user.googleId));
      }
      setIsRefreshing(true);
    }, [])
  );

  return (
    <View style={style.mainContainer}>
      <View style={{ flex: 6 }}>
        {!requests.length ? (
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
              No se encontraron solicitudes
            </Text>
          </View>
        ) : (
          <FlatList
            data={requests.filter((req) => req.status === "pending")}
            extraData={isRefreshing}
            renderItem={({ item }) => (
              <RequestCard item={item} navigation={navigation} />
            )}
          />
        )}
      </View>
    </View>
  );
}
