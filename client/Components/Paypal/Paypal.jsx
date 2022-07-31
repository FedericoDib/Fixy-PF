import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { WebView } from "react-native-webview";

const Paypal = () => {
  const [state, setState] = useState({
    showModal: false,
    status: "Pending",
  });

  const handleResponse = (data) => {
    if (data.title === "success") {
      setState({ showModal: false, status: "Complete" });
    } else if (data.title === "cancel") {
      setState({ showModal: false, status: "Cancelled" });
    } else {
      return;
    }
  };
  return (
    <View style={{ marginTop: 100 }}>
      <Modal
        visible={state.showModal}
        onRequestClose={() => setState({ showModal: false })}
      >
        <WebView
          source={{ uri: "http://192.168.0.11:3000/paypal" }}
          onNavigationStateChange={(data) => handleResponse(data)}
          injectedJavaScript={`document.f1.submit()`}
        />
      </Modal>
      <TouchableOpacity
        style={{ width: 300, height: 100 }}
        onPress={() => setState({ showModal: true })}
      >
        <Text>Pay with Paypal</Text>
      </TouchableOpacity>
      <Text>Payment Status: {state.status}</Text>
    </View>
  );
};

export default Paypal;
