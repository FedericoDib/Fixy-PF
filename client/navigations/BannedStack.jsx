import BannedScreen from "../Components/InfoViews/BannedScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SupportForm from "../Components/SupportForm/SupportForm";

const Stack = createNativeStackNavigator();

const BannedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BannedScreen"
        component={BannedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SupportForm"
        component={SupportForm}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BannedStack;
