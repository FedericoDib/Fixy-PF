import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import { logOut } from "../../Redux/Action";
import PrimaryButton from "../General/PrimaryButton";
import styles from "./ProfileStyles";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Feather";

const DATA = [
  { id: 1, text: "3513611410" },
  { id: 2, text: "Ciudad" },
  { id: 3, text: "Barrio" },
  { id: 4, text: "P sherman calle wallaby 42" },
];
const Profile = () => {
  const [data, setdata] = useState(DATA);
  const [isRender, setisRender] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [inputText, setinputText] = useState();
  const [editItem, seteditItem] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const onPressItem = (item) => {
    setisModalVisible(true);
    setinputText(item.text);
    seteditItem(item.id);
  };

  const handleEditItem = (editItem) => {
    const newData = data.map((item) => {
      if (item.id == editItem) {
        item.text = inputText;
        return item;
      }
      return item;
    });
    setdata(newData);
    setisRender(!isRender);
  };

  const onPressSaveEdit = () => {
    handleEditItem(editItem); //guarda los cambios
    setisModalVisible(false); //cierra el modal
  };

  const handleLogOut = () => {
    dispatch(logOut());
    SecureStore.deleteItemAsync("key");
  };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.text}</Text>
          <TouchableOpacity onPress={() => onPressItem(item)}>
            <Icon name="edit" color="black" size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={{ marginTop: 70, alignItems: "center" }}>
        <Image
          style={styles.image}
          source={{
            uri: "https://fotos.perfil.com/2016/06/01/trim/900/900/0627-messi-perdon-g-tel.jpg",
          }}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={{ marginBottom: 30 }}>Leomessi@hotmail.com</Text>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          extraData={isRender}
        />
        <Modal
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => setisModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.text}>Editar campo:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setinputText(text)}
              defaultValue={inputText}
              editable={true}
              multiline={false}
              maxLength={200}
            />
            <TouchableOpacity
              onPress={() => onPressSaveEdit()}
              style={styles.touchableSave}
            >
              <Text style={styles.text}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* <TouchableHighlight onPress={handleLogOut}>
				<Text>Log Out</Text>
			 </TouchableHighlight> */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 120,
          }}
        >
          <PrimaryButton onPress={handleLogOut} title={"Cerrar Sesión"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
