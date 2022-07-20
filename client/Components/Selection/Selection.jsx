import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from "react-native";
import style from "./SelectionStyles"


export default function Selection() {
    return (
        <View style={style.mainContainer}>
            <View style={style.titleContainer}>
                <Text style={style.text}>Deseo registrarme como</Text>
            </View>
            <View style={style.buttonsContainer}>
                <View>
                    <TouchableOpacity style={style.button}>
                        <Text style={style.text}>Cliente</Text>
                        <View>
                            <Image
                                source={require("../../assets/iconCliente.png")}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={style.button}>
                    <Text style={style.text}>Profesional</Text>
                    <View>
                        <Image source={require("../../assets/iconProf2.png")} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}



