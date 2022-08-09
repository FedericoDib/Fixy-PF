import { StyleSheet, Dimensions } from 'react-native';
import COLORS from './Colors';
import theme from '../../../theme/theme';

const { width, height } = Dimensions.get('screen');

const STYLES = StyleSheet.create({
	inputContainer: { flexDirection: 'row', marginTop: 20 },
	input: {
		color: COLORS.dark,
		paddingLeft: 30,
		borderBottomWidth: 1,
		borderColor: COLORS.light,
		borderBottomWidth: 0.5,
		flex: 1,
		fontSize: 18,
	},
	inputIcon: { marginTop: 5, position: 'absolute' },
	btnPrimary: {
		backgroundColor: COLORS.primary,
		height: 50,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 50,
	},

	btnProfesion: {
		backgroundColor: theme.colors.firstPalet.light,
		height: 80,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		width: 100,
		marginBottom: 20,
	},
	iconProf: {
		marginTop: 5,
	},
	line: { height: 1, width: 30, backgroundColor: '#a5a5a5' },
	container: {
		flex: 1,
		width,
		paddingHorizontal: 30,
		paddingVertical: 40,
		justifyContent: 'space-between',
		backgroundColor: theme.colors.threePalet.primary,
	},
	titleWrapper: {
		justifyContent: 'space-evenly',
		height: '10%',
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
		marginVertical: 10,
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
		height: 60,
		borderRadius: 14,
		justifyContent: 'center',
		alignItems: 'center',
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
		color: theme.colors.threePalet.primary,
		fontWeight: 'bold',
		fontSize: 18,
	},
	active: {
		backgroundColor: theme.colors.threePalet.secondary,
		height: 80,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		width: 100,
		marginBottom: 20,
	},
	buttonText: {
		color: '#010101',
		fontWeight: '600',
		fontSize: 18,
	},
});

export default STYLES;
