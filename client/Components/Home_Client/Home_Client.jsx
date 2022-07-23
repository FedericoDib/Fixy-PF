import React from "react";
import { useFonts } from 'expo-font';
//import AppLoading from "expo-app-loading";
import {
  Flex,
  Spacer,
  Box,
  Text,
  IconButton,
  Button,
  Wrap,
} from "@react-native-material/core";
import Logo from "../../assets/FIXy.svg";
import { 
  Exo2_100Thin,
  Exo2_100Thin_Italic,
  Exo2_200ExtraLight,
  Exo2_200ExtraLight_Italic,
  Exo2_300Light,
  Exo2_300Light_Italic,
  Exo2_400Regular,
  Exo2_400Regular_Italic,
  Exo2_500Medium,
  Exo2_500Medium_Italic,
  Exo2_600SemiBold,
  Exo2_600SemiBold_Italic,
  Exo2_700Bold,
  Exo2_700Bold_Italic,
  Exo2_800ExtraBold,
  Exo2_800ExtraBold_Italic,
  Exo2_900Black,
  Exo2_900Black_Italic 
} from '@expo-google-fonts/exo-2'

import Icon from "@expo/vector-icons/MaterialIcons";
import Icon2 from "@expo/vector-icons/FontAwesome5";

const Home_Client = () => {


  let [fontsLoaded, error] = useFonts({
    Exo2_100Thin,
    Exo2_100Thin_Italic,
    Exo2_200ExtraLight,
    Exo2_200ExtraLight_Italic,
    Exo2_300Light,
    Exo2_300Light_Italic,
    Exo2_400Regular,
    Exo2_400Regular_Italic,
    Exo2_500Medium,
    Exo2_500Medium_Italic,
    Exo2_600SemiBold,
    Exo2_600SemiBold_Italic,
    Exo2_700Bold,
    Exo2_700Bold_Italic,
    Exo2_800ExtraBold,
    Exo2_800ExtraBold_Italic,
    Exo2_900Black,
    Exo2_900Black_Italic 
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Flex inline justify="space-between" style={{fontFamily: "Exo2_400Regular"}}>
        <Box m={30}>
          <Text style={{fontFamily: "Exo2_700Bold_Italic"}} variant="h6">Hi, Federico</Text>
          <Text style={{fontFamily: "Exo2_400Regular"}}>How can we help you?</Text>
        </Box>
        <Box m={30}>
          <IconButton
            icon={(props) => <Icon name="notifications" {...props} />}
          />
        </Box>
      </Flex>
      <Flex fill>
        <Wrap m={4}>
          <Box
            ml={10}
            w={180}
            h={50}
            style={{
              backgroundColor: "#faf089",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Text style={{fontFamily: "Exo2_400Regular"}}>Active solutions: 0</Text>
          </Box>
          <Box
            ml={10}
            w={180}
            h={50}
            style={{
              backgroundColor: "#fed7e2",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Text style={{fontFamily: "Exo2_400Regular"}}>Finished solutions: 0</Text>
          </Box>
        </Wrap>
        <Box mh={30}>
        <Logo alignSelf="center" width={300} heigth={300} />
          <Button
            titleStyle={{fontFamily: "Exo2_600SemiBold"}}
            title="I need a solution"
            trailing={(props) => <Icon2 name="house-damage" {...props} />}
          />
        </Box>
      </Flex>
    </>
  );
};

export default Home_Client;
