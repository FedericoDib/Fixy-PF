import { View, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, Agenda } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import theme from "../../theme/theme";
import { Avatar, Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import IconUser from 'react-native-vector-icons/FontAwesome5';

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Mar.",
    "Abr.",
    "Mayo",
    "Jun.",
    "Jul.",
    "Ago.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dic.",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";
// import ApiCalendar from 'react-google-calendar-api';

// const config = {
//   "clientId": "302940809798-bb9fvtjipv232sglpnrglc228fp28r1q.apps.googleusercontent.com",
//   "apiKey": "AIzaSyDF0_LtJF7Ct04VBorVRloJ-MB1Ofj2OHY",
//   "scope": "https://www.googleapis.com/auth/calendar",
//   "discoveryDocs": [
//     "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
//   ]
// }

// const apiCalendar = new ApiCalendar(config)

const CalendarView = ({ navigation }) => {
  let requests = useSelector((state) => state.generalReducer.allRequests);
  requests = requests.filter((r) => r.status === "active" || r.status === "completed");
  const [items, setItems] = useState({});

  useEffect(() => {
    formatItem(requests);
  }, []);

  const formatItem = (requests) => {
    requests?.map((request) => {
      console.log("REQUEST", request);
      let date;
      if (request.date.length < 9) {
        date = "20" + request.date.split("/").reverse().join("-");
      } else {
        date = request.date.slice(0, 10);
      }
      if (items.hasOwnProperty(date)) {
        if (items[date][0].id === request.id) {
          return;
        } else {
          const item = {
              id: request.id,
              affair: request.affair,
              description: request.description,
              date: date,
              availableTime: request.budget[0].turn,
              category: request.category,
              selectedColor: theme.colors.threePalet.primary,
            }
          items[date].push(item);
        }
      } else {
        items[date] = [
          {
            id: request.id,
            affair: request.affair,
            description: request.description,
            date: date,
            availableTime: request.budget[0].turn,
            category: request.category,
            selectedColor: theme.colors.threePalet.primary,
          },
        ];
      }
    });
  };

  const renderEmptyData = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }} variant="titleLarge">
          No hay eventos programados para este día.
        </Text>
      </View>
    );
  };

  const renderItem = (item) => {
    console.log(item)
    return (
      <TouchableOpacity
        style={{ marginTop: 10, marginRight: 10, height: "100%"}}
        onPress={() => navigation.navigate("Resume", { item })}
      >
        <Card style={{backgroundColor: theme.colors.threePalet.secondary, borderRadius: 10}}>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ paddingRight: 15, fontSize: 20, borderRightWidth: 1, borderRightColor: theme.colors.threePalet.primary}}>{item.affair}</Text>
              <Text style={{ paddingHorizontal: 15, flex: 2, fontSize: 18, borderRightWidth: 1, borderRightColor: theme.colors.threePalet.primary  }} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={{ paddingHorizontal: 15, fontSize: 20 }}>{item.availableTime} hs</Text>
              {item.category === "electricista" ? (<Icon
								name='electrical-services'
								color={theme.colors.threePalet.primary}
								size={60}
							/>) : item.category === "gasista" ? (<Icon2
								name='gas-cylinder'
								color={theme.colors.threePalet.primary}
								size={60}
							/>) : item.category === "plomero" ? (<Icon2
								name='water-pump'
								color={theme.colors.threePalet.primary}
								size={60}
							/>) : <IconUser
              name='house-user'
              color={theme.colors.threePalet.primary}
              size={60}
            />}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 30, backgroundColor: "#fff" }}>
      {items && (
        <Agenda
          pastScrollRange={3}
          futureScrollRange={3}
          items={items}
          renderItem={renderItem}
          renderEmptyData={renderEmptyData}
        />
      )}
    </View>
  );
};

export default CalendarView;
