import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
//import MapView, { Marker, Polyline } from 'react-native-maps'

const latitudeDelta = 0.01,
  longitudeDelta = 0.01;
export default function UseGeolocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta,
        longitudeDelta,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (location !== null) {
    //function to get address using current lat and lng
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        location.latitude +
        "," +
        location.longitude +
        "&key=" +
        "AIzaSyCjaUjNivDjo1UMsuiLljUIEZrwHooJgxU"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setAddress(
          JSON.stringify(responseJson.results[0].formatted_address).replace(
            /"/g,
            ""
          )
        );
      });
    if (address) {
      var x = address.split(",");
    }
  }
  return { address: x, location };
}
/* <View style={styles.body}>

<MapView 
style= {styles.map} 
// initialRegion={{latitude:location.latitude,longitude:location.longitude,latitudeDelta:location.latitudeDelta,longitudeDelta:location.longitudeDelta}}
>
<Marker 
draggable
coordinate={location}
onDragEnd={(direction)=> setLocation(direction.nativeEvent.coordinate)}
/>
 

</MapView>  


</View>*/
