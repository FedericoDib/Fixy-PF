import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden",
        margin: 10,
        backgroundColor: "#FFFFFF",
    },
    textName: {
        fontSize: 15,
    },
    textProfession: {
        fontSize: 15,
        fontWeight: "bold",
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
        paddingLeft: "3%",
    },
    nameAndReviewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 10,
    },
    reviewContainer: {
        flexDirection: "row",
        backgroundColor: "#FFF5E7",
        padding: 4,
        borderRadius: 10,
        paddingHorizontal: 10,
        justifyContent: "space-around",
        width: 70,
    },
});

export default styles;
