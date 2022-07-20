import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from './Components/OnBoarding/OnBoarding';
import Login from './Components/Login/Login';

export default function App() {
	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Login'
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name='Onboarding' component={OnBoarding} />
				{/* <Stack.Screen name='Selection' component={Selection} />
				<Stack.Screen
					name='ProfessionalSignUp'
					component={ProfessionalSignUp}
				/>
				<Stack.Screen name='ClientSignUp' component={ClientSignUp} /> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
