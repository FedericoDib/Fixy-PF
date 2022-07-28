import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: "10%",
        marginHorizontal: "5%",
    },
    textContainer: {
        marginVertical: "0.5%",
    },
    centerField: {
        backgroundColor: "#9BBBFC",
        padding: "2%",
        borderRadius: 10,
        alignItems: "baseline",
        justifyContent: "flex-start",
        marginTop: "2%",
    },
    button: {
        backgroundColor: "#F9CE67",
        borderRadius: 10,
        marginTop: "5%",
    },
    textButton: {
        padding: "2.5%",
        borderRadius: 10,
        alignItems: "center",
    },
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden",
        marginVertical: "2%",
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
    textCardContainer: {
        display: "flex",
        flex: 4,
    },
    nameAndReviewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: "5%",
    },
    reviewContainer: {
        flexDirection: "row",
        backgroundColor: "#FFF5E7",
        padding: "2%",
        borderRadius: 10,
        paddingHorizontal: "5%",
        justifyContent: "space-around",
        width: "30%",
    },
    starOff: {
        color: "#C1C0C0",
    },
    starOn: {
        color: "#E1C85A",
    },
});

export default style;
