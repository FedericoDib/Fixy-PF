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
import { mercadoPago } from "../../Redux/Action/clientActions";
import PrimaryButton from "../General/PrimaryButton";

const Pay = () => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.ordenMp);

  useEffect(() => {
    dispatch(mercadoPago());
  }, [dispatch]);



  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

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
