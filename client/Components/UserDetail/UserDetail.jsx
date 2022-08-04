import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import IconStar from "react-native-vector-icons/Foundation";
import styles from "./UserDetailStyle";
import { requestToProfessional } from "../../Redux/Action/clientActions";
import { useDispatch, useSelector } from "react-redux";

const Review = ({ name, comment, review }) => (
  <View style={styles.review}>
    <View style={styles.reviewHeader}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.name}>{review}</Text>
    </View>
    <Text style={styles.comment}>{comment}</Text>
  </View>
);

const UserDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.generalReducer.user);
  const request = useSelector((state) => state.clientReducer.request);

  const userDetail = useSelector((state) => state.generalReducer.userDetail);

  const { averageReviews } = route.params;

  const handleSubmit = () => {
    dispatch(
      requestToProfessional({
        googleId: userDetail.googleId,
        idRequest: request.id,
      })
    );
    navigation.popToTop();
  };

  const renderItem = ({ item }) => (
    <Review
      name={item.review.name}
      comment={item.review.comment}
      review={item.review.rating}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableHighlight onPress={() => navigation.navigate("List")}>
        <View style={styles.titleBar}>
          <AntDesignIcon name="left" size={24}></AntDesignIcon>
        </View>
      </TouchableHighlight> */}

      <View style={{ alignSelf: "center" }}>
        <View style={styles.profileImage}>
          <Image
            style={styles.image}
            source={{ uri: userDetail.perfilPic }}
          ></Image>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <React.Fragment>
          <Text
            style={[
              styles.text,
              { fontWeight: "400", fontSize: 36, padding: 10 },
            ]}
          >
            {userDetail && userDetail.name.toUpperCase()}
          </Text>
          <React.Fragment>
            {user.googleId.includes("c") ? (
              <Text style={[styles.text, { fontSize: 20, color: "#000" }]}>
                {userDetail && userDetail.profession.toUpperCase()}
              </Text>
            ) : null}
          </React.Fragment>
          <React.Fragment>
            {user.googleId.includes("c") ? (
              <Text
                style={[
                  styles.text,
                  { fontSize: 15, color: "#000", marginTop: 5 },
                ]}
              >
                {userDetail && userDetail.city.toUpperCase()}
              </Text>
            ) : (
              <Text
                style={[
                  styles.text,
                  { fontSize: 15, color: "#000", marginTop: 5 },
                ]}
              >
                {userDetail && userDetail.city.toUpperCase()}
              </Text>
            )}
          </React.Fragment>
        </React.Fragment>
      </View>

      <View style={styles.reviewsContainer}>
        <View style={styles.reviewBox}>
          <Text
            style={[
              styles.text,
              { fontSize: 24, color: "#000", marginHorizontal: 5 },
            ]}
          >
            {averageReviews || 1}
          </Text>
          <IconStar name="star" color="#E1C85A" size={19} />
        </View>
      </View>
      <Text style={styles.headerList}>Reseñas: </Text>
      <View style={styles.flatListContainer}>
        <FlatList data={userDetail} renderItem={renderItem} />
      </View>
      {user.googleId.includes("c") ? (
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="white"
          onPress={() => handleSubmit()}
        >
          <Text>Enviar Solicitud</Text>
        </TouchableHighlight>
      ) : null}
    </SafeAreaView>
  );
};

export default UserDetail;
