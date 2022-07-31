import { View, Text, ScrollView, TouchableHighlight, SafeAreaView, Image, FlatList } from 'react-native'
import React from 'react'
import AntDesignIcon from '@expo/vector-icons/AntDesign';
import IconStar from "react-native-vector-icons/Foundation";
import styles from './UserDetailStyle'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Martha',
    comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    review: '4.9'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Julian',
    comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    review: '4.9'
  },
  {
    id: '58634a0f-3da1-471f-bd96-145571e29d72',
    name: 'Marcos',
    comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    review: '4.9'
  },
  {
    id: '58694a0f-3da1-571f-bd96-145571e29d72',
    name: 'Marcos',
    comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    review: '4.9'
  },
  {
    id: '58694a0f-3da1-461f-bd96-145571e29d72',
    name: 'Marcos',
    comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    review: '4.9'
  },
  {
    id: '58694a0f-3da1-4718f-bd96-145571e29d72',
    name: 'Marcos',
    comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    review: '4.9'
  },
  {
    id: '58694a0f-3da1-471f-bd26-145571e29d72',
    name: 'Marcos',
    comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    review: '4.9'
  },
  {
    id: '58694a0f-3da1-471f-bd96-14557329d72',
    name: 'Marcos',
    comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    review: '4.9'
  },
  {
    id: '58694a0f-3da1-421f-bd16-145571e29d72',
    name: 'Marcos',
    comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14552e29d72',
    name: 'Marcos',
    comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
  },
  {
    id: '5869450f-3da1-471f-bd96-145571e29d72',
    name: 'Marcos',
    comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
  },
  {
    id: '58694a0f-3da1-47006f-bd96-145571e29d72',
    name: 'Marcos',
    comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
  },
];

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
    </SafeAreaView>
  )
}

export default UserDetail