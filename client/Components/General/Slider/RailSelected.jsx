import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../../../theme/theme';

const RailSelected = () => {
	return <View style={styles.root} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
	root: {
		height: 4,
		backgroundColor: theme.colors.threePalet.secondary,
		borderRadius: 2,
	},
});
