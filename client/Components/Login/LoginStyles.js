import { StyleSheet } from "react-native";
import theme from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.threePalet.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    height: "25%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 40,
    letterSpacing: 2,
    marginBottom: 10,
    color: theme.colors.firstPalet.light,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: "auto",
    color: theme.colors.firstPalet.light,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: theme.colors.firstPalet.light,
  },
  textbutton: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
