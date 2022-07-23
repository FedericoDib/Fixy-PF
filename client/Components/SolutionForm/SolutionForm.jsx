import "react-native-gesture-handler";
import React,{useState}from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/AntDesign";
import STYLES from "../SignUpForm/ClientSignUp/ClientSignUpStyles";
import COLORS from "../SignUpForm/ClientSignUp/Colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

const SolutionScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [Hour, setHour] = useState('Unknown');
  const [Professional, setProfessional] = useState('Unknown');
  const [text, onChangeText] = React.useState(null);

  return (
    <SafeAreaView
      style={[
        { paddingHorizontal: 40, flex: 3, backgroundColor: "#fff" },
        { width, height },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>


          <Text style={{ marginTop:15,fontweigth:500}}>Description</Text>
            <View style={{marginTop:15}}>
            <TextInput
                multiline
                numberOfLines={5}
                style={{ margin: 12, borderWidth: 1, borderRadius:5}}
                onChangeText={onChangeText}
                value={text}
                placeholder=" Tell us your problem.."

      />
            </View>

          <Text style={{marginTop:15,fontWeigth:500}}>Address</Text>
          <View style={STYLES.inputContainer}>

            <TextInput placeholder="Prov, City, Street" style={STYLES.input} />
            <Icon
              name="location-pin"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
          </View>
          <Text style={{marginTop:25,fontWeigth:500}} >Date</Text>
          <View style={STYLES.inputContainer}>

            <TextInput
              placeholder="DD/MM/AAAA"
              style={STYLES.input}

            />
            <Icon1
              name="calendar"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            </View>

            <Text style={{marginTop:25,fontweigth:500}} >Shifts</Text>
            <View style={{marginTop:15}}>
            <Picker
         selectedValue={Hour}
        onValueChange={(value, index) => setHour(value)} 
        mode="dropdown"  
        style={{borderRadius:5 }}
        >

        <Picker.Item label="Please select the hour" value="Unknown" />
        <Picker.Item label="8 AM" value="8" />
        <Picker.Item label="10 AM" value="10" />
        <Picker.Item label="2 PM" value="14" />
        <Picker.Item label="4 PM" value="16" />
        <Picker.Item label="6 PM" value="18" />
      </Picker>
      </View> 

        <Text style={{marginTop:25,fontweigth:500}} >Professional</Text>
        <View style={{marginTop:15}}>
        <Picker
         selectedValue={Professional}
        onValueChange={(value, index) => setProfessional(value)} 
        mode="dropdown" 
       style={{borderRadius:5 }} 
        >

        <Picker.Item label="Please select the professional" value="Unknown" />
        <Picker.Item label="Gas fitter" value="gasista" />
        <Picker.Item label="Plumber" value="plomero" />
        <Picker.Item label="Electrician" value="electricista" />
      </Picker>
      </View> 
      <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            marginTop: 50,
            marginBottom: 20,

          }}
       >
          <TouchableOpacity style={{borderBottomWidth: 2, marginLeft: 6, backgroundColor:'lightgrey',borderRadius:20,width:300, height:40, alignItems:"center" }} onPress={() => navigation.goBack()}>
            <Text style={{paddingTop:10,fontweigth:700}} >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SolutionScreen; 