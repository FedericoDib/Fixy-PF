import React from "react";
import styled from "styled-components/native";
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

import Icon from "@expo/vector-icons/MaterialIcons";
import Icon2 from "@expo/vector-icons/FontAwesome5";

const Home_Client = () => {
  return (
    <>
      <Flex inline justify="space-between">
        <Box m={30}>
          <Text variant="h6">Hola, Federico</Text>
          <Text>En qué podemos ayudarte?</Text>
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
            ml={30}
            m={10}
            w={200}
            h={50}
            style={{
              backgroundColor: "#faf089",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Text>Soluciones activas: 0</Text>
          </Box>
          <Box
            ml={30}
            m={10}
            w={200}
            h={50}
            style={{
              backgroundColor: "#fed7e2",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Text>Soluciones finalizadas: 0</Text>
          </Box>
        </Wrap>
        <Box mv={200} mh={30}>
          <Logo alignSelf="center" width={300} heigth={300} />
          <Button
            title="Necesito una solución"
            trailing={(props) => <Icon2 name="house-damage" {...props} />}
          />
        </Box>
      </Flex>
    </>
  );
};

export default Home_Client;
