import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: "25%",
        marginHorizontal: "7%",
    },
    calendarPhoneContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textContainer: {
        marginVertical: "2%",
    },
    centerField: {
        backgroundColor: "#77ADF2",
        padding: "3%",
        borderRadius: 10,
        alignItems: "center",
        marginTop: "3%",
    },
    endField: {
        backgroundColor: "#77ADF2",
        padding: "3%",
        borderRadius: 10,
        alignItems: "flex-end",
        marginTop: "1%",
        width: "45%",
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
