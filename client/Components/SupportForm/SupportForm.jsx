import React, { useState } from "react";
import { View, Text, TextInput, TouchableHighlight, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { messageToAdmin } from "../../Redux/Action/generalActions";
import theme from "../../theme/theme";
import { Ionicons } from "@expo/vector-icons";
import style from "./SupportFormStyle";

const SupportForm = ({ navigation }) => {
  const user = useSelector((state) => state.generalReducer.user);
  const dispatch = useDispatch();
  const [message, setMessage] = useState({});
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.threePalet.primary }}>
      <View style={style.mainContainer}>
        <View style={style.container}>
          <View style={style.titleContainer}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ paddingVertical: 5, marginBottom: 10}}
            >
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.colors.threePalet.primary}
            />
          </Pressable>
          <Text style={style.mainTitle}>CONTACTAR AL SOPORTE</Text>
        </View>
        <Text style={style.label}>Asunto:</Text>
        <View style={style.inputContainer}>
        <TextInput
          placeholder="Asunto..."
          onChangeText={(text) => setMessage({ ...message, affair: text })}
          style={style.input}
        />
      </View>
      <Text  style={style.label}>Mensaje:</Text>
      <TextInput
							multiline
							numberOfLines={5}
							style={{
              marginTop: 10,
							borderWidth: 2,
							borderRadius: 5,
							width: "100%",
							borderColor: theme.colors.threePalet.secondary,
							padding: 10,
							textAlignVertical: "top",
              fontSize: 20,
							}}
							onChangeText={(text) => setMessage({ ...message, message: text })}
							placeholder="Escriba su mensaje..."
						/>
      <TouchableHighlight
      style={style.button}
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
        <Text style={style.text}>Enviar</Text>
      </TouchableHighlight>
    </View>
    </View>
    </View>
  );
};

export default SupportForm;
