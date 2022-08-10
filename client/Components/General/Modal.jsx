import React from 'react';
import { Modal, View, Animated, StyleSheet } from 'react-native';

const ModalPoup = ({ visible, children }) => {
	const [showModal, setShowModal] = React.useState(visible);
	const scaleValue = React.useRef(new Animated.Value(0)).current;
	React.useEffect(() => {
		toggleModal();
	}, [visible]);
	const toggleModal = () => {
		if (visible) {
			setShowModal(true);
			Animated.spring(scaleValue, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		} else {
			setTimeout(() => setShowModal(false), 200);
			Animated.timing(scaleValue, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
	};
	return (
		<Modal transparent visible={showModal}>
			<View style={styles.modalBackGround}>
				<Animated.View
					style={[
						styles.modalContainer,
						{ transform: [{ scale: scaleValue }] },
					]}
				>
					{children}
				</Animated.View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalBackGround: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		width: '80%',
		backgroundColor: 'white',
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 20,
		elevation: 20,
	},
});

export default ModalPoup;
