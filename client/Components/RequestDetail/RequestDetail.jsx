import React from "react";
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
import style from "./RequestDetailStyle";
import Icon from "react-native-vector-icons/Entypo";
import IconStart from "react-native-vector-icons/Foundation";
import { useSelector } from "react-redux";

export default function RequestDetail({ navigation }) {
    // const request = useSelector((state) => state.request)
    const request = {
        id: "fe5398dc-666b-4fa3-a970-a1c6775e716d",
        affair: "exploto el foco",
        date: "26/07/2022",
        description: "prendi la luz y exploto",
        status: "pending",
        budget: null,
        clientId: "3",
        availableTime: "10:00 - 12:00",
        photo: [
            "https://loremflickr.com/320/240",
            "https://loremflickr.com/320/240",
            "https://loremflickr.com/320/240",
            "https://loremflickr.com/320/240",
            "https://loremflickr.com/320/240",
            "https://loremflickr.com/320/240",
        ],
        client: {
            googleId: "3",
            expoToken: "1",
            isRegistered: null,
            firstLogin: true,
            email: "jose@fixy.com",
            name: "Maximiliano Silva",
            phoneNumber: "1142451823",
            perfilPic: "unafoto",
            province: "cordoba",
            city: "berazategui",
            address: "Guemes 1234",
            reviews: [
                {
                    rating: 5,
                },
            ],
        },
    };

    return (
        <ScrollView style={style.mainContainer}>
            <TouchableHighlight
                activeOpacity={0.9}
                underlayColor="white"
                onPress={() => navigation.navigate("Pay")}
            >
                <View style={style.cardContainer}>
                    <View style={style.imageContainer}>
                        <Icon name="user" color="black" size={40} />
                        {/* <Image
        source={item.image}
    /> */}
                    </View>
                    <View style={style.textCardContainer}>
                        <View style={style.nameAndReviewContainer}>
                            <Text style={style.textName}>
                                {request.client.name}
                            </Text>
                            <View style={style.reviewContainer}>
                                <IconStart
                                    name="star"
                                    color="#E1C85A"
                                    size={19}
                                />
                                <Text style={style.textName}>
                                    {request.client.reviews[0].rating}
                                </Text>
                            </View>
                        </View>
                        <Text style={style.textProfession}>
                            {request.client.address}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
            <View style={style.textContainer}>
                <Text>Asunto</Text>
                <View style={style.centerField}>
                    <Text>{request.affair}</Text>
                </View>
            </View>
            <View style={style.textContainer}>
                <Text>Descripcion del problema</Text>
                <View style={style.centerField}>
                    <Text>
                        Lorem ipsum es el texto que se usa habitualmente en
                        diseño gráfico en demostraciones de tipografías o de
                        borradores de diseño para probar el diseño visual antes
                        de insertar el texto final.
                    </Text>
                </View>
            </View>
            <View style={style.textContainer}>
                <Text>Rango horario</Text>
                <View style={style.centerField}>
                    <Text>{request.availableTime}</Text>
                </View>
            </View>
            {request.photo.length ? (
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
            )}
            <TouchableHighlight
                style={style.button}
                activeOpacity={0.6}
                underlayColor="#F9CE67"
                onPress={() => {
                    navigation.navigate("HomeClient");
                }}
            >
                <View style={style.textButton}>
                    <Text>Enviar Presupuesto</Text>
                </View>
            </TouchableHighlight>
        </ScrollView>
    );
}
