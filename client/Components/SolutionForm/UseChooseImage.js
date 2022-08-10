import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import {
  Button,
  Image,
  View,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  getControllerPic,
  uploadImage,
  uploadImageRequest,
} from "../../Redux/Action/generalActions";
import theme from "../../theme/theme";
import STYLES from "../SignUpForm/ClientSignUp/ClientSignUpStyles";

const UseChooseImage = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getControllerPic(images.length));
    }, [images])
  );

  // No permissions request is necessary for launching the image library
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2,
      });

      if (!result.cancelled) {
        dispatch(uploadImageRequest(result.uri));
        setImages([...images, result.uri]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const takePhotoFromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2,
      });

      if (!result.cancelled) {
        dispatch(uploadImageRequest(result.uri));
        setImages([...images, result.uri]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        borderRadius: 20,
        padding: 5,
      }}
    >
      {images ? (
        <View style={{ alignItems: "center" }}>
          {images.map((photo) => {
            return (
              <TouchableHighlight>
                <Image
                  style={{ marginVertical: "3%", borderRadius: 24 }}
                  source={{
                    uri: photo,
                    width: 320,
                    height: 240,
                  }}
                />
              </TouchableHighlight>
            );
          })}
        </View>
      ) : (
        <View></View>
      )}

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: theme.colors.threePalet.secondary,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 8,
          }}
        >
          <Text
            style={{ color: theme.colors.threePalet.dark, fontWeight: "600" }}
          >
            Elegir una foto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={takePhotoFromCamera}
          style={{
            backgroundColor: theme.colors.threePalet.secondary,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 8,
          }}
        >
          <Text
            style={{ color: theme.colors.threePalet.dark, fontWeight: "600" }}
          >
            Tomar una foto
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UseChooseImage;
