import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home_Client from './Home_Client/Home_Client';
import Profile from './Profile/Profile';
import Calendar from './Calendar/Calendar';
import Explore from './Explore/Explore';

const Tabs = () => {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator>
			<Tab.Screen
				name='Home'
				component={Home_Client}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name='Explore'
				component={Explore}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name='Calendar'
				component={Calendar}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name='Profile'
				component={Profile}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
