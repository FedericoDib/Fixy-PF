import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme/theme';

const { width, height } = Dimensions.get('screen');

const style = StyleSheet.create({
	mainContainer: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
		height: '100%',
		paddingVertical: 30,
		backgroundColor: theme.colors.threePalet.primary,
		justifyContent: 'space-between',
	},
	container: {
		backgroundColor: '#f1f1f1',
		height: '100%',
		width: '95%',
		marginBottom: 10,
		borderRadius: 18,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	calendarPhoneContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: theme.colors.threePalet.secondary,
		borderRadius: 10,
		paddingVertical: 10,
		marginVertical: 15,
		borderColor: theme.colors.threePalet.primary,
		borderWidth: 1,
	},
	calendarContainer: {
		flexDirection: 'row',
		marginLeft: 10,
	},
	phoneContainer: {
		flexDirection: 'row',
		marginRight: 10,
	},
	centerField: {
		alignItems: 'center',
		marginVertical: 20,
		borderWidth: 1,
		borderColor: theme.colors.threePalet.primary,
		borderRadius: 10,
		padding: 10,
		backgroundColor: theme.colors.threePalet.secondary,
	},
	label: {
		fontSize: 18,
		fontWeight: 'bold',
		color: theme.colors.threePalet.primary,
	},
	desc: {
		fontSize: 18,
	},
	buttonContainer: {
		width: '100%',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	mainTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: theme.colors.threePalet.primary,
		width: '90%',
		textAlign: 'center',
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: 'flex-start',
	},
	text: {
		marginLeft: 10,
		marginRight: 10,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#fff',
	},
	code: {
		fontSize: 18,
		fontWeight: 'bold',
		color: theme.colors.threePalet.primary,
		backgroundColor: theme.colors.threePalet.secondary,
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		marginVertical: 20,
		marginHorizontal: 100,
		textAlign: 'center',
	},
	button: {
		flexDirection: 'row',
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 30,
		paddingVertical: 10,
		borderRadius: 15,
		backgroundColor: theme.colors.threePalet.primary,
		marginVertical: 10,
	},
	text: {
		marginLeft: 10,
		marginRight: 10,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#fff',
	},
});

export default style;
