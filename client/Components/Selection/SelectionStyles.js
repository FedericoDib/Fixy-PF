import { StyleSheet } from "react-native";
import theme from "../../theme/theme";

const style = StyleSheet.create({
  mainContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.threePalet.light,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: "center",
    marginTop: 50,
  },
  text: {
    color: theme.colors.threePalet.light,
    display: "flex",
    textTransform: "uppercase",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 26,
  },

  buttonsContainer: {
    display: "flex",
    flex: 3,
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.colors.threePalet.primary,
    borderWidth: 2,
    borderColor: theme.colors.threePalet.primary,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 49,
  },
  title: {
    display: "flex",
    textTransform: "uppercase",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 26,
    color: theme.colors.threePalet.primary,
    textAlign: "center",
  },
});

export default style;
