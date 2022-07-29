import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:15
	},
	backgroundContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		zIndex: -1,
	},
	background1: {
		height: '30%',
    backgroundColor: theme.colors.threePalet.primary,
	},
	background2: {
		flex:1,
		backgroundColor: '#f1f1f1',
	},
	container: {
		zIndex: 2,
    height:'auto',
    width:'90%',
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 14,
    overflow: 'hidden',
    ...theme.shadows.dark,
    border:0.5,
    borderColor: '#ccc'
	},
	title: {
		alignSelf: 'flex-start',
		fontSize: 25,
		fontWeight: 'bold',
	},
	wrapper: {
		flex: 1,
		paddingVertical: 30,
		...theme.shadows.dark,
	},
	horizontalWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	inputContainer: {
		marginVertical: 20,
	},
	text: {
		fontSize: 18,
		color: theme.colors.threePalet.primary,
		fontWeight: 'bold',
	},
	input: {
		fontSize: 18,
		paddingVertical: 5,
		paddingHorizontal: 15,
		textAlign: 'center',
		borderRadius: 14,
		...theme.shadows.dark,
	},
});

export default styles;