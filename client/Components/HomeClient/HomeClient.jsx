import React, { useCallback, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Flex, Box, Text, IconButton, Wrap } from "@react-native-material/core";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import Icon2 from "@expo/vector-icons/FontAwesome5";
import { styles } from "./HomeClientStyle";
import PrimaryButton from "../General/PrimaryButton";
import {
  getAllNotif,
  getAllRequest,
  setSeenNotif,
} from "../../Redux/Action/generalActions";
import ActiveRequestCard from "../General/ActiveRequestCard";
import ModalPoup from "../General/Modal";

const HomeClient = ({ navigation }) => {
  const user = useSelector((state) => state.generalReducer.user);
  const requests = useSelector((state) => state.generalReducer.allRequests);
  const [activeRequests, setActiveRequests] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.generalReducer.notifications
  );
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllRequest("client", user.googleId));
      dispatch(getAllNotif(user.googleId));
    }, [])
  );

  const notSeenNotif = notifications.filter((n) => n.status === "not_seen");

  useFocusEffect(
    useCallback(() => {
      setIsRefreshing(false);
      if (requests.length > 0) {
        let aux = requests.filter((req) => {
          return req.status === "active";
        });
        setActiveRequests(aux);
      }
      setIsRefreshing(true);
    }, [requests])
  );

  const renderActiveCard = ({ item }) => {
    return <ActiveRequestCard request={item} navigation={navigation} />;
  };

  const handlePress = () => {
    dispatch(
      getUserReview({
        id: user.reviewsPending[0],
        user: user.googleId[0] === "c" ? "client" : "professional",
      })
    );
    navigation.navigate("Review");
  };

  return (
    <View style={{ flex: 1, width: "100%", backgroundColor: "pink" }}>
      <View></View>
      <View></View>
      <View style={{ flex: 1, width: "100%", backgroundColor: "blue" }}>
        <Flex inline justify="space-between">
          <Box style={{ marginTop: 70 }} m={30}>
            <Text variant="h6">Hola, {user.name}</Text>
            <Text>Cómo podemos ayudarte?</Text>
          </Box>
          <Box style={{ marginTop: 70 }} m={30}>
            <ModalPoup visible={visible}>
              <View style={{ alignItems: "center" }}>
                <View style={styles.header}>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);
                      dispatch(setSeenNotif(user.googleId));
                    }}
                  >
                    <Image
                      source={require("../../assets/x.png")}
                      style={{ height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                </View>
                {notSeenNotif.length ? (
                  <ScrollView>
                    {notSeenNotif &&
                      notSeenNotif.map((not) => (
                        <Text
                          style={{
                            marginVertical: 30,
                            fontSize: 20,
                            alignItems: "center",
                          }}
                        >
                          {not.title}
                        </Text>
                      ))}
                  </ScrollView>
                ) : (
                  <Text
                    style={{
                      marginVertical: 30,
                      fontSize: 20,
                      alignItems: "center",
                    }}
                  >
                    No tenes notificaciones
                  </Text>
                )}
              </View>
            </ModalPoup>

            <IconButton
              onPress={() => setVisible(true)}
              icon={(props) => <Icon name="notifications" {...props} />}
            />
          </Box>
        </Flex>
        <Flex style={styles.wrapper} center fill>
          {!user.reviewsPending.length ? (
            <View>
              <Wrap
                style={{
                  justifyContent: "space-evenly",
                  backgroundColor: "green",
                }}
                m={4}
              >
                <Box
                  ml={10}
                  w={180}
                  h={50}
                  style={{
                    backgroundColor: "#faf089",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Text>
                    Solicitudes activas:{" "}
                    {activeRequests && activeRequests.length}
                  </Text>
                </Box>
              </Wrap>
              <View style={styles.buttonContainer}>
                {!activeRequests.length ? (
                  <Text>No tenes solicitudes activas</Text>
                ) : (
                  <FlatList
                    style={{ width: "100%", backgroundColor: "cyan", flex: 1 }}
                    data={activeRequests}
                    extraData={isRefreshing}
                    renderItem={renderActiveCard}
                    keyExtractor={(item, index) => `activeReq-${index}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                )}
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("BudgetList", {
                        data: "pendingBudgets",
                      })
                    }
                    style={[styles.button, { width: "45%" }]}
                  >
                    <View>
                      <Text style={styles.textButton}>
                        Presupuestos recibidos
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("RequestList", {
                        data: "pendingRequest",
                      });
                    }}
                    style={[styles.button, { width: "45%" }]}
                  >
                    <View>
                      <Text style={styles.textButton}>
                        Solicitudes pendientes
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <PrimaryButton
                onPress={() => navigation.navigate("SolutionForm")}
                title="Necesito una solucion"
                trailing={(props) => <Icon2 name="house-damage" {...props} />}
              />
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <Text>FALTAN RESPONDER RESEÑAS</Text>
              <TouchableHighlight
                onPress={() => {
                  handlePress();
                }}
              >
                <Text>RESPONDER</Text>
              </TouchableHighlight>
            </View>
          )}
        </Flex>
      </View>
    </View>
  );
};

export default HomeClient;
