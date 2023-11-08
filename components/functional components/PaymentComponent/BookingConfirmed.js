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
import axios from "axios";
import Lottie from 'lottie-react-native';


import { StatusBar } from "react-native";

import { COLORS, SIZES, FONTS, assets, CONST } from "../../../contants";
import { RectButton } from "../../ui components/Buttons";

const BookingConfirmed = ({ route, navigation }) => {

  const [animSpeed, setAnimSpeed] = useState(false)
  const animRef = useRef()

  const data = route.params

  function playAnimation() {
    setAnimSpeed(true)
  }


  useEffect(() => {
    setTimeout(() => {
      animRef.current?.play();
    }, 100)
  }, [animSpeed])


  function pauseAnimation() {
    setAnimSpeed(false)
  }

  async function fetchBookingInfo() {
    playAnimation()

    axios.post(`${CONST.baseUrlRegister}api/payment/confirmation/booking`,{
      "registrant_id": 198,
      "order_id": "ACT0001109",
      "booking_id": 10248
    }).then((response) => {
        console.log(response.data);
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      pauseAnimation()
    })
  }

  useEffect(()=>{
    // fetchBookingInfo()
  }, [])


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
        Your Order has been placed,{'\n'} Please check My Schedule for more information
      </Text>
      <RectButton text={"Navigate to Dashboard"} position='absolute'
        bottom={60} onClick={() => {
          navigation.dispatch(StackActions.pop(1))
        }} />
{/* 
      {animSpeed &&
        <View style={{
          shadowColor: COLORS.homeCard,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 8,
          zIndex: 5,
          borderRadius: 16,
          position: 'absolute', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.0)', alignSelf: 'center', padding: 24, top: '0'
        }}>

          <Lottie source={require('../../../assets/loading.json')} autoPlay style={{ height: 100, width: 100, alignSelf: 'center' }} loop ref={animRef} speed={1} />
        </View>
      } */}




    </SafeAreaView>
  )

}

export default BookingConfirmed;



