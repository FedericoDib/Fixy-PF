import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme/theme';
const { height, width } = Dimensions.get('screen');

const style = StyleSheet.create({
	mainContainer: {
		display: 'flex',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		backgroundColor: theme.colors.threePalet.light,
		padding: 5,
	},
	titleContainer: {
		flex: 0.5,
		width,
		justifyContent: 'center',
		marginTop: 50,
	},
	text: {
		color: theme.colors.threePalet.primary,
		display: 'flex',
		textTransform: 'uppercase',
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: '600',
		fontSize: 26,
	},

	buttonsContainer: {
		display: 'flex',
		flex: 5,
		justifyContent: 'space-evenly',
	},
	button: {
		backgroundColor: theme.colors.threePalet.primary,
		borderColor: theme.colors.threePalet.primary,
		borderRadius: 200,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		margin: 5,
	},
	title: {
		display: 'flex',
		textTransform: 'uppercase',
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: 'bold',
		fontSize: 20,
		color: theme.colors.threePalet.primary,
		textAlign: 'center',
	},
});

export default style;
