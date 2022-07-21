import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Home_Client from '../Home_Client/Home_Client';
import Profile from '../Profile/Profile';
import Calendar from '../Calendar/Calendar';
import Explore from '../Explore/Explore';

const Tabs = () => {
	const Tab = createMaterialBottomTabNavigator();
	return (
		<Tab.Navigator>
			<Tab.Screen
				name='Home'
				component={Home_Client}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcons name='home' color={color} size={22} />
					),
				}}
			/>
			<Tab.Screen
				name='Explore'
				component={Explore}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcons name='search' color={color} size={22} />
					),
				}}
			/>
			<Tab.Screen
				name='Calendar'
				component={Calendar}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcons name='calendar' color={color} size={22} />
					),
				}}
			/>
			<Tab.Screen
				name='Profile'
				component={Profile}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcons name='user' color={color} size={22} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
