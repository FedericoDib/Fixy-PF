import { View, FlatList, TouchableHighlight, Text } from 'react-native';
import { TextInput } from '@react-native-material/core';
import React, { useState, useCallback } from 'react';
import style from '../ListStyle';
import { useSelector, useDispatch } from 'react-redux';
import { searchProfessional } from '../../../Redux/Action/clientActions';
import { useFocusEffect } from '@react-navigation/native';
import ProfessionalCard from './ProfessionalCard';

let count = 0;
export default function ProfessionalList({ navigation, route }) {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const professionals = useSelector(
        (state) => state.clientReducer.professionals
    );
    const user = useSelector((state) => state.generalReducer.user);

    const dispatch = useDispatch();
    // if (refreshing) {
    //     setRefreshing(false);
    // }
    useFocusEffect(
        useCallback(() => {
            setRefreshing(false);
			setData(setAverageReviews(professionals));
			setRefreshing(true);
        }, [professionals])
    );

	function setAverageReviews(professionals) {
		for (let i = 0; i < professionals.length; i++) {
			let professional = professionals[i];

            let totalRating = 0;
            if (professional.reviews.length > 1) {
                for (let j = 1; j < professional.reviews.length; j++) {
                    totalRating += professional.reviews[j].rating;
                }
                professionals[i].averageReviews = (
                    totalRating / professional.reviews.length
                ).toFixed(1);
            } else {
                professionals[i].averageReviews = 1;
            }
        }

        for (let i = 0; i < professionals.length; i++) {
            let diferenciaLatitud = user.latitude - professionals[i].latitude;
            let resulat = Math.sign(diferenciaLatitud) * diferenciaLatitud;

            let diferenciaLonguitud =
                user.longitude - professionals[i].longitude;
            let resulon = Math.sign(diferenciaLonguitud) * diferenciaLonguitud;

            let resul = resulat + resulon;
            professionals[i].distancia = resul;
        }

        professionals = professionals.filter(
            (professional) => professional.distancia < 0.33684400000000636
        );
        return professionals;
    }

    function sortByProximity() {
        let aux = data.sort((a, b) => {
            if (a.distancia < b.distancia) return -1;
            if (a.distancia > b.distancia) return 1;
            return 0;
        });
        setData(aux);
        setRefreshing(true);
    }

    const handleChange = (e) => {
        dispatch(searchProfessional(e.text));
    };

    const orderReview = (e) => {
        let aux = data.sort(function (a, b) {
            if (a.averageReviews > b.averageReviews) return -1;
            if (a.averageReviews < b.averageReviews) return 1;
            return 0;
        });
        setData(aux);
        setRefreshing(true);
    };

    return (
        <View style={style.mainContainer}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        onChangeText={(text) => handleChange({ text })}
                        label="Buscar"
                        variant="outlined"
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}
                >
                    <View
                        style={[style.button, { backgroundColor: "#EEECF7" }]}
                    >
                        <View style={[style.textButton]}>
                            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                                Ordenar por:{" "}
                            </Text>
                        </View>
                    </View>
                    <TouchableHighlight
                        style={style.button}
                        activeOpacity={0.6}
                        underlayColor="white"
                        onPress={(e) => {
                            sortByProximity(e);
                        }}
                    >
                        <View style={style.textButton}>
                            <Text>Cercania</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={style.button}
                        activeOpacity={0.6}
                        underlayColor="#white"
                        onPress={(e) => {
                            orderReview(e);
                        }}
                    >
                        <View style={style.textButton}>
                            <Text>Reviews</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            <View style={{ flex: 6 }}>
                {!data.length ? (
                    <Text>No se encontraron</Text>
                ) : (
                    <FlatList
                        extraData={refreshing}
                        data={data}
                        renderItem={({ item }) => (
                            <ProfessionalCard
                                navigation={navigation}
                                item={item}
                            />
                        )}
                    />
                )}
            </View>
        </View>
    );
}
