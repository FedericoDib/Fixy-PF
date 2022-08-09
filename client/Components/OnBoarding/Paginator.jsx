import React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native';

export default function Paginator({ data, scrollX }) {
	const { width } = useWindowDimensions();
	return (
		<View style={style.container}>
			{data.map((_, i) => {
				const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 20, 10],
					extrapolate: 'clamp',
				});
				return (
					<Animated.View
						style={[style.dot, { width: dotWidth }]}
						key={i.toString()}
					/>
				);
			})}
		</View>
	);
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		height: 64,
	},
	dot: {
		height: 10,
		borderRadius: 5,
		backgroundColor: '#493d8a',
		marginHorizontal: 8,
	},
});
