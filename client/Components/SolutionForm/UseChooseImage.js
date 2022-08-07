import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
	Button,
	Image,
	View,
	TouchableHighlight,
	ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../Redux/Action/generalActions';

const UseChooseImage = ({ navigation }) => {
	const [images, setImages] = useState([]);
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
				quality: 1,
			});

			if (!result.cancelled) {
				dispatch(uploadImage(result.uri));
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
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: 20,
				borderColor: 'grey',
				borderWidth: 1,
				borderRadius: 20,
				padding: 5,
			}}>
			{images ? (
				<View style={{ alignItems: 'center' }}>
					{images.map((photo) => {
						return (
							<TouchableHighlight
								onPress={() =>
									navigation.navigate('ShowImage', {
										image: photo,
									})
								}>
								<Image
									style={{ marginVertical: '1%' }}
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
					flexDirection: 'column',
				}}>
				<Button title='Elige una foto de tu Galeria' onPress={pickImage} />
				<View
					style={{
						marginTop: 5,
					}}></View>
				<Button title='Toma una foto' onPress={takePhotoFromCamera} />
			</View>
		</View>
	);
};
export default UseChooseImage;
