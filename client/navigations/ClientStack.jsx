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
import BudgetDetail from "../Components/BudgetDetail/BudgetDetail";
import UserDetail from "../Components/UserDetail/UserDetail";
import Paypal from "../Components/Paypal/Paypal";

const Stack = createNativeStackNavigator();

const ClientStack = () => {
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
        <Stack.Screen
          name="BudgetDetail"
          component={BudgetDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileDetail"
          component={UserDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Paypal"
          component={Paypal}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ClientStack;