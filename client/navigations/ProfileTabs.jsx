import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Profile from "../Components/Profile/Profile";
import ProfileReviews from "../Components/Profile/ProfileReviews";
import theme from "../theme/theme";

const Tab = createMaterialTopTabNavigator();

function ProfileTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 20, color: "#fff" },
        tabBarStyle: {
          backgroundColor: theme.colors.threePalet.primary,
          paddingTop: 15,
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.threePalet.secondary,
        },
      }}
    >
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="Reseñas" component={ProfileReviews} />
    </Tab.Navigator>
  );
}

export default ProfileTabs;
