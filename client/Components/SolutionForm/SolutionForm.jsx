import "react-native-gesture-handler";
import React, { useCallback, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    useWindowDimensions,
    Button,
    Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/AntDesign";
import STYLES from "../SignUpForm/ClientSignUp/ClientSignUpStyles";
import COLORS from "../SignUpForm/ClientSignUp/Colors";
import { ScrollView, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {
    countOff,
    createRequest,
    averageReviewOff,
} from "../../Redux/Action/clientActions";
import PrimaryButton from "../General/PrimaryButton";
import PrimarySlider from "../General/Slider/Slider";
import { getAllProfessionals } from "../../Redux/Action/clientActions";
// import DatePicker from 'react-native-datepicker';
import { useFocusEffect } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import style from "./SolutionFormStyle";
import UseChooseImage from "./UseChooseImage";
import {
    getControllerPic,
    requestPicOff,
} from "../../Redux/Action/generalActions";
import { requestValidate } from "../SignUpForm/Validator";

const SolutionScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.generalReducer.user);
    const { width, height } = useWindowDimensions();
    const [Hour, setHour] = useState("Unknown");
    const [Professional, setProfessional] = useState("Unknown");
    const [minTime, setMinTime] = useState(0);
    const [maxTime, setMaxTime] = useState(24);
    const [text, onChangeText] = React.useState(null);
    const [input, setInput] = useState({
        clientId: user.googleId,
        address: user.address,
    });
    const requestPic = useSelector((state) => state.generalReducer.requestPic);
    const controllerPic = useSelector(
        (state) => state.generalReducer.controllerPic
    );
    const [changeButton, setChangeButton] = useState(true);

    const [error, setError] = useState({});

    useFocusEffect(
        useCallback(() => {
            setError(requestValidate(input));
        }, [input])
    );

    useFocusEffect(
        useCallback(() => {
            dispatch(requestPicOff());
            dispatch(getControllerPic(0));
        }, [])
    );
    useFocusEffect(
        useCallback(() => {
            setChangeButton(controllerPic == requestPic.length);
        }, [controllerPic, requestPic])
    );

    console.log(input);

    const handleSubmit = () => {
        let dat = date
        dat = "20"+dat.split('/').reverse().join('-')
        dispatch(averageReviewOff());
        dispatch(countOff());
        dispatch(
            createRequest({
                ...input,
                availableTime: `${minTime} - ${maxTime}`,
                category: Professional,
                status: "pending",
                date: dat,
                requestPic: requestPic,
            })
        );
        dispatch(getAllProfessionals(Professional));
        navigation.navigate("ProfessionalList");
    };

    // return (
    //     <SafeAreaView
    //         style={[
    //             {
    //                 paddingHorizontal: 20,
    //                 flex: 3,
    //                 paddingVertical: 80,
    //                 backgroundColor: "#fff",
    //             },
    //             { width, height },
    //         ]}
    //     >
    //         <ScrollView showsVerticalScrollIndicator={false}>
    //             <Text style={{ marginTop: 15, fontWeigth: 500 }}>Asunto</Text>
    //             <View style={STYLES.inputContainer}>
    //                 <TextInput
    //                     placeholder="Asunto"
    //                     onChangeText={(text) =>
    //                         setInput({ ...input, affair: text })
    //                     }
    //                     style={STYLES.input}
    //                 />
    //                 <Icon
    //                     name="location-pin"
    //                     color={COLORS.light}
    //                     size={20}
    //                     style={STYLES.inputIcon}
    //                 />
    //             </View>
    //             <Text style={{ marginTop: 15, fontWeigth: 500 }}>
    //                 Dirección
    //             </Text>
    //             <View style={STYLES.inputContainer}>
    //                 <TextInput
    //                     placeholder="Provincia, Ciudad, Calle"
    //                     onChangeText={(text) =>
    //                         setInput({ ...input, address: text })
    //                     }
    //                     style={STYLES.input}
    //                 />
    //                 <Icon
    //                     name="location-pin"
    //                     color={COLORS.light}
    //                     size={20}
    //                     style={STYLES.inputIcon}
    //                 />
    //             </View>
    //             <Text style={{ marginTop: 25, fontWeigth: 500 }}>Fecha</Text>
    //             <View style={STYLES.inputContainer}>
    //                 <TextInput
    //                     placeholder="DD/MM/AAAA"
    //                     onChangeText={(text) =>
    //                         setInput({ ...input, date: text })
    //                     }
    //                     style={STYLES.input}
    //                 />
    //                 <Icon1
    //                     name="calendar"
    //                     color={COLORS.light}
    //                     size={20}
    //                     style={STYLES.inputIcon}
    //                 />
    //             </View>

    const formatoFecha = (formato) => {
        let fecha = new Date();
        const map = {
            dd: fecha.getDate(),
            mm: fecha.getMonth() + 1,
            yyyy: fecha.getFullYear(),
        };

        return formato.replace(/dd|mm|yyy/gi, (matched) => map[matched]);
    };

    const [date, setDate] = useState(new Date());
    const [year, setYear] = useState(2022);

    const onChange = (event, selectedDate) => {
        let currentDate = selectedDate;
        currentDate = currentDate.toLocaleDateString();
        currentDate = currentDate.split("/");
        currentDate = [currentDate[1], currentDate[0], currentDate[2]].join(
            "/"
        );
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: new Date(),
            onChange,
            mode: currentMode,
        });
    };

    const showDatepicker = () => {
        showMode("date");
    };

    return (
        <SafeAreaView
            style={[
                {
                    paddingHorizontal: 20,
                    flex: 3,
                    paddingVertical: 80,
                    backgroundColor: "#fff",
                },
                { width, height },
            ]}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ marginTop: 15 }}>Asunto</Text>
                <View style={STYLES.inputContainer}>
                    <TextInput
                        placeholder="Asunto"
                        onChangeText={(text) =>
                            setInput({ ...input, affair: text })
                        }
                        style={STYLES.input}
                    />
                    <Icon
                        name="location-pin"
                        color={COLORS.light}
                        size={20}
                        style={STYLES.inputIcon}
                    />
                </View>
                <Text style={{ marginTop: 15 }}>Dirección</Text>
                <View style={STYLES.inputContainer}>
                    <TextInput
                        placeholder="Provincia, Ciudad, Calle"
                        onChangeText={(text) =>
                            setInput({ ...input, address: text })
                        }
                        style={STYLES.input}
                        defaultValue={user.address}
                    />
                    <Icon
                        name="location-pin"
                        color={COLORS.light}
                        size={20}
                        style={STYLES.inputIcon}
                    />
                </View>
                <Text style={{ marginTop: 25 }}>Fecha</Text>
                <View style={STYLES.inputContainer}>
                    {/* <TextInput
						placeholder='DD/MM/AAAA'
						onChangeText={(text) => setInput({ ...input, date: text })}
						style={STYLES.input}
					/>
					<Icon1
						name='calendar'
						color={COLORS.light}
						size={20}
						style={STYLES.inputIcon}
					/> */}
                    <View>
                        <Pressable onPress={showDatepicker}>
                            {/* full harcodeado */}
                            <Text>
                                {typeof date === "object"
                                    ? date
                                          .toLocaleDateString()
                                          .split("/")
                                          .reverse()
                                          .slice(1)
                                          .join("/")
                                          .concat(`/${year}`)
                                    : date.toString()}
                            </Text>
                        </Pressable>
                    </View>
                    {/* <DatePicker
						style={{ width: 200 }}
						date={date}
						mode='date'
						placeholder='Selecciona la fecha'
						format='YYYY-MM-DD'
						minDate={date}
						confirmBtnText='Confirmar'
						cancelBtnText='Cancelar'
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0,
							},
							dateInput: {
								marginLeft: 36,
							},
						}}
						onDateChange={(date) => {
							setDate(date);
						}}
					/> */}
                </View>

                <Text style={{ marginTop: 25 }}>Horario</Text>
                <View style={{ marginTop: 15 }}>
                    {/* <Picker
            selectedValue={Hour}
            onValueChange={(value, index) => setHour(value)}
            mode="dropdown"
            style={{ borderRadius: 5 }}
          >
            <Picker.Item label="Selecciona un horario" value="Unknown" />
            <Picker.Item label="8 AM - 10 AM" value="8" />
            <Picker.Item label="10 AM - 12 AM" value="10" />
            <Picker.Item label="12 PM - 14 PM" value="14" />
            <Picker.Item label="14 PM - 16 PM" value="16" />
            <Picker.Item label="16 PM - 18 PM" value="18" />
          </Picker> */}
                    <PrimarySlider
                        min={0}
                        max={24}
                        low={minTime}
                        high={maxTime}
                        setMinTime={setMinTime}
                        setMaxTime={setMaxTime}
                    />
                </View>

                <Text style={{ marginTop: 25 }}>Profesional</Text>
                <View style={{ marginTop: 15 }}>
                    <Picker
                        selectedValue={Professional}
                        onValueChange={(value, index) => setProfessional(value)}
                        mode="dropdown"
                        style={{ borderRadius: 5 }}
                    >
                        <Picker.Item
                            label="Selecciona una categoría"
                            value="Unknown"
                        />
                        <Picker.Item label="Gasista" value="gasista" />
                        <Picker.Item label="Plomero" value="plomero" />
                        <Picker.Item
                            label="Electricista"
                            value="electricista"
                        />
                    </Picker>
                </View>
                <Text style={{ marginTop: 15 }}>Descripción</Text>
                <View style={{ marginTop: 15, alignItems: "center" }}>
                    <TextInput
                        multiline
                        numberOfLines={5}
                        style={{
                            margin: 12,
                            borderWidth: 1,
                            borderRadius: 5,
                            width: 345,
                        }}
                        onChangeText={(text) =>
                            setInput({ ...input, description: text })
                        }
                        value={text}
                        placeholder="Describe tu problema..."
                    />
                </View>
                <Text>Puedes agregar fotos de tu problema</Text>
                <UseChooseImage navigation={navigation} />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        marginTop: 50,
                        marginBottom: 20,
                    }}
                >
                    {/* <TouchableOpacity
            style={{
              borderBottomWidth: 2,
              marginLeft: 6,
              backgroundColor: "lightgrey",
              borderRadius: 20,
              width: 300,
              height: 40,
              alignItems: "center",
            }}
            onPress={() => handleSubmit()}
          >
            <Text style={{ paddingTop: 10, fontWeigth: 700 }}>Continuar</Text>
          </TouchableOpacity> */}

                    {console.log("changeButton", changeButton)}
                    <PrimaryButton
                        disabled={
                            !controllerPic
                                ? Object.getOwnPropertyNames(error).length &&
                                  changeButton
                                : !changeButton &&
                                  Object.getOwnPropertyNames(error).length
                        }
                        title={
                            changeButton &&
                            !Object.getOwnPropertyNames(error).length
                                ? "Continuar"
                                : "Cargando..."
                        }
                        color={"primary"}
                        onPress={() =>
                            changeButton &&
                            !Object.getOwnPropertyNames(error).length &&
                            handleSubmit()
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SolutionScreen;
