import {
  View,
  Text,
  TouchableHighlight,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import IconStar from "react-native-vector-icons/Foundation";
import styles from "./UserDetailStyle";
import { requestToProfessional } from "../../Redux/Action/clientActions";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-root-toast";
import theme from "../../theme/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome5";

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
    let toast = Toast.show("Solicitud enviada con exito!", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: "green",
    });

    setTimeout(function () {
      Toast.hide(toast);
    }, 1000);
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
    <SafeAreaView style={{ justifyContent: "center" }}>
      <View
        style={{
          backgroundColor: theme.colors.threePalet.primary,
          height: "50%",
          position: "relative",
        }}
      ></View>
      <View
        style={{
          backgroundColor: theme.colors.firstPalet.light,
          height: "50%",
          position: "relative",
        }}
      ></View>
      <View style={styles.container}>
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
                {
                  fontWeight: "bold",
                  fontSize: 36,
                  padding: 10,
                },
              ]}
            >
              {userDetail && userDetail.name}
            </Text>
            <View style={styles.reviewsContainer}>
              <View style={styles.reviewBox}>
                <Text
                  style={[
                    styles.text,
                    { fontSize: 19, color: "#000", marginHorizontal: 5 },
                  ]}
                >
                  {averageReviews || 3}
                </Text>
                <IconStar
                  name="star"
                  color={theme.colors.threePalet.secondary}
                  size={19}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-evenly",
                paddingHorizontal: 10,
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                marginBottom: 35,
              }}
            >
              <React.Fragment>
                {user.googleId.includes("c") ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 13,
                      borderColor: "#f1f1f1",
                      borderRadius: 15,
                    }}
                  >
                    <Icon2 name="tools" color="#fff" size={17} />
                    <Text
                      style={[
                        styles.text,
                        {
                          fontSize: 20,
                          color: theme.colors.threePalet.primaryLight,
                          marginLeft: 7,
                        },
                      ]}
                    >
                      {userDetail && userDetail.profession.toUpperCase()}
                    </Text>
                  </View>
                ) : null}
              </React.Fragment>
              <React.Fragment>
                {user.googleId.includes("c") ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 13,
                      borderColor: "#f1f1f1",
                      borderRadius: 15,
                    }}
                  >
                    <Icon2 name="map-marked-alt" color={"#fff"} size={22} />
                    <Text
                      style={[
                        styles.text,
                        {
                          fontSize: 20,
                          color: theme.colors.threePalet.primaryLight,
                          marginLeft: 7,
                        },
                      ]}
                    >
                      {userDetail && userDetail.city.toUpperCase()}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 20,
                        color: theme.colors.threePalet.primaryLight,
                        marginLeft: 7,
                      },
                    ]}
                  >
                    {userDetail && userDetail.city.toUpperCase()}
                  </Text>
                )}
              </React.Fragment>
            </View>
          </React.Fragment>
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
      </View>
    </SafeAreaView>
  );
};

export default UserDetail;
