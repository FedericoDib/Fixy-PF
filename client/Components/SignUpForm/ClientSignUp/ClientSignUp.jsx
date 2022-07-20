import "react-native-gesture-handler";
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import STYLES from "./ClientSignUpStyles";
import COLORS from "./Colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const SignUpScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView
      style={[
        { paddingHorizontal: 40, flex: 3, backgroundColor: "#fff" },
        { width, height },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", marginTop: 75 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: COLORS.secondary,
            }}
          >
            FIXY
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <Text
            style={{ fontSize: 27, fontWeight: "bold", color: COLORS.dark }}
          >
            Welcome
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "green" }}>
            Sapo Verde
          </Text>
          <Text
            style={{
              marginTop: 30,
              fontSize: 19,
              fontWeight: "bold",
              color: COLORS.light,
            }}
          >
            Sign up to continue
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
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
          <View style={STYLES.btnPrimary}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Sign Up
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
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
