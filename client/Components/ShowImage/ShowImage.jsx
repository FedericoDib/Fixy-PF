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

    return (
        <Gallery
            style={{ flex: 1, backgroundColor: "black" }}
            images={[
                {
                    source: { uri: props.route.params.image },
                    dimensions: { width: 150, height: 150 },
                },
                { source: { uri: props.route.params.image } },
                { source: { uri: props.route.params.image } },
                { source: { uri: props.route.params.image } },
                { source: { uri: props.route.params.image } },
            ]}
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
