import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../OnBoarding/OnBoarding';
import Login from '../Login/Login';
import Tabs from '../BottomTabNavigation/BottomTabNavigation';
import ClientSignUp from '../SignUpForm/ClientSignUp/ClientSignUp';
import { StyleSheet, Text, View } from 'react-native';

const Main = () => {
	const Stack = createNativeStackNavigator();
	const user = useSelector((state) => state.user);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Login'
				component={Login}
				options={{ headerShown: false }}
			/>
			{/* <Stack.Screen
      name='Onboarding'
      component={OnBoarding}
      options={{ headerShown: false }}
    /> */}
			{/* <Stack.Screen
      name='Selection'
      component={Selection}
      options={{ headerShown: false }}
    /> */}
			{/* <Stack.Screen
      name='ProfessionalSignUp'
      component={ProfessionalSignUp}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='ClientSignUp'
      component={ClientSignUp}
      options={{ headerShown: false }}
    /> */}

			{/* <Stack.Screen
      name="HomeClient"
      component={Tabs}
      options={{ headerShown: false }}
    /> */}
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Main;
