import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import Main from "./Components/Main/Main";

export default function App() {
<<<<<<< HEAD
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Main />
            </NavigationContainer>
        </Provider>
    );
=======
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
>>>>>>> c474df0fc370f27ca5fa254790266f0c3f0dadd5
}
