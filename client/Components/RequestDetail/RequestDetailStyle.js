import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const style = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: '#fff',
		borderRadius: 16,
		padding: 8,
		width: '100%',
		paddingHorizontal: 20,
	},
	textContainer: {
		marginVertical: '0.5%',
	},
	label: {
		fontSize: 18,
		fontWeight: 'bold',
		color: theme.colors.threePalet.primary,
	},
	desc: {
		fontSize: 18,
	},
	centerField: {
		backgroundColor: theme.colors.threePalet.secondary,
		marginVertical: 20,
		padding: '2%',
		borderRadius: 10,
		alignItems: 'center',
		marginTop: '2%',
		borderWidth: 1,
		borderColor: theme.colors.threePalet.primary,
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
	cardContainer: {
		display: 'flex',
		flexDirection: 'row',
		height: 120,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 15,
		marginVertical: '2%',
	},
	textName: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	textProfession: {
		fontSize: 15,
	},
	imageContainer: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textCardContainer: {
		flex: 1,
		display: 'flex',
		width: '40%',
		marginHorizontal: 20,
	},
	nameAndReviewContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginRight: '5%',
	},
	reviewContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#FFF5E7',
		padding: '2%',
		borderRadius: 10,
		paddingHorizontal: '1%',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},
	textos: {
		fontWeight: 'bold',
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
});

export default style;
