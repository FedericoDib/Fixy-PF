import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import {
	paypalPrice,
	setStatusRequestToActive,
} from '../../Redux/Action/clientActions';
import styles from './PayPalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';

const Paypal = ({ route, navigation }) => {
	const budget = useSelector((state) => state.generalReducer.budgetDetail);
	const dispatch = useDispatch();
	const [state, setState] = useState({
		showModal: false,
		status: 'Pending',
	});

	const handleResponse = (data) => {
		if (data.title === 'success') {
			dispatch(setStatusRequestToActive(budget.id));
			setState({ showModal: false, status: 'Complete' });
			let toast = Toast.show('Pago realizado con exito!', {
				duration: Toast.durations.LONG,
				position: Toast.positions.BOTTOM,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
				backgroundColor: 'green',
			});

			setTimeout(function () {
				Toast.hide(toast);
			}, 1000);
			navigation.popToTop();
		} else if (data.title === 'cancel') {
			setState({ showModal: false, status: 'Cancelled' });
			let toast = Toast.show('Hubo un error con el pago', {
				duration: Toast.durations.LONG,
				position: Toast.positions.BOTTOM,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
				backgroundColor: 'red',
			});

			setTimeout(function () {
				Toast.hide(toast);
			}, 1000);
		} else {
			return;
		}
	};
	return (
		<View style={styles.mainContainer}>
			<Modal
				visible={state.showModal}
				onRequestClose={() => setState({ showModal: false })}
			>
				<WebView
					source={{
						uri: `http://192.168.0.11:3000/paypal/paypal?price=${route.params.price}`,
					}}
					onNavigationStateChange={(data) => handleResponse(data)}
					injectedJavaScript={`document.f1.submit()`}
				/>
			</Modal>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={() => {
						setState({ showModal: true });
						dispatch(paypalPrice(route.params.price));
					}}
					style={[styles.button]}
				>
					<View style={styles.iconAndTextContainer}>
						<Icon
							onPress={() => {
								Alert.alert('Llamado');
							}}
							name='paypal'
							size={50}
							color='#002E81'
						></Icon>
						<View style={styles.textButtonContainer}>
							<Text style={styles.textButton}>Pagar con Paypal</Text>
						</View>
					</View>
				</TouchableOpacity>
				<View style={[styles.centerField, styles.textContainer]}>
					<Text>Estado del pago: {state.status}</Text>
				</View>
			</View>
			{/* <TouchableOpacity
                style={{ width: 300, height: 100 }}
                onPress={() => {
                    setState({ showModal: true });
                    dispatch(
                        paypalPrice(
                            500
                            // route.params.price
                        )
                    );
                }}
            >
                <Text>Pay with Paypal</Text>
            </TouchableOpacity> */}
		</View>
	);
};

export default Paypal;
