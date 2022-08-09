import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme/theme';
const { height, width } = Dimensions.get('screen');

const style = StyleSheet.create({
	mainContainer: {
		display: 'flex',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		backgroundColor: theme.colors.threePalet.primary,
		padding: 5,
	},
	titleContainer: {
		flex: 0.5,
		width,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 50,
	},
	text: {
		color: theme.colors.threePalet.light,
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
		borderColor: theme.colors.threePalet.secondary,
		borderWidth: 4,
		borderRadius: 200,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		margin: 5,
	},
	title: {
		width: '80%',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: 24,
		color: theme.colors.threePalet.light,
		textAlign: 'center',
	},
});

export default style;
