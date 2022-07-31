import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  TextInput,
  useWindowDimensions,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import STYLES from "./ClientSignUpStyles";
import COLORS from "./Colors";
import { ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createClient, uploadImage } from "../../../Redux/Action";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const SignUpScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const perfilPickarda = useSelector((state) => state.perfilPic);
  const { width, height } = useWindowDimensions();
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    ...user,
    isRegistered: true,
    googleId: "c" + user.googleId,
    expoToken: expoPushToken,
    name: "marianou",
    email: "marianou@gmail.com",
    // perfilPic: perfilPickarda,
  });
  const [expoPushToken, setExpoPushToken] = useState("");

  //NOTIFICATIONS TOKEN

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        dispatch(uploadImage(result.uri));
        setImage(result.uri);

        console.log(perfilPickarda, "soy la perfilpick loko");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            style={{ fontSize: 27, fontWeight: "bold", color: COLORS.dark }}
          >
            Bienvenido
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#493d8a" }}>
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Button
            style={STYLES.btnGalery}
            title="Elige una foto de tu Galeria"
            onPress={pickImage}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
        </View>
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
              style={STYLES.input}
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
              style={STYLES.input}
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
              style={STYLES.input}
              onChangeText={(text) => setInput({ ...input, address: text })}
            />
          </View>

          <View style={STYLES.btnPrimary}>
            <TouchableOpacity onPress={() => dispatch(createClient(input))}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
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
