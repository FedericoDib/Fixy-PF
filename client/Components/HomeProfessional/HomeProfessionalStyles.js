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
    backgroundColor: "yellow",
    width: "100%",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    backgroundColor: "#FFFFFF",
    width: "90%",
    height: 50,
  },
  textContainer: {
    display: "flex",
    flex: 4,
    paddingLeft: "3%",
  },
  nameAndReviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
  textName: {
    fontSize: 15,
    textTransform: "uppercase",
  },
  button: {
    height: 100,
    backgroundColor: theme.colors.threePalet.primary,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    padding: 5,
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
    justifyContent: "space-evenly",
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textButton: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#f1f1f1",
  },

  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
