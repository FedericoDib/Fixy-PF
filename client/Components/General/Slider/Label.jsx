import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../theme/theme';

const Label = ({ text, ...restProps }) => {
	return (
		<View style={styles.root} {...restProps}>
			<Text style={styles.text}>{`${text}:00`}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
		padding: 8,
		backgroundColor: theme.colors.threePalet.secondary,
		borderRadius: 4,
	},
	text: {
		fontSize: 16,
		color: '#010101',
	},
});

export default memo(Label);
