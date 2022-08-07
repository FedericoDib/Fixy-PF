import React, { useCallback, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Flex, Box, Text, IconButton, Wrap } from "@react-native-material/core";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import Icon2 from "@expo/vector-icons/FontAwesome5";
import { styles } from "./HomeProfessionalStyles";
import PrimaryButton from "../General/PrimaryButton";
import {
  getAllRequest,
  getUserReview,
  getNotSeenNotif,
  getAllNotif,
  setSeenNotif,
} from "../../Redux/Action/generalActions";
import ActiveRequestCard from "../General/ActiveRequestCard";
import ModalPoup from "../General/Modal";

// const ModalPoup = ({ visible, children }) => {
//   const [showModal, setShowModal] = React.useState(visible);
//   const scaleValue = React.useRef(new Animated.Value(0)).current;
//   React.useEffect(() => {
//     toggleModal();
//   }, [visible]);
//   const toggleModal = () => {
//     if (visible) {
//       setShowModal(true);
//       Animated.spring(scaleValue, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       setTimeout(() => setShowModal(false), 200);
//       Animated.timing(scaleValue, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   };
//   return (
//     <Modal transparent visible={showModal}>
//       <View style={styles.modalBackGround}>
//         <Animated.View
//           style={[
//             styles.modalContainer,
//             { transform: [{ scale: scaleValue }] },
//           ]}
//         >
//           {children}
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

const HomeProfessional = ({ navigation }) => {
  const user = useSelector((state) => state.generalReducer.user);
  const requests = useSelector((state) => state.generalReducer.allRequests);
  const [activeRequests, setActiveRequests] = useState([]);
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.generalReducer.notifications
  );
  // console.log(user);

  const [visible, setVisible] = useState(false);

  console.log(visible);

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllRequest("professional", user.googleId));
      dispatch(getAllNotif(user.googleId));
    }, [])
  );

  const notSeenNotif = notifications.filter((n) => n.status === "not_seen");

  console.log("NOTIFICACIONES", notifications);

  useFocusEffect(
    useCallback(() => {
      if (requests.length > 0) {
        let aux = requests.filter((req) => {
          return req.status === "active";
        });
        setActiveRequests(aux);
      }
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
                <FlatList
                  style={{ width: "100%", backgroundColor: "cyan", flex: 1 }}
                  data={activeRequests}
                  renderItem={renderActiveCard}
                  keyExtractor={(item, index) => `activeReq-${index}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("BudgetList", { data: "sendBudgets" })
                    }
                    style={[styles.button, { width: "45%" }]}
                  >
                    <View>
                      <Text style={styles.textButton}>
                        Presupuestos enviados
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("RequestList", {
                        data: "pendingRequests",
                      });
                    }}
                    style={[styles.button, { width: "45%" }]}
                  >
                    <View>
                      <Text style={styles.textButton}>
                        Solicitudes recibidas
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
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

export default HomeProfessional;
