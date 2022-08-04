import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    useWindowDimensions,
    TouchableOpacity,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { createProfessional } from "../../../Redux/Action/professionalActions";
import PrimarySlider from "../../General/Slider/Slider";
import UsePickImage from "../UsePickImage";
import STYLES from "./ProfessionalSignUpStyles";
import COLORS from "./Colors";
import UseGeolocation from "../UseGeolocation";
import { useFocusEffect } from "@react-navigation/native";

const ProfessionalSignUp = ({ navigation }) => {
    const user = useSelector((state) => state.generalReducer.user);
    const dispatch = useDispatch();
    const { width, height } = useWindowDimensions();
    const [image, setImage] = useState(null);
    const [minTime, setMinTime] = useState(0);
    const [maxTime, setMaxTime] = useState(24);
    const { address, location } = UseGeolocation();
    const [place, setPlace] = useState(false);
    const [input, setInput] = useState({
        ...user,
        expoToken: expoPushToken,
        isRegistered: true,
        googleId: "p" + user.googleId,
    });
    const [expoPushToken, setExpoPushToken] = useState("");

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

    if (address && !place) setPlace(true);

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
    console.log("inputtttttttsssss: ", input);
    return (
        <SafeAreaView
            style={[
                { paddingHorizontal: 40, flex: 3, backgroundColor: "#fff" },
                { width, height },
            ]}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: "row", marginTop: 40 }}></View>
                <View style={{ marginTop: 20 }}>
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
                            color: "green",
                        }}
                    >
                        {user.name}
                    </Text>
                    <Text
                        style={{
                            marginTop: 30,
                            fontSize: 19,
                            fontWeight: "bold",
                            justifyContent: "center",
                            color: COLORS.light,
                        }}
                    >
                        Registrate para continuar
                    </Text>
                    <UsePickImage />
                    <View style={{ marginTop: 10 }}></View>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "#28388f",
                            }}
                        >
                            Selecciona tu profesión
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <TouchableOpacity
                            style={STYLES.btnProfesion}
                            onPress={() =>
                                setInput({
                                    ...input,
                                    profession: "electricista",
                                })
                            }
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                }}
                            >
                                Electricista
                            </Text>
                            <Icon
                                name="electrical-services"
                                color={COLORS.dark}
                                size={20}
                                style={STYLES.iconProf}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={STYLES.btnProfesion}
                            onPress={() =>
                                setInput({ ...input, profession: "gasista" })
                            }
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                }}
                            >
                                Gasista
                            </Text>
                            <Icon2
                                name="gas-cylinder"
                                color={COLORS.dark}
                                size={20}
                                style={STYLES.iconProf}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={STYLES.btnProfesion}
                            onPress={() =>
                                setInput({ ...input, profession: "plomero" })
                            }
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                }}
                            >
                                Plomero
                            </Text>
                            <Icon2
                                name="water-pump"
                                color={COLORS.dark}
                                size={20}
                                style={STYLES.iconProf}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={STYLES.inputContainer}>
                        <Icon2
                            name="file-document-outline"
                            color={COLORS.light}
                            size={20}
                            style={STYLES.inputIcon}
                        />
                        <TextInput
                            placeholder="Matricula Profesional (Numero)"
                            style={STYLES.input}
                            onChangeText={(text) =>
                                setInput({ ...input, enrollment: text })
                            }
                        />
                    </View>
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
                            style={STYLES.input}
                            defaultValue={
                                address
                                    ? address.length < 4
                                        ? address[1]
                                        : address[2]
                                    : ""
                            }
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
                            defaultValue={address ? address[0] : ""}
                            onChangeText={(text) =>
                                setInput({ ...input, address: text })
                            }
                        />
                    </View>
                    <Text style={STYLES.input}>Horario laboral</Text>
                    <PrimarySlider
                        min={0}
                        max={24}
                        low={minTime}
                        high={maxTime}
                        setMinTime={setMinTime}
                        setMaxTime={setMaxTime}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            dispatch(
                                createProfessional({
                                    ...input,
                                    availableTimes: [minTime, maxTime],
                                })
                            );
                            navigation.navigate("ClientStack", {
                                screen: "HomeClient",
                            });
                        }}
                        style={STYLES.btnPrimary}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            Registrarse
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfessionalSignUp;
