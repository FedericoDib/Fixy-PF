import React, { useRef, useState } from "react";
import { View, Text, FlatList, StyleSheet, Animated } from "react-native";
import slides from "./slides";
import OnBoardingItem from "./OnBoardingItem";
import Paginator from "./Paginator";

export default function OnBoarding({navigation}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChangue = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={style.container}>
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
      />
      <Paginator data={slides} scrollX={scrollX} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "yellow",
    paddingBottom: 55,
  },
});
