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
import UseGeolocation from "../UseGeolocation";
import { clientValidate } from "../Validator";
import STYLES from "./ClientSignUpStyles";

const ClientSignUp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.generalReducer.user);
  const perfilPic = useSelector((state) => state.generalReducer.perfilPic);
  const { width, height } = useWindowDimensions();
  const { address, location } = UseGeolocation();
  const [place, setPlace] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    ...user,
    expoToken: expoPushToken,
    isRegistered: true,
    googleId: "c" + user.googleId,
    perfilPic: perfilPic,
  });

  useFocusEffect(
    useCallback(() => {
      setInput({ ...input, perfilPic: perfilPic });
    }, [perfilPic])
  );

  useFocusEffect(
    useCallback(() => {
      setError(clientValidate(input));
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
            <Text style={STYLES.mainTitle}>Bienvenido/a</Text>
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
        <View>
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
              // defaultValue={address ? /([0-9])/.test(address[1]) ? address[2] : address[1] : ''}
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
        </View>

        <TouchableOpacity
          disabled={Object.getOwnPropertyNames(error).length}
          onPress={() => {
            Object.getOwnPropertyNames(error).length === 0 &&
              dispatch(createClient(input));
          }}
          style={STYLES.btnPrimary}
        >
          <Text style={STYLES.buttonText}>
            {Object.getOwnPropertyNames(error).length
              ? "Aguardando datos..."
              : "Registrarse"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ClientSignUp;
