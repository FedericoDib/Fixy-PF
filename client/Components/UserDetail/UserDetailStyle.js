import { StyleSheet } from "react-native";
import theme from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    padding: 50,
    width: "100%",
    height: "100%",
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
  headerList: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    fontSize: 20,
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
  name: {
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 16,
    color: theme.colors.threePalet.primary,
  },
});

export default styles;
