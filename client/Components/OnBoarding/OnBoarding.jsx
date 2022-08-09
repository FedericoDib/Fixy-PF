import React, { useRef, useState } from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Animated,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import slides from './slides';
import OnBoardingItem from './OnBoardingItem';
import Paginator from './Paginator';
import theme from '../../theme/theme';

export default function OnBoarding({ navigation }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const viewableItemsChangue = useRef(({ viewableItems }) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;
	const scrollX = useRef(new Animated.Value(0)).current;
	const slidesRef = useRef(null);
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	const scrollTo = () => {
		if (currentIndex < slides.length - 1) {
			slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
		} else {
			navigation.navigate('Selection');
		}
	};

	return (
		<View style={style.container}>
			<View style={{ flex: 5 }}>
				<FlatList
					data={slides}
					renderItem={({ item }) => <OnBoardingItem item={item} />}
					horizontal
					pagingEnabled
					bounces={false}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: {
										x: scrollX,
									},
								},
							},
						],
						{
							useNativeDriver: false,
						}
					)}
					onViewableItemsChanged={viewableItemsChangue}
					viewabilityConfig={viewConfig}
					ref={slidesRef}
					showsHorizontalScrollIndicator={false}
				/>
			</View>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					width: '70%',
				}}
			>
				<View
					style={{
						width: '100%',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<TouchableOpacity
						onPress={() => navigation.navigate('Selection')}
						style={[
							style.btnNyP,
							{
								backgroundColor: 'transparent',
								borderWidth: 1,
								borderColor: '#493d8a',
							},
						]}
					>
						<Text
							style={{ color: '#493d8a', fontWeight: 'bold', fontSize: 18 }}
						>
							Saltar
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => scrollTo()} style={style.btnNyP}>
						<Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
							Siguiente
						</Text>
					</TouchableOpacity>
				</View>
				<Paginator data={slides} scrollX={scrollX} />
			</View>
		</View>
	);
}

const { height, width } = Dimensions.get('screen');
const style = StyleSheet.create({
	container: {
		width,
		height,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#D6D4D8',
		//paddingBottom: 55,
	},
	btnNyP: {
		backgroundColor: '#493d8a',
		height: 50,
		borderRadius: 5,
		justifyContent: 'center',
		width: '45%',
		alignItems: 'center',
	},
});
