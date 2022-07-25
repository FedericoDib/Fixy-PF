import { StyleSheet } from "react-native";
import theme from "../../theme/theme";

export const styles = StyleSheet.create({
  image: {
    alignItems: "center",
    justifyContent: "center",

    transform: [{ scale: 0.6 }],
  },
  wrapper: {
    justifyContent: "space-between",
    flex: 1,
  },
});
