import "react-native-gesture-handler";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  useWindowDimensions,
  Pressable,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/AntDesign";
import COLORS from "../SignUpForm/ClientSignUp/Colors";
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
import { useFocusEffect } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import style from "./SolutionFormStyle";
import UseChooseImage from "./UseChooseImage";
import {
  getControllerPic,
  requestPicOff,
} from "../../Redux/Action/generalActions";
import { requestValidate } from "../SignUpForm/Validator";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme/theme";

const SolutionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.generalReducer.user);
  const { width, height } = useWindowDimensions();
  const [Hour, setHour] = useState("Unknown");
  const [Professional, setProfessional] = useState("Unknown");
  const [minTime, setMinTime] = useState(0);
  const [maxTime, setMaxTime] = useState(24);
  const [text, onChangeText] = React.useState(null);
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(2022);
  const [changeButton, setChangeButton] = useState(true);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    clientId: user.googleId,
    address: user.address,
  });
  const requestPic = useSelector((state) => state.generalReducer.requestPic);
  const controllerPic = useSelector(
    (state) => state.generalReducer.controllerPic
  );

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

  const handleSubmit = () => {
    // let dat = date
    // dat = "20"+ dat.split('/').reverse().join('-')
    dispatch(averageReviewOff());
    dispatch(countOff());
    dispatch(
      createRequest({
        ...input,
        availableTime: `${minTime} - ${maxTime}`,
        category: Professional,
        status: "pending",
        date: date,
        requestPic: requestPic,
      })
    );
    dispatch(getAllProfessionals(Professional));
    navigation.navigate("ProfessionalList");
  };

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate;
    currentDate = currentDate.toLocaleDateString();
    currentDate = currentDate.split("/");
    currentDate = [currentDate[1], currentDate[0], currentDate[2]].join("/");
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
    <ScrollView
      style={style.mainContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={style.container}>
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
        <Text style={style.label}>Asunto</Text>
        <View style={style.inputContainer}>
          <Icon
            name="subject"
            color={COLORS.light}
            size={20}
            style={style.inputIcon}
          />
          <TextInput
            placeholder="Asunto"
            onChangeText={(text) => setInput({ ...input, affair: text })}
            style={style.input}
          />
        </View>
        <Text style={style.label}>Dirección</Text>
        <View style={style.inputContainer}>
          <Icon
            name="location-pin"
            color={COLORS.light}
            size={20}
            style={style.inputIcon}
          />
          <TextInput
            placeholder="Provincia, Ciudad, Calle"
            onChangeText={(text) => setInput({ ...input, address: text })}
            style={style.input}
            defaultValue={user.address}
          />
        </View>
        <Text style={style.label}>Fecha</Text>
        <View style={style.inputContainer}>
          <Icon1
            name="calendar"
            color={COLORS.light}
            size={20}
            style={style.inputIcon}
          />
          <View>
            <Pressable onPress={showDatepicker}>
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
        </View>

        <Text style={style.label}>Horario</Text>
        <View
          style={{
            marginVertical: 20,
            backgroundColor: theme.colors.threePalet.primary,
            justifyContent: "center",
            height: 100,
            borderRadius: 20,
          }}
        >
          <PrimarySlider
            min={0}
            max={24}
            low={minTime}
            high={maxTime}
            setMinTime={setMinTime}
            setMaxTime={setMaxTime}
          />
        </View>
        <Text style={style.label}>Profesional</Text>
        <View>
          <Picker
            selectedValue={Professional}
            onValueChange={(value, index) => setProfessional(value)}
            mode="dropdown"
            style={{ borderRadius: 5 }}
          >
            <Picker.Item label="Selecciona una categoría" value="Unknown" />
            <Picker.Item label="Gasista" value="gasista" />
            <Picker.Item label="Plomero" value="plomero" />
            <Picker.Item label="Electricista" value="electricista" />
          </Picker>
        </View>
        <Text style={style.label}>Descripción</Text>
        <View style={{ marginTop: 15, alignItems: "center" }}>
          <TextInput
            multiline
            numberOfLines={5}
            style={{
              margin: 12,
              borderWidth: 2,
              borderRadius: 5,
              width: "100%",
              borderColor: theme.colors.threePalet.secondary,
              padding: 10,
              textAlignVertical: "top",
            }}
            onChangeText={(text) => setInput({ ...input, description: text })}
            value={text}
            placeholder="Describe tu problema..."
            maxLength={1000}
          />
        </View>
        <Text style={[style.label, { marginVertical: 20 }]}>
          Puedes agregar fotos de tu problema
        </Text>

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
          <PrimaryButton
            disabled={
              !controllerPic
                ? Object.getOwnPropertyNames(error).length && changeButton
                : !changeButton && Object.getOwnPropertyNames(error).length
            }
            title={
              changeButton && !Object.getOwnPropertyNames(error).length
                ? "Continuar"
                : "Aguardando datos..."
            }
            color={"primary"}
            onPress={() =>
              changeButton &&
              !Object.getOwnPropertyNames(error).length &&
              handleSubmit()
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SolutionScreen;
