import React from "react";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { View, TouchableHighlight, Text, StyleSheet } from "react-native";
import { logOut } from "../../Redux/Action";
import PrimaryButton from "../General/PrimaryButton";

const Profile = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    SecureStore.deleteItemAsync("key");
  };

  return (
    <View style={styles.container}>
      {/* <TouchableHighlight onPress={handleLogOut}>
				<Text>Log Out</Text>
			</TouchableHighlight> */}
      <PrimaryButton onPress={handleLogOut} title={"Cerrar Sesión"} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
