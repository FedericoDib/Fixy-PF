import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Profile from '../Profile/Profile';
import Calendar from '../Calendar/Calendar';
import Explore from '../Explore/Explore';
import List from '../List/List';
import HomeClient from '../HomeClient/HomeClient';
import { useSelector } from 'react-redux';
import HomeProfessional from '../HomeProfessional/HomeProfessional';
import ProfileTabs from '../../navigations/ProfileTabs';

const Tabs = () => {
	const Tab = createMaterialBottomTabNavigator();
	const user = useSelector((state) => state.generalReducer.user);

	return (
		<Tab.Navigator
			barStyle={{ backgroundColor: '#493d8a', paddingVertical: 5 }}
		>
			<Tab.Screen
				name='Home'
				component={user.googleId[0] === 'c' ? HomeClient : HomeProfessional}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcons name='home' color={color} size={22} />
					),
				}}
			/>
			{/* <Tab.Screen
				name='List'
				component={List}
				initialParams={{ data: 'holaaaa' }}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcons name='search' color={color} size={22} />
					),
				}}
			/> */}
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
				component={ProfileTabs}
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
