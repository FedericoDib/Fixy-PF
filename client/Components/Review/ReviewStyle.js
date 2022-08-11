import { StyleSheet, Dimensions } from "react-native";
import theme from "../../theme/theme";

const { height, width } = Dimensions.get("screen");

const style = StyleSheet.create({
  mainContainer: {
    width,
    height,
    backgroundColor: theme.colors.threePalet.primary,
    padding: 20,
  },
  subContainer: {
    backgroundColor: "cyan",
    height: "100%",
    backgroundColor: theme.colors.firstPalet.light,
    padding: 20,
    borderRadius: 14,
    justifyContent: "space-between",
  },
  textContainer: {
    marginVertical: "0.5%",
  },
  centerField: {
    backgroundColor: "#F9CE67",
    padding: "2%",
    borderRadius: 10,
    alignItems: "baseline",
    justifyContent: "flex-start",
    marginTop: "2%",
    height: "60%",
  },
  button: {
    backgroundColor: "#F9CE67",
    borderRadius: 10,
    marginTop: "5%",
  },
  textButton: {
    padding: "2.5%",
    borderRadius: 10,
    alignItems: "center",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    height: 120,
    overflow: "hidden",
    marginVertical: "2%",
    padding: 10,
  },
  textName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textProfession: {
    fontSize: 15,
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textCardContainer: {
    display: "flex",
    width: "40%",
    marginHorizontal: 25,
  },
  nameAndReviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "5%",
  },
  reviewContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF5E7",
    padding: "2%",
    borderRadius: 10,
    paddingHorizontal: "1%",
    justifyContent: "space-around",
    width: "12%",
  },
  starOff: {
    color: "#C1C0C0",
  },
  starOn: {
    color: "#E1C85A",
  },
  inputLabel: {
    fontSize: 15,
    marginVertical: 10,
  },
});

export default style;
