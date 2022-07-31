import { View, Text, ScrollView, TouchableHighlight, SafeAreaView, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import AntDesignIcon from '@expo/vector-icons/AntDesign';
import IconStar from "react-native-vector-icons/Foundation";
import styles from './UserDetailStyle'
import {requestToProfessional, userDetail} from '../../Redux/Action'

const Review = ({ name, comment, review }) => (
  <View style={styles.review}>
    <View style={styles.reviewHeader}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.name}>{review}</Text>
    </View>
    <Text style={styles.comment}>{comment}</Text>
  </View>
);

const UserDetail = () => {

  const handleSubmit = () => {
      dispatch(
          requestToProfessional({
              googleId: item.googleId,
              idRequest: request.id,
          })
      );
  }



  const renderItem = ({ item }) => (
    <Review name={item.name} comment={item.comment} review={item.review} />
  );

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.titleBar}>
          <AntDesignIcon name="left" size={24}></AntDesignIcon>
        </View>

        <View style={{alignSelf: "center"}}>
          <View style={styles.profileImage}>
            <Image style={styles.image} source={{uri: "https://randomuser.me/api/portraits/men/6.jpg"}}></Image>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, {fontWeight: "400", fontSize: 36, padding: 10}]}>Federico Hugo Dib</Text>
          <Text style={[styles.text, {fontSize: 20, color: "#000"}]}>Electricista</Text>
          <Text style={[styles.text, {fontSize: 15, color: "#000", marginTop: 5}]}>Gral. Paz 2938</Text>
        </View>

        <View style={styles.reviewsContainer}>
          <View style={styles.reviewBox}>
            <Text style={[styles.text, {fontSize: 24, color: "#000", marginHorizontal: 5}]}>4.9</Text>
            <IconStar name="star" color="#E1C85A" size={19} />
          </View>
        </View>
        <Text style={styles.headerList}>Reseñas: </Text>
        <View style={styles.flatListContainer}>
          <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={review => review.id}
        />
        </View>
        {user.googleId.includes("c") ? (
          <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="white"
          onPress={() => handleSubmit()}
      > <Text>Enviar Solicitud</Text></TouchableHighlight>
        ): null }
    </SafeAreaView>
  )
}

export default UserDetail