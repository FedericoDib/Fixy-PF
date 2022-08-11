import { StyleSheet } from "react-native";
import theme from "../../theme/theme";

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 8,
  },
  textContainer: {
    marginVertical: "0.5%",
  },
  centerField: {
    backgroundColor: theme.colors.threePalet.secondary,
    padding: "2%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: "2%",
  },
  button: {
    backgroundColor: theme.colors.threePalet.primary,
    borderRadius: 10,
    marginTop: "5%",
    marginBottom: 18,
  },
  textButton: {
    padding: "2.5%",
    borderRadius: 10,
    alignItems: "center",
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
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
    width: "14%",
  },
  textos: {
    fontWeight: "bold",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.threePalet.primary,
    width: "90%",
    textAlign: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'flex-start',
  },
});

export default style;
