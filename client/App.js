import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import Main from "./Components/Main/Main";

export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
