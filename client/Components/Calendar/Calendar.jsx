import { View, Text } from 'react-native'
import React, {useState} from 'react'
import {Calendar, Agenda} from 'react-native-calendars'
import {LocaleConfig} from 'react-native-calendars';
import theme from '../../theme/theme';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'Mayo', 'Jun.', 'Jul.', 'Ago.', 'Sept.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
  today: "Hoy"
};
LocaleConfig.defaultLocale = 'es';
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

const CalendarView = () => {
  const [events, setEvents] = useState([{
    affair: 'Luz',
    description: 'exploto el foco',
    date: '2022-07-15',
  },{
    affair: 'Gas',
    description: 'caño fuga',
    date: '2022-07-29',
  }]);

  return (
    <>
      {/* <Calendar markedDates={{
    '2022-07-22': {selected: true, marked: true, selectedColor: theme.colors.threePalet.primary},
    '2022-07-15': {selected: true, marked: true, selectedColor: 'blue'},
    '2022-07-27': {selected: true, marked: true, selectedColor: 'blue'},
    '2022-07-30': {selected: true, marked: true, selectedColor: 'blue'},
    '2022-06-17': {selected: true, marked: true, selectedColor: 'blue'},
    '2022-08-24': {selected: true, marked: true, selectedColor: 'blue'}
  }} onDayPress={(e) => {console.log('aca iria el ver evento', e)}} enableSwipeMonths style={{height: "100%", paddingTop: 100}} /> */}
  <Agenda items={{
    '2022-07-22': [{name: 'item 1 - any js object', height: 80, color: '#4286f4', textColor: '#fff', selectedColor: '#4286f4', value: 'any js object', day: '2022-07-22'}],
    '2012-05-23': [{name: 'item 2 - any js object', height: 80}],
    '2012-05-24': [],
    '2022-07-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
  }} renderItem={(item) => {
    return (
        <View>
            <Text>Hola que tal como estas yo todo bien y vos perfecto gracias aguante boca podes venir a arreglarme el calefon que se me rompio no es joda necesito ayuda en serio. atte: fd</Text>
        </View>
    )
}} />
    </>
  )
}

export default CalendarView