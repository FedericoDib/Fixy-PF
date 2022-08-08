import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Profile from "../Components/Profile/Profile";
import ProfileReviews from "../Components/Profile/ProfileReviews";

const Tab = createMaterialTopTabNavigator();

function ProfileTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 20 },
        tabBarStyle: {
          backgroundColor: "transparent",
          paddingTop: 15,
        },
        tabBarIndicatorStyle: { backgroundColor: "black" },
      }}
    >
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="Reseñas" component={ProfileReviews} />
    </Tab.Navigator>
  );
}

export default ProfileTabs;
