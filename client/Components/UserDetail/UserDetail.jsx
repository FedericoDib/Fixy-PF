import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Entypo";
import styles from './UserDetailStyle'

const UserDetail = () => {
  return (
    <ScrollView>
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="white"
        //   onPress={() => handleSubmit()}
        >
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <Icon name="user" color="black" size={40} />
              {/* <Image
        source={item.image}
    /> */}
            </View>
            <View style={styles.textContainer}>
              <View style={styles.nameAndReviewContainer}>
                <Text style={styles.textName}>Federico</Text>
                <View style={styles.reviewContainer}>
                  <Icon name="star" color="#E1C85A" size={19} />
                  <Text style={styles.textName}>4,9</Text>
                </View>
              </View>
              <Text style={styles.textProfession}>Electricista</Text>
            </View>
          </View>
        </TouchableHighlight>
    </ScrollView>
  )
}

export default UserDetail