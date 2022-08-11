import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import style from "./RequestDetailStyle";
import IconStart from "react-native-vector-icons/Foundation";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  getRequestDetail,
  userDetail,
} from "../../Redux/Action/generalActions";
import {
  averageReviewOff,
  countOff,
  deleteRequest,
  getAllProfessionals,
  setRequest,
} from "../../Redux/Action/clientActions";
import theme from "../../theme/theme";
import { Ionicons } from "@expo/vector-icons";
import Card from "../List/ClientCard";

let averageRating;
export default function RequestDetail({ navigation, route }) {
  const dispatch = useDispatch();
  const client = useSelector((state) => state.generalReducer.userDetail);
  const user = useSelector((state) => state.generalReducer.user);
  const requestDetail = useSelector(
    (state) => state.generalReducer.requestDetail
  );
  const { item, buttons } = route.params;

  const [refreshing, setRefreshing] = useState(false);

  if (client.reviews && client.reviews.length) {
    averageRating = client.reviews.map((e) => e.rating);
    averageRating = (
      averageRating.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      ) / averageRating.length
    ).toFixed(1);
  } else {
    averageRating = 3;
  }

  useFocusEffect(
    useCallback(() => {
      setRefreshing(false)
      dispatch(getRequestDetail(item.id));
      setRefreshing(true)
    }, [])
  );

  const handleSubmit = () => {
    if (user && user.googleId[0] === "p") {
      dispatch(userDetail(item.clientId, "client"));
      navigation.navigate("ProfileDetail", {
        averageReviews: averageRating,
        button: "false",
      });
    }
  };
  const ProfileCard = ({item}) => {
    console.log("EDTRPIGBSHRTGKBJISRPOTG", item)
    return (
      <TouchableHighlight
        activeOpacity={0.9}
        underlayColor="white"
        onPress={() => handleSubmit()}
        style={{marginHorizontal: 20}}
      >
        <View style={{flexDirection: "row", flex: 1, padding:10, backgroundColor: '#FFF5E7', borderRadius: 20, borderWidth: 1, borderColor: theme
      .colors.threePalet.secondary}}>
          <View style={style.imageContainer}>
            <Image
              style={{ borderRadius: 100 }}
              source={{
                uri: item.perfilPic,
                width: 60,
                height: 60,
              }}
            />
          </View>
          <View style={style.textCardContainer}>
            <Text style={style.textName}>{item.name}</Text>
            <Text style={style.textProfession}>{item.address}</Text>
          </View>

          <View style={style.reviewContainer}>
            <IconStart style={{marginHorizontal: 10}} name="star" color="#E1C85A" size={19} />
            <Text style={{fontSize: 15,
		fontWeight: 'bold', marginRight: 20}}>{averageRating}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.threePalet.primary,
        height: "100%",
        paddingHorizontal: 20,
        paddingVertical: 35,
        flex: 1,
      }}
    >
      <ScrollView style={style.mainContainer}>
        <View style={style.titleContainer}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ paddingVertical: 5, marginBottom: 10 }}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.colors.threePalet.primary}
            />
          </Pressable>
          <Text style={style.mainTitle}>DETALLE DE SOLICITUD</Text>
        </View>
        <View style={{flex: 1}}>
          {/* <ScrollView horizontal style={{flexDirection: "row", height: "100%"}}>
            <View style={{flexDirection: "row", height: "100%"}}>
              {requestDetail && requestDetail?.professionals?.map((e) => (
                <ProfileCard item={e} />
              ))}
            </View>
          </ScrollView> */}
          {user && user.googleId[0] === "p" ? (
            <ProfileCard item={client}/>
          ) : (
            <View style={{flex: 1}}>
              {requestDetail && requestDetail?.professionals?.length ? (
              <FlatList
                extraData={refreshing}
                data={requestDetail?.professionals}
                renderItem={({item}) => <ProfileCard item={item}/>}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                horizontal
              /> ) : null }
            </View>
          )}
          {/* {user && user.googleId[0] === "p" ? (
            <Card item={client} navigation={navigation}/>
          ) : (
            <View style={{width: "100%"}}>
              <FlatList
                data={requestDetail.professionals}
                renderItem={({ item }) => <Card item={item} navigation={navigation}/>}
                showsHorizontalScrollIndicator={false}
                horizontal
              />
            </View>
          )} */}
        </View>
        <React.Fragment>
          {requestDetail ? (
            <View>
              <View style={{marginTop: 10}}>
                <Text style={style.label}>Asunto</Text>
                <View style={style.centerField}>
                  <Text style={style.desc}>{requestDetail.affair}</Text>
                </View>
              </View>
              <View>
                <Text style={style.label}>Descripcion del problema</Text>
                <View style={style.centerField}>
                  <Text style={style.desc}>{requestDetail.description}</Text>
                </View>
              </View>
              <View >
                <Text style={style.label}>Fecha</Text>
                <View style={style.centerField}>
                  <Text style={style.desc}>
                    {requestDetail.date && requestDetail.date.length < 9
                      ? "20" + requestDetail.date.split("/").reverse().join("-")
                      : requestDetail.date && requestDetail.date.slice(0, 10)}
                  </Text>
                </View>
              </View>
              <View>
						<Text style={style.label}>Rango horario</Text>
            </View>
            <View style={style.centerField}>
              <Text style={style.desc}>{requestDetail.availableTime}</Text>
            </View>
              {requestDetail.requestPic && requestDetail.requestPic.length ? (
                <View style={{ alignItems: "center" }}>
                  {requestDetail.requestPic.map((photo) => {
                    return (
                      <TouchableHighlight
                        onPress={() =>
                          navigation.navigate("ShowImage", {
                            image: requestDetail.requestPic,
                          })
                        }
                      >
                        <Image
                          style={{ marginVertical: "5%" }}
                          source={{
                            uri: photo,
                            width: 320,
                            height: 240,
                          }}
                        />
                      </TouchableHighlight>
                    );
                  })}
                </View>
              ) : (
                <View></View>
              )}
              {user && user.googleId[0] === "p" ? (
                <TouchableHighlight
                  style={style.button}
                  activeOpacity={0.6}
                  underlayColor="#F9CE67"
                  onPress={() => {
                    navigation.navigate("BudgetForm");
                  }}
                >
                  <View style={style.button}>
                    <Text style={style.text}>Enviar Presupuesto</Text>
                  </View>
                </TouchableHighlight>
              ) : (
                <View>
                  <TouchableHighlight
                    style={style.button}
                    activeOpacity={0.6}
                    underlayColor="#F9CE67"
                    onPress={() => {
                      dispatch(setRequest(requestDetail));
                      dispatch(averageReviewOff());
                      dispatch(countOff());
                      dispatch(getAllProfessionals(requestDetail.category));
                      navigation.navigate("ProfessionalList");
                    }}
                  >
                    <View>
                      <Text style={style.text}>Enviar solicitud a otros profesionales</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={style.button}
                    activeOpacity={0.6}
                    underlayColor="#F9CE67"
                    onPress={() => {
                      dispatch(deleteRequest(item.id));
                      navigation.navigate("RequestList");
                    }}
                  >
                    <View style={style.textButton}>
                      <Text style={style.text}>Eliminar solicitud</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              )}
            </View>
          ) : (
            <React.Fragment>
              <Text>Cargando...</Text>
            </React.Fragment>
          )}
        </React.Fragment>
      </ScrollView>
    </View>
  );
}
