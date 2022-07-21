import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableHighlight,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import styles from "./CardListStyle";
import { useNavigation } from "@react-navigation/native";

export default function CardList({ item }) {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <TouchableHighlight
                activeOpacity={0.9}
                underlayColor="#59e42f"
                onPress={() => navigation.navigate(`Onboarding`)}
            >
                <View style={styles.cardContainer}>
                    <View style={styles.imageContainer}>
                        <Icon name="user" color="black" size={40} />
                        {/* <Image
        source={item.image}
    /> */}
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textName}>{item.name}</Text>
                        <Text style={styles.textProfession}>
                            {item.profession}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        </ScrollView>
    );
}
