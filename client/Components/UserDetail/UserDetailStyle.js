import { StyleSheet } from "react-native";
import theme from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    padding: 6,
    alignItems: "center",
    paddingVertical: 30,
    width: "100%",
    height: "100%",
  },
  flatListContainer: {
    height: "66%",
    width: "100%",
    borderWidth: 2,
    borderRadius: 6,
    borderColor: theme.colors.threePalet.secondary,
    padding: 6,
    paddingHorizontal: 16,
  },
  text: {
    color: theme.colors.threePalet.secondary,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: theme.colors.threePalet.secondary,
    overflow: "hidden",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
  },
  reviewsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "17%",
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  reviewBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
  textName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  headerList: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginVertical: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  review: {
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.threePalet.primary,
  },
  comment: {
    fontSize: 18,
    marginLeft: 14,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: theme.colors.threePalet.primary,
  },
});

export default styles;
