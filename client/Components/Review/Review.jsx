import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import style from "./ReviewStyle";
import Icon from "react-native-vector-icons/Entypo";
import IconStart from "react-native-vector-icons/Foundation";
import { useSelector, useDispatch } from "react-redux";
import {
  averageReview,
  createReviewProfessional,
} from "../../Redux/Action/clientActions";
import { createReviewClient } from "../../Redux/Action/professionalActions";
import { deleteReviewPending } from "../../Redux/Action/generalActions";
import theme from "../../theme/theme";

const professionals = {
  googleId: "3",
  expoToken: "1",
  isRegistered: null,
  firstLogin: true,
  email: "jose@fixy.com",
  name: "Maximiliano Silva",
  phoneNumber: "1142451823",
  perfilPic: "unafoto",
  province: "cordoba",
  city: "berazategui",
  address: "Guemes 1234",
  reviews: [
    {
      rating: 2,
    },
    {
      rating: 1,
    },
  ],
};

const client = {
  googleId: "3",
  expoToken: "1",
  isRegistered: null,
  firstLogin: true,
  email: "jose@fixy.com",
  name: "Javier Martinez",
  phoneNumber: "1142451823",
  perfilPic: "unafoto",
  province: "cordoba",
  city: "berazategui",
  address: "Calle 123",
  reviews: [
    {
      rating: 5,
    },
    {
      rating: 4,
    },
  ],
};
let averageRating;

export default function Review({ navigation }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const [stars, setStars] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.generalReducer.user);
  const otherUser = useSelector((state) => state.generalReducer.userDetail);

  if (otherUser.reviews && otherUser.reviews.length) {
    averageRating = otherUser.reviews.map((e) => e.rating);
    averageRating = (
      averageRating.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      ) / averageRating.length
    ).toFixed(1);
  } else {
    averageRating = 3;
  }

  function selectStars(number) {
    setRating(number);
    if (number > 0) {
      setStars({
        ...stars,
        one: true,
        two: false,
        three: false,
        four: false,
        five: false,
      });
    }
    if (number > 1) {
      setStars({
        ...stars,
        one: true,
        two: true,
        three: false,
        four: false,
        five: false,
      });
    }
    if (number > 2) {
      setStars({
        ...stars,
        one: true,
        two: true,
        three: true,
        four: false,
        five: false,
      });
    }
    if (number > 3) {
      setStars({
        ...stars,
        one: true,
        two: true,
        three: true,
        four: true,
        five: false,
      });
    }
    if (number > 4) {
      setStars({
        ...stars,
        one: true,
        two: true,
        three: true,
        four: true,
        five: true,
      });
    }
  }

  function sendReview() {
    if (user.googleId[0] === "c") {
      dispatch(
        createReviewProfessional({
          rating: rating,
          comment: comment,
          nameClient: user.name,
          idProfessional: otherUser.googleId,
          idClient: user.googleId,
        })
      );
      dispatch(deleteReviewPending(user.googleId));
      navigation.navigate("HomeClient");
    } else {
      dispatch(
        createReviewClient({
          rating: rating,
          comment: comment,
          nameProfessional: user.name,
          idProfessional: user.googleId,
          idClient: otherUser.googleId,
        })
      );
      dispatch(deleteReviewPending(user.googleId));
      navigation.navigate("HomeProfessional");
    }
  }

  return (
    <View style={style.mainContainer}>
      <View style={style.subContainer}>
        <View>
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor="white"
            onPress={() =>
              navigation.navigate("ProfileDetail", {
                averageReviews: item.averageReviews,
              })
            }
          >
            <View style={[style.cardContainer, { ...theme.shadows.dark }]}>
              <View style={style.imageContainer}>
                <Image
                  style={{ borderRadius: 100 }}
                  source={{
                    uri: otherUser.perfilPic,
                    width: 65,
                    height: 65,
                  }}
                />
              </View>
              <View style={style.textCardContainer}>
                <Text style={style.textName}>{otherUser.name}</Text>
                <Text style={style.textProfession}>{otherUser.address}</Text>
              </View>

              <View style={style.reviewContainer}>
                <IconStart name="star" color="#E1C85A" size={19} />
                <Text style={style.textName}>{averageRating}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={style.textContainer}>
            <Text style={style.inputLabel}>Cantidad de estrellas</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight
              activeOpacity={0.4}
              underlayColor="#FFF5E7"
              onPress={() => selectStars(1)}
            >
              <IconStart
                style={stars.one ? style.starOn : style.starOff}
                name="star"
                size={25}
              />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.4}
              underlayColor="#FFF5E7"
              onPress={() => selectStars(2)}
            >
              <IconStart
                style={stars.two ? style.starOn : style.starOff}
                name="star"
                size={25}
              />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.4}
              underlayColor="#FFF5E7"
              onPress={() => selectStars(3)}
            >
              <IconStart
                style={stars.three ? style.starOn : style.starOff}
                name="star"
                size={25}
              />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.4}
              underlayColor="#FFF5E7"
              onPress={() => selectStars(4)}
            >
              <IconStart
                style={stars.four ? style.starOn : style.starOff}
                name="star"
                size={25}
              />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.4}
              underlayColor="#FFF5E7"
              onPress={() => selectStars(5)}
            >
              <IconStart
                style={stars.five ? style.starOn : style.starOff}
                name="star"
                size={25}
              />
            </TouchableHighlight>
          </View>
          <View style={style.textContainer}>
            <Text style={style.inputLabel}>Comentario</Text>
            <View style={style.centerField}>
              <TextInput
                style={{ fontSize: 20 }}
                onChangeText={(text) => setComment(text)}
                placeholder="Escriba su comentario"
                multiline
                textAlignVertical="top"
                numberOfLines={5}
              ></TextInput>
            </View>
          </View>
        </View>
        <TouchableHighlight
          style={style.button}
          activeOpacity={0.6}
          underlayColor="#F9CE67"
          onPress={() => {
            sendReview();
          }}
        >
          <View style={style.textButton}>
            <Text style={{ fontSize: 16 }}>Enviar review</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}
