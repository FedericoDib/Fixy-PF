import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    mainContainer: {
        display: "flex",
        alignItems: "center",
        flex: 1,
        justifyContent: "space-around",
    },
    titleContainer:{
        flex: 1, 
        justifyContent:"center"
    },
    text: {
        color: "#8781B8",
        fontFamily: "sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 30,
    },
    buttonsContainer: {
        display: "flex",
        flex: 3,
        justifyContent: "space-around",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#ECE6E6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default style
