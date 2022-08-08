import React, { useState } from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { messageToAdmin } from "../../Redux/Action/generalActions";

const SupportForm = ({ navigation }) => {
  const user = useSelector((state) => state.generalReducer.user);
  const dispatch = useDispatch();
  const [message, setMessage] = useState({});
  return (
    <View style={{ flex: 1 }}>
      <Text>ASUNTO</Text>
      <TextInput
        placeholder="asunto"
        onChangeText={(text) => setMessage({ ...message, affair: text })}
      />
      <Text>MENSAJE</Text>
      <TextInput
        placeholder="asunto"
        onChangeText={(text) => setMessage({ ...message, message: text })}
      />

      <TouchableHighlight
        onPress={() => {
          dispatch(
            messageToAdmin({
              idUser: user.googleId,
              message: message.message,
              asunto: message.affair,
            })
          );
          navigation.goBack();
        }}
      >
        <Text>Enviar</Text>
      </TouchableHighlight>
    </View>
  );
};

export default SupportForm;
