import { StyleSheet } from "react-native";
import COLORS from "./Colors";

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
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  btnProfesion: {
    backgroundColor: COLORS.light,
    height: 80,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: 100,
    marginBottom: 20,
  },

  iconProf: {
    marginTop: 5,
  },

  line: { height: 1, width: 30, backgroundColor: "#a5a5a5" },
});

export default STYLES;
