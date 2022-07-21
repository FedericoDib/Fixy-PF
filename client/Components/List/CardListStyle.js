import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 50,
        overflow: "hidden",
        margin: 10,
    },
    textName: {
        fontSize: 25,
    },
    textProfession: {
        fontSize: 20,
    },
    imageContainer: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        display: "flex",
        flex: 4,
    },
});

export default styles;
