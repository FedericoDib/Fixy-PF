import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Alert,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import Gallery from "react-native-image-gallery";

export default function ShowImage(props) {
  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width;

  const images = [];
  for (let i = 0; i < props.route.params.image.length; i++) {
    images.push({ source: { uri: props.route.params.image[i] } });
  }

  return (
    <Gallery
      style={{ flex: 1, backgroundColor: "black" }}
      images={images}
      // images={[
      //     {
      //         source: { uri: props.route.params.image[0] },
      //     },
      //     { source: { uri: props.route.params.image[1] } },
      //     { source: { uri: props.route.params.image[2] } },
      //     { source: { uri: props.route.params.image[3] } },
      // ]}
    />
    // <View
    //     style={{
    //         flex: 1,
    //         justifyContent: "center",
    //         alignItems: "center",
    //     }}
    // >
    //     <Image
    //         style={{
    //             height: imageHeight,
    //             width: imageWidth,
    //         }}
    //         source={{
    //             uri: props.route.params.image,
    //         }}
    //     />
    // </View>
  );
}
