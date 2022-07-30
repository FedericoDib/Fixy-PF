import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Home_Client from '../Home_Client/Home_Client';
import Profile from '../Profile/Profile';
import Calendar from '../Calendar/Calendar';
import Explore from '../Explore/Explore';
import List from '../List/List';

const Tabs = () => {
	const Tab = createMaterialBottomTabNavigator();
	return (
		<Tab.Navigator
			barStyle={{ backgroundColor: '#493d8a', paddingVertical: 10 }}
		>
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
				name='List'
				component={List}
				initialParams={{ data: 'holaaaa' }}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcons name='search' color={color} size={22} />
					),
				}}
			/>
			<Tab.Screen
				name='Calendario'
				component={Calendar}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcons name='calendar' color={color} size={22} />
					),
				}}
			/>
			<Tab.Screen
				name='Perfil'
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
