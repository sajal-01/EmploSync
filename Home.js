import React, { useState, useEffect } from 'react';
import arrowRight from './assets/arrow.png';
import { StatusBar } from 'expo-status-bar';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import SwipeButton from 'rn-swipe-button';

export default function Home() {
  const nav = useNavigation();
  const drawerStatus = useDrawerStatus();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [isPunchIn, setIsPunchIn] = useState(false);

  const handleSwipeSuccess = () => {
    setIsPunchIn((prevState) => !prevState);
    if (isPunchIn) {
      alert('Punch In Successful!');
    } else {
      alert('Punch Out Successful!');
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View
      style={{
        backgroundColor: '#e5fef2',
        height: '100%',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 50,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <Feather
          name="menu"
          size={40}
          color="black"
          onPress={() => nav.toggleDrawer()}
        />
        <Ionicons name="person-circle-outline" size={40} color="black" />
      </View>
      <Text
        style={{
          textAlign: 'left',
          fontSize: 20,
          margin: 20,
          marginBottom: 0,
        }}
      >
        Hi! Employee
      </Text>
      <Text
        style={{
          textAlign: 'left',
          fontSize: 13,
          margin: 20,
          marginTop: 5,
        }}
      >
        Emp ID: XXXXX
      </Text>

      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: 50,
          backgroundColor: '#90c8da',
          borderRadius: 20,
          marginLeft: 20,
          marginRight: 20,
          padding: 10,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            marginBottom: 20,
          }}
        >
          Mark your attendance
        </Text>
        <MapView
          style={{
            width: 300,
            height: 300,
            borderRadius: 20,
          }}
          region={region}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="My Marker"
            description="Some description"
          />
        </MapView>

        <View
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            margin: 50,
          }}
        >
          <SwipeButton
            disabled={false}
            swipeSuccessThreshold={60}
            height={45}
            width={300}
            title={isPunchIn ? 'Punch Out' : 'Punch In'}
            titleColor="black"
            shouldResetAfterSuccess={true}
            onSwipeSuccess={handleSwipeSuccess}
            railFillBackgroundColor="black"
            railFillBorderColor="black"
            thumbIconBackgroundColor="#ffffff"
            thumbIconBorderColor="#c1c1c1"
            railBackgroundColor="#7FBCD2"
            thumbIconImageSource={arrowRight}
            railBorderColor="black"
            railStyles={{
              backgroundColor: isPunchIn ? '#7FBCD2' : 'black',
            }}
            thumbIconStyles={{
              backgroundColor: isPunchIn ? '#ffffff' : 'black',
            }}
            onSwipeStart={() => {
              setIsPunchIn((prevState) => !prevState);
            }}
          />
        </View>
      </View>

      {/* <Button title="Go to settings" onPress={() => nav.navigate('Settings')} /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 8,
    padding: 8,
    borderColor: '#000000',
    borderWidth: 1,
    alignSelf: 'stretch',
  },
});
