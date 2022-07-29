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
  },
  cardContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
    alignItems: 'center',
		borderWidth: 1,
		borderRadius: 10,
		overflow: 'hidden',
		margin: 10,
		backgroundColor: '#FFFFFF',
    width: '90%',
    height: 50
	},
  textContainer: {
		display: 'flex',
		flex: 4,
		paddingLeft: '3%',
	},
  nameAndReviewContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginRight: 10,
	},
  textName: {
		fontSize: 15,
    textTransform: "uppercase",
	},
});
