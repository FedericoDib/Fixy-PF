import React, { useState, useCallback, useEffect } from "react";
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
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { editProfile, logOut } from "../../Redux/Action/generalActions";
import PrimaryButton from "../General/PrimaryButton";
import styles from "./ProfileStyles";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import * as GoogleSignIn from "expo-google-sign-in";
import { useFocusEffect } from "@react-navigation/native";
import UseGeolocation from "../SignUpForm/UseGeolocation";
import Loader from "../General/Loader";
import PrimarySlider from "../General/Slider/Slider";
import theme from "../../theme/theme";

const Profile = () => {
  const [isRender, setisRender] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [inputText, setinputText] = useState();
  const [editItem, seteditItem] = useState();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.generalReducer.user);
  const [minTime, setMinTime] = useState(
    user.googleId[0] === "c" ? null : user.availableTimes[0]
  );
  const [maxTime, setMaxTime] = useState(
    user.googleId[0] === "c" ? null : user.availableTimes[1]
  );
  const { width, height } = Dimensions.get("screen");
  const dispatch = useDispatch();
  const { address, location } = UseGeolocation();
  const [refreshing, setRefreshing] = useState(false);
  const [ref, setRef] = useState([]);
  const DATA =
    user.googleId[0] === "p"
      ? [
          { id: 1, type: "phoneNumber", text: `${user.phoneNumber}` },
          { id: 2, type: "province", text: `${user.province}` },
          { id: 3, type: "city", text: `${user.city}` },
          { id: 4, type: "address", text: `${user.address}` },
          { id: 5, type: "enrollment", text: `${user.enrollment}` },
        ]
      : [
          { id: 1, type: "phoneNumber", text: `${user.phoneNumber}` },
          { id: 2, type: "province", text: `${user.province}` },
          { id: 3, type: "city", text: `${user.city}` },
          { id: 4, type: "address", text: `${user.address}` },
        ];
  const [data, setdata] = useState(DATA);
  const onPressItem = (item) => {
    setisModalVisible(true);
    setinputText(setDefault(item));
    seteditItem(item.id);
  };

  const [input, setInput] = useState({
    id: user.googleId,
    phoneNumber: user.phoneNumber,
    province: user.province,
    city: user.city,
    address: user.address,
  });

  useEffect(() => {
    if (address) setLoading(false);
  }, [address]);

  useFocusEffect(
    useCallback(() => {
      setRefreshing(false);
      setRefreshing(true);
    }, [user])
  );

  const handleEditItem = (editItem) => {
    const newData = data.map((item) => {
      if (item.id == editItem) {
        item.text = inputText;
        return item;
      }
      return item;
    });
    setdata(newData);
    //setisRender(!isRender);
  };
  const handleLogOut = () => {
    GoogleSignIn.signOutAsync();
    SecureStore.deleteItemAsync("key");
    dispatch(logOut());
  };

  const onPressSaveEdit = () => {
    handleEditItem(editItem); //guarda los cambios
    setisModalVisible(false); //cierra el modal
    switch (editItem) {
      case 1:
        setInput({ ...input, phoneNumber: inputText });
        dispatch(editProfile(input));
        break;
      case 2:
        setInput({ ...input, province: inputText });
        dispatch(editProfile(input));
        break;
      case 3:
        setInput({ ...input, city: inputText });
        dispatch(editProfile(input));
        break;
      case 4:
        setInput({ ...input, address: inputText });
        dispatch(editProfile(input));
        break;
      case 5:
        setInput({ ...input, enrollment: inputText });
        dispatch(editProfile(input));

      default:
        break;
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          marginVertical: 6,
          alignItems: "flex-start",
          width: "90%",
        }}
      >
        <Text style={{ marginLeft: 21 }}>
          {item.type === "phoneNumber"
            ? "Número de Telefono"
            : item.type === "province"
            ? "Provincia"
            : item.type === "city"
            ? "Ciudad"
            : item.type === "address"
            ? "Dirección"
            : item.type === "enrollment"
            ? "Número de Matricula"
            : ""}
        </Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.text}</Text>
          <TouchableOpacity onPress={() => onPressItem(item)}>
            <Icon name="edit" color="black" size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  function setDefault(item) {
    if (item.type === "province") {
      if (!address[3]) return address[1];
      return address[2];
    } else if (item.type === "city") {
      return address[1];
    } else if (item.type === "address") {
      return address[0];
    } else {
      return item.text;
    }
  }

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={{ padding: 15 }}>
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <Image
              style={styles.image}
              source={{
                uri: user.perfilPic
                  ? `${user.perfilPic}`
                  : "https://i.pinimg.com/originals/b8/08/07/b8080715de29eabbbba78c1b2c9d70be.png",
              }}
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={{ marginBottom: 30 }}>{user.email}</Text>
          </View>
          <View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              extraData={refreshing}
            />
            <Modal
              animationType="fade"
              visible={isModalVisible}
              onRequestClose={() => setisModalVisible(false)}
            >
              <View style={{ padding: 20 }}>
                <View style={styles.modalView}>
                  <Text style={styles.text}>Editar campo:</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setinputText(text)}
                    defaultValue={inputText}
                    // setInput={...input, }
                    editable={true}
                    multiline={false}
                    maxLength={200}
                  />
                  <TouchableOpacity
                    onPress={() => onPressSaveEdit()}
                    style={styles.touchableSave}
                  >
                    <Text style={{ fontSize: 18 }}>Guardar cambios</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {user.googleId[0] === "c" ? null : (
              <View style={{ padding: 20 }}>
                <PrimarySlider
                  min={0}
                  max={24}
                  low={minTime}
                  high={maxTime}
                  setMinTime={setMinTime}
                  setMaxTime={setMaxTime}
                />

                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 2,
                      alignItems: "center",
                      width: "60%",
                      borderRadius: 5,
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      backgroundColor: theme.colors.threePalet.secondary,
                    }}
                    onPress={() =>
                      dispatch(
                        editProfile({
                          ...input,
                          availableTimes: [minTime, maxTime],
                        })
                      )
                    }
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      Guardar nuevo horario
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View
              style={{
                alignItems: "center",
                justifyContent: "flex-end",
                // marginTop: 60,
                marginVertical: 30,
              }}
            >
              <PrimaryButton onPress={handleLogOut} title={"Cerrar Sesión"} />
            </View>
          </View>
          {/* <Text>HOLAAAA</Text> */}
        </ScrollView>
      )}
    </React.Fragment>
  );
};

export default Profile;
