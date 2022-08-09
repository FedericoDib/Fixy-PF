import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../Redux/Action/generalActions';
import theme from '../../theme/theme';
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
				height: 250,
				alignItems: 'center',
				justifyContent: 'space-between',
				marginVertical: 10,
				borderRadius: 20,
			}}
		>
			<View
				style={{
					flex: 2,
					width: '100%',
					alignItems: 'center',
					paddingVertical: 10,
					marginBottom: 10,
				}}
			>
				<Image
					source={{
						uri:
							image ||
							'https://s3.amazonaws.com/keybase_processed_uploads/398203e5f8b2e5dbb9be1421b4738405_360_360.png',
					}}
					style={{
						width: 160,
						height: 160,
						marginBottom: 20,
						borderRadius: 100,
						borderWidth: 4,
						borderColor: theme.colors.threePalet.secondary,
					}}
				/>
			</View>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					width: '100%',
					justifyContent: 'space-around',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity onPress={pickImage}>
					<Text style={STYLES.btnGalery}>Elegir una foto</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={takePhotoFromCamera}>
					<Text style={STYLES.btnGalery}>Tomar una foto</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
export default UsePickImage;
