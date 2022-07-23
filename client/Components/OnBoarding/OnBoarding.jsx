import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Alert,
  TouchableOpacity,
} from "react-native";
import slides from "./slides";
import OnBoardingItem from "./OnBoardingItem";
import Paginator from "./Paginator";
import { useNavigation } from "@react-navigation/native";

export default function OnBoarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

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
      Alert.alert("Estas en la ultima slide");
    }
  };
  return (
    <View style={style.container}>
      <View style={{ flex: 18 }}>
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
      </View>
      <View style={{ flex: 2 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "green",
            flex: 2,
          }}
        >
          <TouchableOpacity
            style={[
              style.btnNyP,
              {
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#493d8a",
              },
            ]}
          >
            <Text
              style={{ color: "#493d8a", fontWeight: "bold", fontSize: 18 }}
            >
              Skip
            </Text>
          </TouchableOpacity>
          <View style={{ width: 20 }}></View>
          <TouchableOpacity onPress={() => scrollTo()} style={style.btnNyP}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Paginator data={slides} scrollX={scrollX} />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 55,
    flex: 1,
  },
});
