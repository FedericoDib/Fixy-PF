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
import { AntDesign } from "@expo/vector-icons";
import {
  getAllRequest,
  getUserReview,
  getNotSeenNotif,
  getAllNotif,
  setSeenNotif,
} from "../../Redux/Action/generalActions";
import ActiveRequestCard from "../General/ActiveRequestCard";
import ModalPoup from "../General/Modal";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../../theme/theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const [notSeenNotif,setNotSeenNotif] = useState([]);
  

  const [visible, setVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  console.log(visible);

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllRequest("professional", user.googleId));
      dispatch(getAllNotif("professional",user.googleId));
    }, [])
  );

  //Setea en estado local las notificaciones no vistas por el cliente
  useFocusEffect(
    useCallback(() => {
    if (Array.isArray(notifications)) 
    {const notSeen = notifications.filter((n) => n.status === "not_seen" && n.user === "professional")
      setNotSeenNotif(notSeen);
  }
  },[notifications])
  );
  

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
    <View style={styles.container}>
      <View style={styles.background1}></View>
      <View style={styles.background2}></View>
      <View style={styles.mainWrapper}>
        <View
          style={{
            //backgroundColor: 'pink',
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "70%",
              height: 100,
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 200,
                marginRight: 10,
                borderWidth: 2,
                borderColor: "#F2C677",
              }}
              source={{
                uri: user.perfilPic
                  ? `${user.perfilPic}`
                  : "https://i.pinimg.com/originals/b8/08/07/b8080715de29eabbbba78c1b2c9d70be.png",
              }}
            />
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 18, color: "#f1f1f1", fontWeight: "600" }}
                >
                  Hola,
                </Text>
                <Text
                  style={{ fontSize: 20, color: "#F2C677", fontWeight: "bold" }}
                >{` ${user.name}`}</Text>
              </View>
              <Text
                style={{ fontSize: 16, color: "#f1f1f1", fontWeight: "400" }}
              >
                Cómo podemos ayudarte?
              </Text>
            </View>
          </View>
          <Box>
            <ModalPoup visible={visible}>
              <View
                style={{
                  alignItems: "center",

                  width: "100%",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);
                      dispatch(setSeenNotif("professional",user.googleId));
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 2,
                        borderColor: "#493d8a",
                        borderRadius: 200,
                        paddingHorizontal: 7,
                        paddingVertical: 2,
                      }}
                    >
                      <Text
                        source={require("../../assets/x.png")}
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "#493d8a",
                        }}
                      >
                        X
                      </Text>
                    </View>
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
                            color: "#493d8a",
                            fontWeight: "600",
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
                      color: "#493d8a",
                      fontWeight: "600",
                    }}
                  >
                    No tenes notificaciones
                  </Text>
                )}
              </View>
            </ModalPoup>
            <TouchableHighlight onPress={() => setVisible(true)}>
              <View
                style={{
                  position: "relative",
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    borderRadius: 100,
                    // display: notSeenNotif.length ? "inline" : "none",
                  }}
                ></View>
                <Icon
                  style={{
                    color: "#F2C677",
                    fontSize: 30,
                  }}
                  name="notifications"
                />
                <View>
                 { notSeenNotif.length !== 0? 
                  <View
                  style={{
                    position:"absolute",
                    bottom:17,
                    right:7,
                    borderRadius:90,
                    backgroundColor:"white",
                    height:10,
                    width:10,
                    
                  }}
                  >
                  </View>
                  : <View></View>
                } 
                  <MaterialCommunityIcons 
                  name={notSeenNotif && notSeenNotif.length !== 0 ? `numeric-${notSeenNotif.length}-circle` : ""} 
                  size={20} 
                  color="red"
                  
                  style={{
                    position:"absolute",
                    bottom:13,
                    right:1,
                    
                    height:20,
                    width:20,
                    
                  }}
                  />
                </View>
              </View>
            </TouchableHighlight>
          </Box>
        </View>
        <Flex style={styles.wrapper} center fill>
          {!user.reviewsPending.length ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Wrap
                style={{
                  justifyContent: "space-evenly",
                }}
                m={4}
              >
                <Box
                  ml={10}
                  w={180}
                  h={50}
                  style={{
                    backgroundColor: theme.colors.threePalet.secondary,
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
                  <View
                    style={[
                      {
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width: 300,
                        height: 150,
                        backgroundColor: "#f1f1f1",
                        borderRadius: 14,
                        marginHorizontal: 50,
                        marginVertical: 10,
                      },
                      { ...theme.shadows.dark },
                    ]}
                  >
                    <AntDesign
                      name="checkcircleo"
                      size={50}
                      color={theme.colors.threePalet.primary}
                    />
                    <Text style={{ fontSize: 18 }}>
                      No tenes solicitudes activas
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    // style={{ width: "100%" }}
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
                      navigation.navigate("BudgetList", { data: "sendBudgets" })
                    }
                    style={[
                      styles.button,
                      { width: "40%", ...theme.shadows.dark },
                    ]}
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
                    style={[
                      styles.button,
                      { width: "40%", ...theme.shadows.dark },
                    ]}
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
            <View style={styles.pendingReviews}>
              <FontAwesome5 name="house-damage" size={100} color="#f1f1f1" />
              <Text>FALTAN RESPONDER RESEÑAS</Text>
              <TouchableHighlight
                onPress={() => {
                  handlePress();
                }}
              >
                <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                  RESPONDER
                </Text>
              </TouchableHighlight>
            </View>
          )}
        </Flex>
      </View>
    </View>
  );
};

export default HomeProfessional;
