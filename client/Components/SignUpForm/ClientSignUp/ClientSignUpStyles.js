import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../../theme/theme';

const { width, height } = Dimensions.get('screen');
const STYLES = StyleSheet.create({
	container: {
		flex: 1,
		width,
		height,
		paddingHorizontal: 30,
		paddingVertical: 40,
		justifyContent: 'space-between',
		backgroundColor: theme.colors.threePalet.primary,
	},
	titleWrapper: {
		justifyContent: 'space-between',
		height: '15%',
	},
	mainTitle: {
		fontSize: 27,
		fontWeight: 'bold',
		color: '#f1f1f1',
	},
	subTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: theme.colors.threePalet.secondary,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 13,
		borderBottomWidth: 1.5,
		borderColor: '#f1f1f1',
		borderRadius: 15,
		paddingVertical: 2,
		paddingHorizontal: 10,
	},
	input: {
		color: '#f1f1f1',
		paddingLeft: 20,
		flex: 1,
		fontSize: 18,
	},
	inputIcon: {
		color: '#f1f1f1',
	},
	btnPrimary: {
		backgroundColor: theme.colors.threePalet.secondary,
		height: 50,
		borderRadius: 14,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 50,
	},
	btnGalery: {
		color: '#f1f1f1',
		fontWeight: 'bold',
		borderColor: theme.colors.threePalet.secondary,
		borderWidth: 1.5,
		borderRadius: 10,
		paddingVertical: 5,
		paddingHorizontal: 10,
	},

	line: { height: 1, width: 30, backgroundColor: '#a5a5a5' },
	buttonText: {
		color: '#010101',
		fontWeight: 'bold',
		fontSize: 18,
	},
});

export default STYLES;
