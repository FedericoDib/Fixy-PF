import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../Redux/Action/generalActions';
import STYLES from './ClientSignUp/ClientSignUpStyles';

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
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: 20,
			}}
		>
			<Button
				style={STYLES.btnGalery}
				title='Elige una foto de tu Galeria'
				onPress={pickImage}
			/>
			{image && (
				<Image
					source={{ uri: image }}
					style={{ width: 200, height: 200, marginTop: 10 }}
				/>
			)}
		</View>
	);
};
export default UsePickImage;
