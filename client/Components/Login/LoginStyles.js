import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme/theme';

const { height, width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
	container: {
		width,
		flex: 1,
		backgroundColor: theme.colors.threePalet.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	wrapper: {
		height: '25%',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 30,
	},
	mainTitle: {
		fontSize: 35,
		letterSpacing: 2,
		color: theme.colors.firstPalet.light,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '70%',
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: theme.colors.threePalet.dark,
		backgroundColor: theme.colors.firstPalet.light,
		marginVertical: 10,
	},
	textbutton: {
		fontWeight: '700',
		textTransform: 'uppercase',
		fontSize: 13,
		paddingLeft: 5,
	},
});
