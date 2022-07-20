import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home_Client from './Home_Client/Home_Client';

const Tabs = () => {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator>
			<Tab.Screen name='Home' component={Home_Client} />
			{/* <Tab.Screen name='Calendar' component={Calendar} />
			<Tab.Screen name='Profile' component={Profile} />
			<Tab.Screen name='Search' component={Search} /> */}
		</Tab.Navigator>
	);
};

export default Tabs;
