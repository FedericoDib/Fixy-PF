import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from './Components/OnBoarding/OnBoarding';
import Login from './Components/Login/Login';
import { Provider } from 'react-redux/es/exports';
import store from './Redux/Store';
import Tabs from './Components/BottomTabNavigation/BottomTabNavigation';
import ClientSignUp from './Components/SignUpForm/ClientSignUp/ClientSignUp';

export default function App() {
	const Stack = createNativeStackNavigator();
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					{/*
						<Stack.Screen
							name='Login'
							component={Login}
							options={{ headerShown: false }}
						/> 
					<Stack.Screen name='Onboarding' component={OnBoarding} options={{ headerShown: false }}/>
					<Stack.Screen name='Selection' component={Selection} options={{ headerShown: false }}/>
				<Stack.Screen
					name='ProfessionalSignUp'
					component={ProfessionalSignUp}
					options={{ headerShown: false }}
				/>
						<Stack.Screen
							name='ClientSignUp'
							component={ClientSignUp}
							options={{ headerShown: false }}
						/>
					*/}
					<Stack.Screen
						name='HomeClient'
						component={Tabs}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
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
