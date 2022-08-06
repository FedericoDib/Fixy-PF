import { StyleSheet } from "react-native";
import theme from "../../theme/theme";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    centerField: {
        backgroundColor: "#9BBBFC",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
        marginHorizontal: 10,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
    iconAndTextContainer: {
        flexDirection: "row",
    },
    button: {
        height: 100,
        backgroundColor: "#F9CE67",
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        padding: 5,
    },
    textButton: {
        textAlign: "center",
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "black ",
    },
    textButtonContainer: {
        marginTop: 12,
        marginLeft: 15,
    },
    textContainer: {
        alignItems: "center",
    },
});

export default styles;