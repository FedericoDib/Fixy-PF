import { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import theme from '../../theme/theme';

const Loader = ({ text, navigation }) => {
	const professionals = useSelector((state) => state.professionals);

	useEffect(() => {
		if (professionals.length) navigation.navigate('List',{ data: '' });
	}, []);

	return (
		<View style={styles.container}>
			<Image source={require('../../assets/load.gif')} style={styles.image} />
			<Text style={styles.text}>Buscando profesionales</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f1f1f1',
	},
	image: {
		width: 170,
		height: 150,
		marginBottom: 20,
	},
	text: {
		textAlign: 'center',
		fontSize: 20,
		textTransform: 'uppercase',
	},
});

export default Loader;
