import { View, Text } from 'react-native'
import React from 'react'
import {Calendar} from 'react-native-calendars'
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
  return (
    <>
      <Calendar markedDates={{
    '2022-07-22': {selected: true, marked: true, selectedColor: theme.colors.threePalet.primary},
    '2022-07-15': {selected: true, marked: true, selectedColor: 'blue'},
    '2022-07-27': {selected: true, marked: true, selectedColor: 'blue'},
    '2022-07-30': {selected: true, marked: true, selectedColor: 'blue'},
    '2022-06-17': {selected: true, marked: true, selectedColor: 'blue'},
    '2022-08-24': {selected: true, marked: true, selectedColor: 'blue'}
  }} onDayPress={(e) => {console.log('aca iria el ver evento', e)}} enableSwipeMonths style={{height: "100%", paddingTop: 100}} />
    </>
  )
}

export default CalendarView