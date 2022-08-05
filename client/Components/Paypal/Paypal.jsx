import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import {
    paypalPrice,
    setStatusRequestToActive,
} from "../../Redux/Action/clientActions";
import styles from "./PayPalStyle";
import Icon from "react-native-vector-icons/FontAwesome";

const Paypal = ({ route, navigation }) => {
    const budget = useSelector((state) => state.generalReducer.budgetDetail);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        showModal: false,
        status: "Pending",
    });

    const handleResponse = (data) => {
        if (data.title === "success") {
            dispatch(setStatusRequestToActive(budget.id));
            setState({ showModal: false, status: "Complete" });
            navigation.popToTop();
        } else if (data.title === "cancel") {
            setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <Modal
                visible={state.showModal}
                onRequestClose={() => setState({ showModal: false })}
            >
                <WebView
                    source={{
                        uri: `http://192.168.0.11:3000/paypal/paypal?price=${
                            500
                            // route.params.price
                        }`,
                    }}
                    onNavigationStateChange={(data) => handleResponse(data)}
                    injectedJavaScript={`document.f1.submit()`}
                />
            </Modal>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setState({ showModal: true });
                        dispatch(
                            paypalPrice(
                                500
                                // route.params.price
                            )
                        );
                    }}
                    style={[styles.button]}
                >
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Icon
                            onPress={() => {
                                Alert.alert("Llamado");
                            }}
                            name="paypal"
                            size={50}
                            color="#002E81"
                        ></Icon>
                        <View style={{ marginTop: 12, marginLeft: 15 }}>
                            <Text style={styles.textButton}>
                                Pagar con Paypal
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View
                    style={[
                        styles.centerField,
                        {
                            alignItems: "center",
                        },
                    ]}
                >
                    <Text>Estado del pago: {state.status}</Text>
                </View>
            </View>
            {/* <TouchableOpacity
                style={{ width: 300, height: 100 }}
                onPress={() => {
                    setState({ showModal: true });
                    dispatch(
                        paypalPrice(
                            500
                            // route.params.price
                        )
                    );
                }}
            >
                <Text>Pay with Paypal</Text>
            </TouchableOpacity> */}
        </View>
    );
};

export default Paypal;
