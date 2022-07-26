import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Linking,
} from "react-native";
import { logOut, mercadoPago } from "../../Redux/Action";
import PrimaryButton from "../General/PrimaryButton";

const Pay = () => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.ordenMp);

  useEffect(() => {
    dispatch(mercadoPago());
  }, [dispatch]);

  console.log(url.body.sandbox_init_point);

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url.body.sandbox_init_point);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url.body.sandbox_init_point);
    } else {
      Alert.alert(
        `Don't know how to open this URL: ${url.body.sandbox_init_point}`
      );
    }
  }, [url.body.sandbox_init_point]);

  return (
    <View style={styles.container}>
      {/* <TouchableHighlight onPress={handleLogOut}>
				<Text>Log Out</Text>
			</TouchableHighlight> */}
      <PrimaryButton onPress={handlePress} title={"Pagar Mercado Pago"} />
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

export default Pay;
