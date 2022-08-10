import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from 'rn-range-slider';

import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Notch from './Notch';
import Label from './Label';

import theme from '../../../theme/theme';

const PrimarySlider = ({ min, max, low, high, setMinTime, setMaxTime }) => {
	const [rangeDisabled, setRangeDisabled] = useState(false);
	//const [low, setLow] = useState(0);
	// const [high, setHigh] = useState(24);
	// const [min, setMin] = useState(0);
	// const [max, setMax] = useState(24);
	const [floatingLabel, setFloatingLabel] = useState(true);

	const renderThumb = useCallback(() => <Thumb />, []);
	const renderRail = useCallback(() => <Rail />, []);
	const renderRailSelected = useCallback(() => <RailSelected />, []);
	const renderLabel = useCallback((value) => <Label text={value} />, []);
	const renderNotch = useCallback(() => <Notch />, []);
	const handleValueChange = useCallback((low, high) => {
		setMinTime(low);
		setMaxTime(high);
	}, []);

	return (
		<View style={styles.root}>
			<Slider
				style={styles.slider}
				min={min}
				max={max}
				step={1}
				disableRange={rangeDisabled}
				floatingLabel={floatingLabel}
				renderThumb={renderThumb}
				renderRail={renderRail}
				renderRailSelected={renderRailSelected}
				renderLabel={renderLabel}
				renderNotch={renderNotch}
				onValueChanged={handleValueChange}
			/>
			<View style={styles.horizontalContainer}>
				<Text style={styles.valueText}>{`${low}:00`}</Text>
				<Text style={styles.valueText}>{`${high}:00`}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		alignItems: 'stretch',
		paddingHorizontal: 12,
		height: 100,
		justifyContent: 'center',
		width: '100%',
	},
	slider: {},
	button: {},
	header: {
		alignItems: 'center',
		backgroundColor: 'black',
		padding: 12,
	},
	horizontalContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 5,
	},
	text: {
		color: 'white',
		fontSize: 20,
	},
	valueText: {
		width: 50,
		color: '#f1f1f1',
		fontSize: 14,
		fontWeight: 'bold',
	},
});

export default PrimarySlider;
