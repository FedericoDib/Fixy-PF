import BannedScreen from '../Components/InfoViews/BannedScreen';

const Stack = createNativeStackNavigator();

const BannedStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='BannedScreen'
				component={BannedScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default BannedStack;
