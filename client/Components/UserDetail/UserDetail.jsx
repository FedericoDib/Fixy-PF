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
import Icon2 from "react-native-vector-icons/FontAwesome5";
import IconStart from "react-native-vector-icons/Foundation";
import { ScrollView } from "react-native-gesture-handler";

const Review = ({ name, comment, review }) => (
  <View style={styles.review}>
    <View style={styles.reviewHeader}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.reviewContainer}>
        <IconStart name="star" color="#E1C85A" size={19} />
        <Text style={styles.textName}>{review}</Text>
      </View>
    </View>
    <Text style={styles.comment}>{comment}</Text>
  </View>
);

const UserDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.generalReducer.user);
  const request = useSelector((state) => state.clientReducer.request);

  const userDetail = useSelector((state) => state.generalReducer.userDetail);

  const { averageReviews, button } = route.params;

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
    }, 3000);
    navigation.popToTop();
  };

  const renderItem = ({ item }) => (
    <Review name={item.name} comment={item.comment} review={item.rating} />
  );

  return (
    <View style={{ justifyContent: "center", height: "100%" }}>
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
                  fontSize: 30,
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
                justifyContent: "center",
                paddingHorizontal: 10,
                alignItems: "center",
                flexDirection: "column",
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
                          fontSize: 16,
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
                          fontSize: 16,
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
        <View style={{ marginBottom: 100, width: "100%" }}>
          <View style={styles.flatListContainer}>
            <Text style={styles.headerList}>Reseñas: </Text>
            <FlatList data={userDetail.reviews} renderItem={renderItem} />
          </View>
        </View>
        {button === "true" ? (
          <View
            style={{
              width: "90%",
              position: "absolute",
              bottom: 10,
              height: 70,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.colors.threePalet.secondary,
            }}
          >
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor="white"
              onPress={() => handleSubmit()}
            >
              <Text
                style={{
                  fontSize: 19,
                  color: theme.colors.threePalet.dark,
                  fontWeight: "bold",
                }}
              >
                Enviar Solicitud
              </Text>
            </TouchableHighlight>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default UserDetail;
