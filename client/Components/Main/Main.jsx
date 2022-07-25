import React from "react";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "../OnBoarding/OnBoarding";
import Login from "../Login/Login";
import List from "../List/List";
import Tabs from "../BottomTabNavigation/BottomTabNavigation";
import ClientSignUp from "../SignUpForm/ClientSignUp/ClientSignUp";
import { StyleSheet, Text, View } from "react-native";

const Main = () => {
    const Stack = createNativeStackNavigator();
    const user = useSelector((state) => state.user);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="List"
                component={List}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
      name='Onboarding'
      component={OnBoarding}
      options={{ headerShown: false }}
    /> */}
            {/* <Stack.Screen
      name='Selection'
      component={Selection}
      options={{ headerShown: false }}
    /> */}
            {/* <Stack.Screen
      name='ProfessionalSignUp'
      component={ProfessionalSignUp}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='ClientSignUp'
      component={ClientSignUp}
      options={{ headerShown: false }}
    /> */}

            {/* <Stack.Screen
      name="HomeClient"
      component={Tabs}
      options={{ headerShown: false }}
    /> */}
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

=======
import RegisteredStack from "../../navigations/RegisteredStack";
import NotRegisteredStack from "../../navigations/NotRegisteredStack";
import LoginStack from "../../navigations/LoginStack";

const Main = () => {
  const user = useSelector((state) => state.user);
  console.log("ESTOY EN MAIN: ", user);
  return (
    <React.Fragment>
      {Object.getOwnPropertyNames(user).length > 0 ? (
        <React.Fragment>
          {!user.isRegistered ? <NotRegisteredStack /> : <RegisteredStack />}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <LoginStack />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

>>>>>>> c474df0fc370f27ca5fa254790266f0c3f0dadd5
export default Main;
