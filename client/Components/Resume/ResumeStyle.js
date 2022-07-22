import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 100,
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
        paddingHorizontal: 40,
        borderRadius: 10,
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
});

export default style;
