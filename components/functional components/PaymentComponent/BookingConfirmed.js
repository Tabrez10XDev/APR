import * as React from "react";
import { useState, useEffect, useRef } from "react";

import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  ScrollView,
  Image,
  TextInput,
  Dimensions
} from "react-native";
import { StackActions } from '@react-navigation/native';

import Lottie from 'lottie-react-native';


import { StatusBar } from "react-native";
import { RectButton } from "../../ui components";

import { COLORS, SIZES, FONTS, assets } from "../../../contants";


const BookingConfirmed = ({ route, navigation }) => {

  // navigation.reset({
  //   index:0,
  //   actions: [{name: 'FlightsScreen'}]

  // })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, alignItems: 'center' }}>
      <StatusBar
        background={COLORS.white}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
        style={{ backgroundColor: COLORS.white, flex: 1 }}
      ></StatusBar>

      {/* <Text>
        {route.params}
      </Text> */}





      <Lottie source={require('../../../assets/confirmed.json')} autoPlay />

      <Text
        style={{
          textAlign: 'center',
          fontSize: SIZES.small,
          fontFamily: FONTS.semiBold,
          color: COLORS.blue,
          maxWidth: '80%',
          position: 'absolute',
          bottom: 150
        }}
      >
        Your request has been placed,{'\n'} Please wait for Errances Voyages to contact you
      </Text>
      <RectButton text={"Navigate to Dashboard"} position='absolute'
        bottom={70} onClick={() => {
          navigation.dispatch(StackActions.pop(1))
        }} />






    </SafeAreaView>
  )

}

export default BookingConfirmed;



