import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	wrapper: {
		height: '30%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	mainTitle: {
		fontSize: 40,
		letterSpacing: 2,
		marginBottom: 10,
	},
	subTitle: {
		fontSize: 16,
		marginBottom: 'auto',
	},
	button: {
		paddingVertical: 20,
		paddingHorizontal: 60,
		borderRadius: 14,
		borderWidth: 1,
	},
});
