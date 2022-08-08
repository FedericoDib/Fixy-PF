import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotRegisteredStack from "./NotRegisteredStack";
import ClientStack from "./ClientStack";
import ProfessionalStack from "./ProfessionalStack";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { googleLogin } from "../Redux/Action/generalActions";
import LoginStack from "./LoginStack";
import BannedStack from "./BannedStack";

const Stack = createNativeStackNavigator();

const InitialStack = () => {
  const user = useSelector((state) => state.generalReducer.user);
  const [activeToken, setActiveToken] = useState(null);
  const dispatch = useDispatch();

  //CHEQUEA SI HAY DATOS EN EL SECURE STORE
  useEffect(() => {
    if (__DEV__) {
      getSecureData();
      if (activeToken) {
        fetchUserInfoSigned(activeToken);
      }
    }
    return () => console.log("desmontado");
  }, [activeToken]);

  //TRAE DATOS DEL SECURE STORE DATOS DEL USUARIO
  async function getSecureData() {
    let credentials = await SecureStore.getItemAsync("key");
    if (credentials) setActiveToken(credentials);
  }

  // BUSCA EN API DE GOOGLE CON TOKEN DE UN LOGUEO ANTERIOR
  function fetchUserInfoSigned(token) {
    console.log(token);
    fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token} ` },
    })
      .then((response) => response.json())
      .then((json) => console.log("JSON", json))
      .then((json) => dispatch(googleLogin(json)))
      .catch((error) => console.error(error));
  }

  const getStack = () => {
    if (user && Object.getOwnPropertyNames(user).length === 0) {
      return (
        <Stack.Screen
          name="Login"
          component={LoginStack}
          options={{ headerShown: false }}
          initialParams={{ modo: __DEV__ ? "dev" : "prod" }}
        />
      );
    } else {
      if (user && user.active) {
        if (user && user.isRegistered && user.googleId[0] === "c") {
          return (
            <Stack.Screen
              name="ClientStack"
              component={ClientStack}
              options={{ headerShown: false }}
            />
          );
        } else if (user && user.isRegistered && user.googleId[0] === "p") {
          return (
            <Stack.Screen
              name="ProfessionalStack"
              component={ProfessionalStack}
              options={{ headerShown: false }}
            />
          );
        } else if (user && !user.isRegistered) {
          return (
            <Stack.Screen
              name="NotRegisteredStack"
              component={NotRegisteredStack}
              options={{ headerShown: false }}
            />
          );
        }
      } else if (user && !user.active) {
        return (
          <Stack.Screen
            name="BannedStack"
            component={BannedStack}
            options={{ headerShown: false }}
          />
        );
      }
    }
  };

  console.log("INITIAL STACK DEJA DE JODER", user);

  // useEffect(() => {
  // 	if (Object.getOwnPropertyNames(user).length === 0) {

  // 		setInitialRouteName('Login');
  // 		return navigation.navigate('Login', {
  // 			screen: 'Login',
  // 			params: { user: user },
  // 		});
  // 	} else {
  // 		if (user && user.googleId[0] === 'c') {

  // 			return setInitialRouteName('ClientStack');
  // 		} else if (user && user.googleId[0] === 'p') {

  // 			return setInitialRouteName('ProfessionalStack');
  // 		} else {

  // 			return setInitialRouteName('NotRegisteredStack');
  // 		}
  // 	}
  // }, [user]);

  return <Stack.Navigator>{getStack()}</Stack.Navigator>;
};

export default InitialStack;
