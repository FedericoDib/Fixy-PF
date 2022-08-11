import { StyleSheet } from "react-native";
import theme from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: theme.colors.threePalet.secondary,
  },
  name: {
    fontWeight: "800",
    fontSize: 24,
    color: "#493d8a",
  },
  modalView: {
    height: "100%",
    fontSize: 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.threePalet.primary,
  },
  itemText: {
    marginVertical: 4,
    color: "black",
    marginLeft: 10,
    borderColor: "#a5a5a5",
    flex: 1,
    fontSize: 20,
  },
  textInput: {
    width: "85%",
    borderRadius: 10,
    borderColor: "#fff",
    textAlign: "center",
    height: 70,
    borderWidth: 2,
    color: "#fff",
    marginVertical: 30,
    fontSize: 18,
  },

  touchableSave: {
    backgroundColor: theme.colors.threePalet.secondary,
    paddingHorizontal: 60,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "85%",
    marginTop: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: "grey",
    flexDirection: "row",
    width: "95%",
    borderRadius: 8,
    marginVertical: 5,
    justifyContent: "flex-start",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.threePalet.secondary,
  },
  icon: {
    alignItems: "center",
    position: "absolute",
    marginTop: 5,
    marginLeft: 8,
    color: theme.colors.threePalet.primary,
  },
});

export default styles;
