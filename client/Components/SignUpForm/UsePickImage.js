import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, Image, View } from "react-native";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../Redux/Action/generalActions";
import STYLES from "./ClientSignUp/ClientSignUpStyles";

const UsePickImage = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  // No permissions request is necessary for launching the image library
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        dispatch(uploadImage(result.uri));
        setImage(result.uri);
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
        quality: 1,
      });

      if (!result.cancelled) {
        dispatch(uploadImage(result.uri));
        setImage(result.uri);
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
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
      }}
    >
      <Image
        source={{
          uri:
            image ||
            "https://s3.amazonaws.com/keybase_processed_uploads/398203e5f8b2e5dbb9be1421b4738405_360_360.png",
        }}
        style={{ width: 200, height: 200, marginBottom: 10, borderRadius: 100 }}
      />
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Button
          style={{ color: "red" }}
          title="Elige una foto de tu Galeria"
          onPress={pickImage}
        />
        <View
          style={{
            marginTop: 5,
          }}
        ></View>
        <Button
          style={STYLES.btnGalery}
          title="Toma una foto"
          onPress={takePhotoFromCamera}
        />
      </View>
    </View>
  );
};
export default UsePickImage;
