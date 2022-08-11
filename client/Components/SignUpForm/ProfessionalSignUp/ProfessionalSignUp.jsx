import React, { useState, useEffect, useCallback, useRef } from "react";
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
import { professionalValidate } from "../Validator";

const ProfessionalSignUp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.generalReducer.user);
  const perfilPic = useSelector((state) => state.generalReducer.perfilPic);
  const [minTime, setMinTime] = useState(0);
  const [maxTime, setMaxTime] = useState(24);
  const { address, location } = UseGeolocation();
  const [place, setPlace] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    ...user,
    expoToken: expoPushToken,
    isRegistered: true,
    googleId: "p" + user.googleId,
    perfilPic: perfilPic,
  });

  useFocusEffect(
    useCallback(() => {
      setInput({ ...input, perfilPic: perfilPic });
    }, [perfilPic])
  );

  useFocusEffect(
    useCallback(() => {
      setError(professionalValidate(input));
    }, [input])
  );

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
          province:
            address.length === 3 ? splitProvince(address[1]) : address[2],
          city:
            address.length === 3
              ? splitProvince(address[1])
              : /([0-9])/.test(address[1])
              ? address[2]
              : address[1],
          address: address[0],
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }
    }, [place])
  );

  const splitProvince = (string) => {
    const splittedArray = string.split(" ");

    return splittedArray[2];
  };

  if (address && !place) setPlace(true);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
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

  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <View style={STYLES.container}>
        <View style={STYLES.titleWrapper}>
          <View>
            <Text style={STYLES.mainTitle}>Bienvenido</Text>
            <Text style={STYLES.subTitle}>{user.name}</Text>
          </View>
          <Text
            style={{
              fontSize: 19,
              fontWeight: "bold",
              justifyContent: "center",
              color: "#f1f1f1",
            }}
          >
            Registrate para continuar
          </Text>
        </View>
        <UsePickImage />
        <View
          style={{
            height: "18%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#f1f1f1",
            }}
          >
            Selecciona tu profesión
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={
                input.profession === "electricista"
                  ? STYLES.btnProfesion && STYLES.active
                  : STYLES.btnProfesion
              }
              onPress={() =>
                setInput({
                  ...input,
                  profession: "electricista",
                })
              }
            >
              <Text style={STYLES.buttonText}>Electricista</Text>
              <Icon
                name="electrical-services"
                color={"#010101"}
                size={20}
                style={STYLES.iconProf}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={
                input.profession === "gasista"
                  ? STYLES.btnProfesion && STYLES.active
                  : STYLES.btnProfesion
              }
              onPress={() => setInput({ ...input, profession: "gasista" })}
            >
              <Text style={STYLES.buttonText}>Gasista</Text>
              <Icon2
                name="gas-cylinder"
                color={"#010101"}
                size={20}
                style={STYLES.iconProf}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={
                input.profession === "plomero"
                  ? STYLES.btnProfesion && STYLES.active
                  : STYLES.btnProfesion
              }
              onPress={() => setInput({ ...input, profession: "plomero" })}
            >
              <Text style={STYLES.buttonText}>Plomero</Text>
              <Icon2
                name="water-pump"
                color={"#010101"}
                size={20}
                style={STYLES.iconProf}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingVertical: 20 }}>
          <View style={STYLES.inputContainer}>
            <Icon2
              name="file-document-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Matricula Profesional (Numero)"
              placeholderTextColor={"#f1f1f1"}
              style={STYLES.input}
              onChangeText={(text) => setInput({ ...input, enrollment: text })}
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
              keyboardType="phone-pad"
              placeholder="Celular"
              placeholderTextColor={"#f1f1f1"}
              style={STYLES.input}
              onChangeText={(text) => setInput({ ...input, phoneNumber: text })}
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
              placeholderTextColor={"#f1f1f1"}
              style={STYLES.input}
              defaultValue={input.province && input.province}
              onChangeText={(text) => setInput({ ...input, province: text })}
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
              placeholderTextColor={"#f1f1f1"}
              style={STYLES.input}
              defaultValue={input.city && input.city}
              onChangeText={(text) => setInput({ ...input, city: text })}
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
              placeholderTextColor={"#f1f1f1"}
              style={STYLES.input}
              defaultValue={address ? address[0] : ""}
              onChangeText={(text) => setInput({ ...input, address: text })}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              paddingVertical: 30,
            }}
          >
            <Text style={{ fontWeight: "600", color: "#f1f1f1", fontSize: 20 }}>
              Horario laboral
            </Text>
            <PrimarySlider
              min={0}
              max={24}
              low={minTime}
              high={maxTime}
              setMinTime={setMinTime}
              setMaxTime={setMaxTime}
            />
          </View>
        </View>
        <View
          style={{
            height: 250,
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity
            disabled={Object.getOwnPropertyNames(error).length}
            onPress={() => {
              Object.getOwnPropertyNames(error).length === 0 &&
                dispatch(
                  createProfessional({
                    ...input,
                    availableTimes: [minTime, maxTime],
                  })
                );
            }}
            style={STYLES.btnPrimary}
          >
            <Text
              style={{
                color: "#010101",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {Object.getOwnPropertyNames(error).length
                ? "Aguardando datos..."
                : "Registrarse"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfessionalSignUp;
