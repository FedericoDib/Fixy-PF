import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const style = StyleSheet.create({
	mainContainer: {
		backgroundColor: theme.colors.firstPalet.light,
		flex: 1,
		paddingHorizontal: 10,
		paddingTop: 20,
	},
	button: {
		backgroundColor: theme.colors.threePalet.secondary,
		borderRadius: 15,
		marginTop: 10,
		width: '40%',
		justifyContent: 'center',
	},
	textButton: {
		padding: 1,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: 'bold',
	},
	cardsContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 6,
		backgroundColor: '#fff',
		width: '100%',
	},
});

export default style;
