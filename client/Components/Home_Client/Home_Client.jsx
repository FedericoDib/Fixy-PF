import React from 'react'
import styled from 'styled-components/native'
import { Flex, Box, Text, IconButton } from "@react-native-material/core";

import Icon from "@expo/vector-icons/MaterialIcons";

const Home_Client = () => {
  return (<>
  <BackgroundView></BackgroundView>
    <Flex fill inline={true}>
        <Box>
            <Text>Hola, Federico</Text>
            <NotificationsButtonStyled><IconButton icon={props => <Icon name="notifications" {...props} />}/></NotificationsButtonStyled>
        </Box>

        <Box h={50}>
            <Text>En qué podemos ayudarte?</Text>
        </Box>
        <Box h={50}>
            <Text>En qué podemos ayudarte?</Text>
        </Box>
        <Box h={50}>
            <Text>En qué podemos ayudarte?</Text>
        </Box>
    </Flex>
  </>
  )
}

export default Home_Client

const HomeView = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: flex-start;
    justify-content: center;
`
const NotificationsButtonStyled = styled.TouchableOpacity`
    margin: 10px;
  `

const BackgroundView = styled.View`
    background-color: skyblue;
    height: 3.5%;`

const ViewStyled = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
`
const SubtitleStyled = styled.Text`
    font-size: 12px;
    margin-top: 5px;`

const TitleStyled = styled.Text`
    font-size: 20px;
    text-align: left;
    margin: 20px 0 10px 20px;
    font-weight: 500;
`
