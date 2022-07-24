import React, { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { Text, TouchableHighlight, View, Platform } from "react-native";
import { styles } from "./LoginStyles";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../Redux/Action";

const MY_SECURE_AUTH_STATE_KEY = "1234";

WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({ useProxy: false });

const Login = () => {
  const [accesToken, setAccessToken] = useState(null);
  const [activeToken, setActiveToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [request, response, promptAsync] = isLogged
    ? null
    : Google.useAuthRequest({
        expoClientId:
          "302940809798-bb9fvtjipv232sglpnrglc228fp28r1q.apps.googleusercontent.com",
      });

  const dispatch = useDispatch();
  useEffect(() => {
    getSecureData();
  }, []);

  //CHEQUEA SI HAY DATOS EN EL SECURE STORE
  useEffect(() => {
    getSecureData();

    if (activeToken) {
      fetchUserInfoSigned(activeToken);
    }
  }, [activeToken]);

  //TRAE DATOS DEL SECURE STORE DATOS DEL USUARIO
  async function getSecureData() {
    let credentials = await SecureStore.getItemAsync("key");
    if (credentials) setActiveToken(credentials);
  }

  // BUSCA EN API DE GOOGLE CON TOKEN DE UN LOGUEO ANTERIOR
  function fetchUserInfoSigned(token) {
    //console.log(token);
    console.log("FETCHEO");
    fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token} ` },
    })
      .then((response) => response.json())
      .then((json) => dispatch(googleLogin(json)))
      .catch((error) => console.error(error));
  }

  console.log("SOY LOGGED:", isLogged);

  useEffect(() => {
    //CHEQUEA SI EL LOGUEO EN GOOGLE FUE CORRECTO, GUARDA LOS DATOS EN SECURE STORE Y PIDE DATOS DEL USUARIO
    if (response?.type === "success") {
      const auth = response.params.access_token;
      const storageValue = JSON.stringify(auth);

      if (Platform.OS !== "web") {
        SecureStore.setItemAsync("key", storageValue);
      }
      const { authentication } = response;
      setAccessToken(authentication.accessToken);
      accesToken && fetchUserInfo();
    }
  }, [response, accesToken]);

  // BUSCA EN API GOOGLE INFO DEL USER
  function fetchUserInfo() {
    console.log("Hola soy una funcion");
    fetch(`https://www.googleapis.com/userinfo/v2/me`, {
      headers: { Authorization: `Bearer ${accesToken}` },
    })
      .then((response) => response.json())
      .then((json) => dispatch(googleLogin(json)))
      .catch((error) => console.error(error));
  }

  //TRAE DATOS DEL SECURE STORE DATOS DEL USUARIO
  //   async function getSecureData() {
  //     let credentials = await SecureStore.getItemAsync("key");
  //     if (credentials) setActiveToken(credentials);
  //   }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.mainTitle}>¡Bienvenido/a!</Text>
        <Text style={styles.subTitle}>Ingresa o Registrate para continuar</Text>
        <TouchableHighlight
          onPress={() => promptAsync({ redirectUri })}
          activeOpacity={0.6}
          underlayColor="#ccc"
          style={styles.button}
        >
          <Text>Continuar con Google</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Login;
