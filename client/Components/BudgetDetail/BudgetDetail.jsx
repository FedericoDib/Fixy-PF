import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    Alert,
    ScrollView,
} from "react-native";
import IconCalendar from "react-native-vector-icons/EvilIcons";
import IconPhone from "react-native-vector-icons/Feather";
import style from "./BudgetDetailStyle";
import PrimaryButton from "../General/PrimaryButton";
import { rejectBudgetClient } from "../../Redux/Action/clientActions";
import { deleteBudget } from "../../Redux/Action/professionalActions";
import { userDetail } from "../../Redux/Action/generalActions";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import IconStart from "react-native-vector-icons/Foundation";

let averageRating;
export default function BudgetDetail({ navigation, route }) {
    const user = useSelector((state) => state.generalReducer.user);
    const dispatch = useDispatch();
    const { buttons } = route.params;
    const budgetDetail = useSelector(
        (state) => state.generalReducer.budgetDetail
    );
    const professional = useSelector(
        (state) => state.generalReducer.userDetail
    );

    if (professional.reviews && professional.reviews.length) {
        averageRating = professional.reviews.map((e) => e.rating);
        averageRating = (
            averageRating.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            ) / averageRating.length
        ).toFixed(1);
    } else {
        averageRating = 1;
    }

    useFocusEffect(
        useCallback(() => {
            dispatch(userDetail(budgetDetail.professionalId, "professional"));
            dispatch(userDetail(budgetDetail.professionalId, "professional"));
        }, [])
    );

    return (
        <View style={style.mainContainer}>
            <TouchableHighlight
                activeOpacity={0.9}
                underlayColor="white"
                onPress={() => navigation.navigate("ProfileDetail")}
            >
                <View style={style.cardContainer}>
                    <View style={style.imageContainer}>
                        <Icon name="user" color="black" size={40} />
                        {/* <Image
        source={item.image}
    /> */}
                    </View>
                    <View style={style.textCardContainer}>
                        <View style={style.nameAndReviewContainer}>
                            <Text style={style.textName}>
                                {professional.name}
                            </Text>
                            <View style={style.reviewContainer}>
                                <IconStart
                                    name="star"
                                    color="#E1C85A"
                                    size={19}
                                />
                                <Text style={style.textName}>
                                    {averageRating && averageRating}
                                </Text>
                            </View>
                        </View>
                        <Text style={style.textProfession}>
                            {professional.address}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
            <View style={style.restContainer}>
                <View style={style.textContainer}>
                    <Text>Presupuesto Aproximado</Text>
                </View>
                <View style={style.endField}>
                    <Text>{budgetDetail.estimatedBudget}</Text>
                </View>
                <View style={style.textContainer}>
                    <Text>Comentarios</Text>
                    <View style={style.centerField}>
                        <Text>{budgetDetail.description}</Text>
                    </View>
                </View>
                <View style={style.textContainer}>
                    <Text>Precio de la visita</Text>
                </View>
                <View style={style.endField}>
                    <Text>$ {budgetDetail.price}</Text>
                </View>
            </View>
            <View style={style.buttonContainer}>
                <View style={{ flex: 1 }}>
                    {buttons === "false" && (
                        <PrimaryButton
                            onPress={() => {
                                dispatch(deleteBudget(budgetDetail.id));
                                navigation.goBack();
                            }}
                            title="Eliminar presupuesto"
                            trailing={(props) => (
                                <Icon2 name="house-damage" {...props} />
                            )}
                        />
                    )}
                </View>
                <View style={{ flex: 1 }}>
                    {buttons === "true" && (
                        <PrimaryButton
                            onPress={() =>
                                navigation.navigate("Paypal", {
                                    price: budgetDetail.price,
                                })
                            }
                            title="Aceptar"
                            trailing={(props) => (
                                <Icon2 name="house-damage" {...props} />
                            )}
                        />
                    )}
                </View>
                <View style={{ flex: 1 }}>
                    {buttons === "true" && (
                        <PrimaryButton
                            onPress={() => {
                                navigation.popToTop();
                                dispatch(
                                    rejectBudgetClient({
                                        clientId: user.googleId,
                                        budgetId: budgetDetail.id,
                                    })
                                );
                            }}
                            title="Rechazar"
                            trailing={(props) => (
                                <Icon2 name="house-damage" {...props} />
                            )}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}
