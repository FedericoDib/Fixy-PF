import React, { useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    Alert,
    ScrollView,
    FlatList,
} from "react-native";
import style from "./RequestDetailStyle";
import Icon from "react-native-vector-icons/Entypo";
import IconStart from "react-native-vector-icons/Foundation";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
    getRequestDetail,
    userDetail,
} from "../../Redux/Action/generalActions";
import { deleteRequest } from "../../Redux/Action/clientActions";

let averageRating;
export default function RequestDetail({ navigation, route }) {
    const dispatch = useDispatch();
    const client = useSelector((state) => state.generalReducer.userDetail);
    const user = useSelector((state) => state.generalReducer.user);
    const requestDetail = useSelector(
        (state) => state.generalReducer.requestDetail
    );
    const { item, buttons } = route.params;

    if (client.reviews && client.reviews.length) {
        averageRating = client.reviews.map((e) => e.rating);
        averageRating = (
            averageRating.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            ) / averageRating.length
        ).toFixed(1);
    } else {
        averageRating = 1;
    }

    useFocusEffect(
        useCallback(() => {
            dispatch(getRequestDetail(item.id));
        }, [])
    );

    //   const request = {
    //     id: "fe5398dc-666b-4fa3-a970-a1c6775e716d",
    //     affair: "exploto el foco",
    //     date: "26/07/2022",
    //     description: "prendi la luz y exploto",
    //     status: "pending",
    //     budget: null,
    //     clientId: "3",
    //     availableTime: "10:00 - 12:00",
    //     photo: [
    //       "https://loremflickr.com/320/240",
    //       "https://loremflickr.com/320/240",
    //       "https://loremflickr.com/320/240",
    //       "https://loremflickr.com/320/240",
    //       "https://loremflickr.com/320/240",
    //       "https://loremflickr.com/320/240",
    //     ],
    //     client: {
    //       googleId: "3",
    //       expoToken: "1",
    //       isRegistered: null,
    //       firstLogin: true,
    //       email: "jose@fixy.com",
    //       name: "Maximiliano Silva",
    //       phoneNumber: "1142451823",
    //       perfilPic: "unafoto",
    //       province: "cordoba",
    //       city: "berazategui",
    //       address: "Guemes 1234",
    //       reviews: [
    //         {
    //           rating: 5,
    //         },
    //       ],
    //     },
    //   };
    const handleSubmit = () => {
        if (user && user.googleId[0] === "p") {
            dispatch(userDetail(item.clientId, "client"));
            navigation.navigate("ProfileDetail", { averageReviews: "1" });
        }
    };

    const profileCard = (item) => {
        return (
            <TouchableHighlight
                activeOpacity={0.9}
                underlayColor="white"
                onPress={() => handleSubmit()}
            >
                <View style={style.cardContainer}>
                    <View style={style.imageContainer}>
                        <Icon name="user" color="black" size={40} />
                        <Image source={item.perfilPic} />
                    </View>
                    <View style={style.textContainer}>
                        <View style={style.nameAndReviewContainer}>
                            <Text style={style.textName}>{item.name}</Text>
                            <View style={style.reviewContainer}>
                                <IconStart
                                    name="star"
                                    color="#E1C85A"
                                    size={19}
                                />
                                <Text style={style.textName}>
                                    {averageRating}
                                </Text>
                            </View>
                        </View>
                        <Text style={style.textProfession}>{item.address}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
    console.log("UUUUUSSSSSSSEEEEEERRRDDDDEEEETTT", requestDetail);

    return (
        <ScrollView style={style.mainContainer}>
            <React.Fragment>
                {user && user.googleId[0] === "p" ? (
                    profileCard(client)
                ) : (
                    <View>
                        <FlatList
                            style={{
                                width: "100%",
                                backgroundColor: "cyan",
                                flex: 1,
                            }}
                            data={requestDetail.professionals}
                            renderItem={({ item }) => profileCard(item)}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                        />
                    </View>
                )}
            </React.Fragment>
            <React.Fragment>
                {requestDetail ? (
                    <View>
                        <View style={style.textContainer}>
                            <Text>Asunto</Text>
                            <View style={style.centerField}>
                                <Text>{requestDetail.affair}</Text>
                            </View>
                        </View>
                        <View style={style.textContainer}>
                            <Text>Descripcion del problema</Text>
                            <View style={style.centerField}>
                                <Text>{requestDetail.description}</Text>
                            </View>
                        </View>
                        <View style={style.textContainer}>
                            <Text>Rango horario</Text>
                            <View style={style.centerField}>
                                <Text>{requestDetail.availableTime}</Text>
                            </View>
                        </View>
                        {/* {request.photo.length ? (
              <View style={{ alignItems: "center" }}>
                {request.photo.map((photo) => {
                  return (
                    <TouchableHighlight
                      onPress={() =>
                        navigation.navigate("ShowImage", {
                          image: photo,
                        })
                      }
                    >
                      <Image
                        style={{ marginVertical: "5%" }}
                        source={{
                          uri: photo,
                          width: 320,
                          height: 240,
                        }}
                      />
                    </TouchableHighlight>
                  );
                })}
              </View>
            ) : (
              <View></View>
            )} */}
                        {user && user.googleId[0] === "p" ? (
                            <TouchableHighlight
                                style={style.button}
                                activeOpacity={0.6}
                                underlayColor="#F9CE67"
                                onPress={() => {
                                    navigation.navigate("BudgetForm");
                                }}
                            >
                                <View style={style.textButton}>
                                    <Text>Enviar Presupuesto</Text>
                                </View>
                            </TouchableHighlight>
                        ) : (
                            <TouchableHighlight
                                style={style.button}
                                activeOpacity={0.6}
                                underlayColor="#F9CE67"
                                onPress={() => {
                                    dispatch(deleteRequest(item.id));
                                    navigation.navigate("RequestList");
                                }}
                            >
                                <View style={style.textButton}>
                                    <Text>Eliminar solicitud</Text>
                                </View>
                            </TouchableHighlight>
                        )}
                    </View>
                ) : (
                    <React.Fragment>
                        <Text>Cargando...</Text>
                    </React.Fragment>
                )}
            </React.Fragment>
        </ScrollView>
    );
}
