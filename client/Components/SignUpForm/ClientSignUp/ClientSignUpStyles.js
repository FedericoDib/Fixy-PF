import { StyleSheet } from "react-native";
import COLORS from "./Colors";
import theme from "../../../theme/theme";

const STYLES = StyleSheet.create({
  inputContainer: { flexDirection: "row", marginTop: 20 },
  input: {
    color: COLORS.dark,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: COLORS.light,
    borderBottomWidth: 0.5,
    flex: 1,
    fontSize: 18,
  },
  inputIcon: { marginTop: 5, position: "absolute" },
  btnPrimary: {
    backgroundColor: theme.colors.threePalet.primary,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  btnGalery: {
    color: theme.colors.threePalet.primary,
  },

  line: { height: 1, width: 30, backgroundColor: "#a5a5a5" },
});

export default STYLES;
