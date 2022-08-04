import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    useWindowDimensions,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import "react-native-gesture-handler";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { createClient } from "../../../Redux/Action/clientActions";
import UsePickImage from "../UsePickImage";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "./Colors";
import STYLES from "./ClientSignUpStyles";
import UseGeolocation from "../UseGeolocation";

const SignUpScreen = ({ navigation }) => {
    const user = useSelector((state) => state.generalReducer.user);
    const perfilPickarda = useSelector(
        (state) => state.generalReducer.perfilPic
    );
    const { width, height } = useWindowDimensions();
    const [place, setPlace] = useState(false);
    const { address, location } = UseGeolocation();
    console.log("Info locationssss", address, location);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        ...user,
        isRegistered: true,
        googleId: "c" + user.googleId,
        expoToken: expoPushToken,
        perfilPic: perfilPickarda,
    });
    const [expoPushToken, setExpoPushToken] = useState("");

    //NOTIFICATIONS TOKEN

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (address) {
                setInput({
                    ...input,
                    province: address.length < 4 ? address[1] : address[2],
                    city: address[1],
                    address: address[0],
                    latitude: location.latitude,
                    longitude: location.longitude,
                });
            }
            console.log("datos a guardar : ", input);
        }, [place])
    );
    console.log("locationnnnnnnnnnnnn", location);
    if (address && place === false) setPlace(true);
    async function registerForPushNotificationsAsync() {
        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;

            setInput({ ...input, expoToken: token });
        } else {
            alert("Must use physical device for Push Notifications");
        }
        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 0],
                lightColor: "#FF231F7C",
            });
        }
    }
    console.log("info inputsss: ", input);

    return (
        <SafeAreaView
            style={[
                { paddingHorizontal: 40, flex: 3, backgroundColor: "#D6D4D8" },
                { width, height },
            ]}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 90 }}>
                    <Text
                        style={{
                            fontSize: 27,
                            fontWeight: "bold",
                            color: COLORS.dark,
                        }}
                    >
                        Bienvenido
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            color: "#493d8a",
                        }}
                    >
                        {user.name}
                    </Text>
                    <Text
                        style={{
                            marginTop: 30,
                            fontSize: 19,
                            fontWeight: "bold",
                            color: COLORS.light,
                        }}
                    >
                        Registrate para continuar
                    </Text>
                </View>
                <UsePickImage />
                <View style={{ marginTop: 20 }}>
                    <View style={STYLES.inputContainer}>
                        <Icon
                            name="phone-iphone"
                            color={COLORS.light}
                            size={20}
                            style={STYLES.inputIcon}
                        />
                        <TextInput
                            placeholder="Celular"
                            style={STYLES.input}
                            onChangeText={(text) =>
                                setInput({ ...input, phoneNumber: text })
                            }
                        />
                    </View>
                    <View style={STYLES.inputContainer}>
                        <Icon
                            name="location-pin"
                            color={COLORS.light}
                            size={20}
                            style={STYLES.inputIcon}
                        />
                        <TextInput
                            placeholder="Provincia"
                            defaultValue={
                                address
                                    ? address.length < 4
                                        ? address[1]
                                        : address[2]
                                    : ""
                            }
                            style={STYLES.input}
                            onChangeText={(text) =>
                                setInput({ ...input, province: text })
                            }
                        />
                    </View>
                    <View style={STYLES.inputContainer}>
                        <Icon
                            name="location-pin"
                            color={COLORS.light}
                            size={20}
                            style={STYLES.inputIcon}
                        />
                        <TextInput
                            placeholder="Ciudad"
                            style={STYLES.input}
                            defaultValue={address ? address[1] : ""}
                            onChangeText={(text) =>
                                setInput({ ...input, city: text })
                            }
                        />
                    </View>
                    <View style={STYLES.inputContainer}>
                        <Icon
                            name="home"
                            color={COLORS.light}
                            size={20}
                            style={STYLES.inputIcon}
                        />
                        <TextInput
                            placeholder="Dirección"
                            style={STYLES.input}
                            defaultValue={address ? address[0] : null}
                            onChangeText={(text) =>
                                setInput({ ...input, address: text })
                            }
                        />
                    </View>

                    <View style={STYLES.btnPrimary}>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(createClient(input));
                                navigation.navigate("ClientStack", {
                                    screen: "HomeClient",
                                });
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                }}
                            >
                                Registrate
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUpScreen;
