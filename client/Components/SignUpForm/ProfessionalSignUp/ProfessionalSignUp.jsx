import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Button,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import STYLES from "./ProfessionalSignUpStyles";
import COLORS from "./Colors";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { createProfessional } from "../../../Redux/Action";
import { createClient, uploadImage } from "../../../Redux/Action";
import PrimarySlider from '../../General/Slider/Slider';

const ProfessionalSignUp = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const [image, setImage] = useState(null);
  const [minTime, setMinTime] = useState(0);
	const [maxTime, setMaxTime] = useState(24);
  const [input, setInput] = useState({
    ...user,
    isRegistered: true,
    googleId: "p" + user.googleId,
  });

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
      }
    } catch (error) {
      console.log(error);
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
            <TouchableOpacity
              style={STYLES.btnProfesion}
              onPress={() => setInput({ ...input, profession: "electricista" })}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
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
              onPress={() => setInput({ ...input, profession: "gasista" })}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
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
              onPress={() => setInput({ ...input, profession: "plomero" })}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
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
            onPress={() =>
              dispatch(
                createProfessional({
                  ...input,
                  availableTimes: [minTime, maxTime],
                })
              )
            }
            style={STYLES.btnPrimary}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Registrarse
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfessionalSignUp;
