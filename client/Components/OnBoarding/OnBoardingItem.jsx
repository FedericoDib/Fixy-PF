import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	useWindowDimensions,
	ScrollView,
} from 'react-native';
import Constants from 'expo-constants';

export default function OnBoardingItem({ item }) {
	const { width, height } = useWindowDimensions();
	return (
		<View style={[styles.container, { width, height }]}>
			<Image
				source={item.image}
				style={[styles.image, { width, resizeMode: 'contain' }]}
			/>
			<View style={{ flex: 0.3 }}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		flex: 0.5,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 100,
		backgroundColor: 'transparent',
	},
	title: {
		fontWeight: '800',
		fontSize: 28,
		marginBottom: 10,
		color: '#493d8a',
		textAlign: 'center',
	},
	description: {
		fontWeight: '300',
		textAlign: 'center',
		paddingHorizontal: 64,
		color: '#62656b',
	},
});
