import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter } from "react-router-native";

export default function App() {
  return (
      <NativeRouter>
        <View style={styles.container}>
          <Text>Hola</Text>
        </View>
      </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

