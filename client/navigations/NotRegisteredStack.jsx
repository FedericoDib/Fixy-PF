import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../Components/OnBoarding/OnBoarding';
import Selection from '../Components/Selection/Selection';
import ClientSignUp from '../Components/SignUpForm/ClientSignUp/ClientSignUp';
import ProfessionalSignUp from '../Components/SignUpForm/ProfessionalSignUp/ProfessionalSignUp';

const Stack = createNativeStackNavigator();

const NotRegisteredStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
      <Stack.Screen
        name='OnBoarding'
        component={OnBoarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Selection'
        component={Selection}
        options={{ headerShown: false }}
      />
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
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default NotRegisteredStack