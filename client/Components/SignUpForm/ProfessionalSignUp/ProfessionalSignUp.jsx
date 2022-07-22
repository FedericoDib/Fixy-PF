import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Button,
  useWindowDimensions,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import STYLES from "./ProfessionalSignUpStyles";
import COLORS from "./Colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

const ProfessionalSignUp = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
            style={{ fontSize: 27, fontWeight: "bold", color: COLORS.dark }}
          >
            Bienvenido
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "green" }}>
            Sapo Verde
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
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Button title="Elige una foto de tu Galeria" onPress={pickImage} />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200, marginTop: 10 }}
              />
            )}
          </View>
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
              style={{ fontSize: 15, fontWeight: "bold", color: "#28388f" }}
            >
              Selecciona tu profesión
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={STYLES.btnProfesion}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Electricista
              </Text>
              <Icon
                name="electrical-services"
                color={COLORS.dark}
                size={20}
                style={STYLES.iconProf}
              />
            </View>
            <View style={STYLES.btnProfesion}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Gasista
              </Text>
              <Icon2
                name="gas-cylinder"
                color={COLORS.dark}
                size={20}
                style={STYLES.iconProf}
              />
            </View>
            <View style={STYLES.btnProfesion}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Plomero
              </Text>
              <Icon2
                name="water-pump"
                color={COLORS.dark}
                size={20}
                style={STYLES.iconProf}
              />
            </View>
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
            />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="phone-iphone"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput placeholder="Celular" style={STYLES.input} />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="location-pin"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput placeholder="Provincia" style={STYLES.input} />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="location-pin"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput placeholder="Ciudad" style={STYLES.input} />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="home"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput placeholder="Dirección" style={STYLES.input} />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="lock-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Contraseña"
              style={STYLES.input}
              secureTextEntry
            />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="lock-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Repetir Contraseña"
              style={STYLES.input}
              secureTextEntry
            />
          </View>
          <View style={STYLES.btnPrimary}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Registrarse
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: COLORS.light, fontWeight: "bold" }}>
            Ya tienes cuenta?
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{ color: COLORS.pink, fontWeight: "bold", marginLeft: 6 }}
            >
              Ingresa Aquí
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfessionalSignUp;
