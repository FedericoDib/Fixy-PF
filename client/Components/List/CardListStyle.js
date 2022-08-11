import { StyleSheet } from "react-native";
import theme from "../../theme/theme";

const styles = StyleSheet.create({
  background: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "green",
    height: 80,
    flex: 1,
    marginVertical: 14,
    justifyContent: "center",
    padding: 10,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 10,
    height: 120,
    width: "100%",
    marginVertical: 14,
  },
  textName: {
    fontSize: 17,
    fontWeight: "bold",
  },
  textProfession: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  textContainer: {
    display: "flex",
    flex: 4,
    marginLeft: 8,
    paddingLeft: "3%",
  },
  nameAndReviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    fontWeight: "bold",
  },
  reviewContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.threePalet.primary,
    padding: 4,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
    width: 50,
    marginRight: 10,
  },
});

export default styles;
