import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
	container: {
		width: width,
		height: height,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	background1: {
		height: '40%',
		width,
		backgroundColor: theme.colors.threePalet.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	background2: {
		height: '60%',
		width: width,
		backgroundColor: theme.colors.firstPalet.light,
	},
	mainWrapper: {
		position: 'absolute',
		height: '92%',
		top: 0,
		paddingVertical: 30,
		paddingHorizontal: 10,
		justifyContent: 'center',
	},
	image: {
		alignItems: 'center',
		justifyContent: 'center',
		transform: [{ scale: 0.6 }],
	},
	wrapper: {
		justifyContent: 'space-between',
		flex: 1,
		width: '100%',
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
		height: 50,
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
		textTransform: 'uppercase',
	},
	button: {
		height: 80,
		backgroundColor: theme.colors.threePalet.secondary,
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 14,
		padding: 3,
	},
	buttonContainer: {
		flex: 1,
		width: '100%',
		padding: 10,
		justifyContent: 'space-evenly',
	},
	buttonWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	textButton: {
		textAlign: 'center',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: theme.colors.threePalet.dark,
	},
	pendingReviews: {
		width,
		height,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.colors.threePalet.primary,
	},
});
