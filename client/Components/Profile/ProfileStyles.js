import { StyleSheet } from "react-native";
import theme from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontWeight: "800",
    fontSize: 24,
    color: "#493d8a",
  },
  modalView: {
    flex: 1,
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
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
    width: "90%",
    height: 70,
    borderWidth: 1,
    borderColor: "grey",
    fontSize: 18,
  },

  touchableSave: {
    backgroundColor: "orange",
    paddingHorizontal: 120,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: "grey",
    flexDirection: "row",
    borderRadius: 8,
    marginVertical: 5,
    justifyContent: "flex-start",
    marginHorizontal: 45,
  },
  text: {},
  icon: {
    alignItems: "center",
    position: "absolute",
    marginTop: 5,
    marginLeft: 8,
  },
});

export default styles;
