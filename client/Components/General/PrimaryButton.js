import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import theme from "../../theme/theme";

const PrimaryButton = ({ title, onPress, color, disabled }) => {
    return (
        <TouchableHighlight
            disabled={disabled}
            onPress={onPress}
            style={[
                styles.button,
                // {
                //   backgroundColor:
                //     color == "primary"
                //       ? "theme.colors.threePalet.primary"
                //       : "theme.colors.threePalet.primaryLight",
                // },
            ]}
        >
            <Text
                style={[
                    styles.text,
                    {
                        // backgroundColor:
                        //   color == "primary"
                        //     ? "theme.colors.threePalet.ligth"
                        //     : "theme.colors.threePalet.ligth",
                    },
                ]}
            >
                {title}
            </Text>
        </TouchableHighlight>
    );
};
const styles = StyleSheet.create({
    button: {
        width: 350,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 15,
        backgroundColor: theme.colors.threePalet.primary,
    },
    text: {
        textTransform: "uppercase",
        fontWeight: "bold",
        color: theme.colors.threePalet.light,
    },
});

export default PrimaryButton;
