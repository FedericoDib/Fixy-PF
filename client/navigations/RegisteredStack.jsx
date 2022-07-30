import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home_Client from "../Components/Home_Client/Home_Client";
import Tabs from "../Components/BottomTabNavigation/BottomTabNavigation";
import List from "../Components/List/List";
import Resume from "../Components/Resume/Resume";
import SolutionScreen from "../Components/SolutionForm/SolutionForm";
import Pay from "../Components/Pay/Pay";
import BudgetForm from "../Components/BudgetForm/BudgetForm";
import RequestDetail from "../Components/RequestDetail/RequestDetail";
import Loader from "../Components/General/Loader";

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
        <Stack.Screen
          name="BudgetForm"
          component={BudgetForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SolutionForm"
          component={SolutionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Resume"
          component={Resume}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pay"
          component={Pay}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RequestDetail"
          component={RequestDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Loader"
          component={Loader}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RegisteredStack;
