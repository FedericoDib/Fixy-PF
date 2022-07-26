import { View, Text } from 'react-native'
import React from 'react'
import {Calendar} from 'react-native-calendars' 
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
      <Calendar onDayPress={(e) => {console.log('aca iria el ver evento', e)}} enableSwipeMonths style={{height: "100%", paddingTop: 100}} />
    </>
  )
}

export default CalendarView