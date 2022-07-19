import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { NativeRouter } from "react-router-native";
import { Switch, Route, Routes } from "react-router-native";
import store from "./Redux/Store";
import NavBarTab from "./Components/NavBarTab/NavBarTab";
import CharacterDetail from "./Components/CharacterDetail/CharacterDetail";
import CharacterList from "./Components/CharacterList/CharacterList";
import OnBoarding from "./Components/OnBoarding/OnBoarding";

export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <View style={styles.container}>
          <OnBoarding />
        </View>
        <Routes></Routes>
      </NativeRouter>
    </Provider>
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
