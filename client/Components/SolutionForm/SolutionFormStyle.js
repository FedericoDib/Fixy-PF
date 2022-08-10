import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme/theme';

const { width, height } = Dimensions.get('screen');

const style = StyleSheet.create({
	mainContainer: {
		width,
		backgroundColor: theme.colors.threePalet.primary,
		paddingVertical: 30,
	},
	container: {
		backgroundColor: '#f1f1f1',
		width: '95%',
		marginBottom: 10,
		borderRadius: 18,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	label: {
		fontSize: 18,
		fontWeight: 'bold',
		color: theme.colors.threePalet.dark,
	},
	inputContainer: {
		// backgroundColor: 'cyan',
		flexDirection: 'row',
		marginVertical: 20,
	},
	inputIcon: {
		color: theme.colors.threePalet.secondary,
		marginRight: 10,
	},
	input: {
		width: '80%',
		fontSize: 18,
		borderBottomWidth: 1,
		borderColor: '#ccc',
		paddingVertical: 2,
	},
});

export default style;
