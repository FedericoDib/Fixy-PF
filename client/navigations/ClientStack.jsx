import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "../Components/BottomTabNavigation/BottomTabNavigation";
import Resume from "../Components/Resume/Resume";
import SolutionScreen from "../Components/SolutionForm/SolutionForm";
import Pay from "../Components/Pay/Pay";
import BudgetForm from "../Components/BudgetForm/BudgetForm";
import RequestDetail from "../Components/RequestDetail/RequestDetail";
import Loader from "../Components/General/Loader";
import BudgetDetail from "../Components/BudgetDetail/BudgetDetail";
import UserDetail from "../Components/UserDetail/UserDetail";
import Paypal from "../Components/Paypal/Paypal";
import ProfessionalList from "../Components/List/ProfessionalList/ProfessionalList";
import BudgetList from "../Components/List/BudgetList/BudgetList";
import RequestList from "../Components/List/RequestList/RequestList";
import Review from "../Components/Review/Review";
import ShowImage from "../Components/ShowImage/ShowImage";
import SupportForm from "../Components/SupportForm/SupportForm";
import theme from "../theme/theme";

const Stack = createNativeStackNavigator();

const ClientStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.threePalet.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="HomeClient"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BudgetList"
          component={BudgetList}
          options={{ headerShown: true, title: "Presupuestos" }}
        />
        <Stack.Screen
          name="SolutionForm"
          component={SolutionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfessionalList"
          component={ProfessionalList}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ShowImage" component={ShowImage} options={{ headerShown: false }} />
        <Stack.Screen
          name="RequestList"
          component={RequestList}
          options={{ headerShown: true, title: "Solicitudes" }}
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
        <Stack.Screen name="BudgetDetail" component={BudgetDetail} options={{ headerShown: false }} />
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
        <Stack.Screen
          name="Review"
          component={Review}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SupportForm"
          component={SupportForm}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ClientStack;
