import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home_Client from "../Components/Home_Client/Home_Client";
import Tabs from "../Components/BottomTabNavigation/BottomTabNavigation";

const Stack = createNativeStackNavigator();

const RegisteredStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="HomeClient"
          component={Tabs}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RegisteredStack;
