import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: "8%",
        marginHorizontal: 20,
    },
    calendarPhoneContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    calendarContainer: {
        padding: 10,
        paddingHorizontal: 40,
        backgroundColor: "#E8E8F5",
        borderRadius: 10,
        flexDirection: "row",
    },
    phoneContainer: {
        backgroundColor: "#E8E8F5",
        padding: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "40%",
    },
    textContainer: {
        marginVertical: 10,
    },
    centerField: {
        backgroundColor: "#9BBBFC",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    endField: {
        backgroundColor: "#9BBBFC",
        padding: 10,
        borderRadius: 10,
        alignItems: "flex-end",
        marginTop: 10,
        width: 130,
    },
    button: {
        backgroundColor: "#F9CE67",
        borderRadius: 10,
        marginTop: 10,
    },
    textButton: {
        padding: 8,
        borderRadius: 10,
        alignItems: "center",
    },
    imageContainer: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
    buttonContainer: {
        flexDirection: "row",
        flex: 1,
    },
    restContainer: {
        flex: 10,
    },
});

export default style;
