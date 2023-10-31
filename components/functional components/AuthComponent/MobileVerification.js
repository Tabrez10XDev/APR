import * as React from "react";

import {
    Text,
    View,
    SafeAreaView,
    Image
} from "react-native";

import { StatusBar } from "react-native";

import { COLORS, SIZES, FONTS, assets, CONST } from "../../../contants";
import { RectButton } from "../../ui components/Buttons";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useState, useEffect } from "react";
import Toast from 'react-native-toast-message';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from "../../ui components/Input";


const MobileVerification = ({ route, navigation }) => {


    const [remainingTime, setRemainingTime] = useState(30);
    const [timerActive, setTimerActive] = useState(false);

    const [number, setNumber] = useState(route.params.mobile_number ?? "")




    async function mobileVerification() {

        if(number.length !== 10){
            Toast.show({
                type: 'error',
                text1: "Invalid Number"
            });

            return
        }

        const payload = {
            "email_id":route.params.email_id,
            "mobile_number":number,
            "notif_token":null
        }

        axios.post(`${CONST.baseUrlAuth}api/registrant/verify/mobile`, payload).then(async (response) => {
            console.log(response.data)

            navigation.navigate("OTPScreen", { number: number, email: route.params.email_id })

        }).catch((err) => {
            console.log(err.response.data)
            Toast.show({
                type: 'error',
                text1: err.response.data
            });
        })


    }









    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white, alignItems: 'center' }}>
            <StatusBar
                background={COLORS.white}
                backgroundColor={COLORS.white}
                barStyle="dark-content"
                style={{ backgroundColor: COLORS.white, flex: 1 }}
            ></StatusBar>

            <Image
                source={assets.authDecor}
                style={{ width: '35%', resizeMode: 'cover', height: '20%', position: 'absolute', top: 0, right: 0 }}
            />

            <Image
                source={assets.logo}
                style={{ width: 280, marginTop: '25%', resizeMode: 'contain', height: 220, marginBottom: 12 }}
            />

            <Text
                style={{
                    fontSize: SIZES.medium,
                    fontFamily: FONTS.bold,
                    color: COLORS.black,
                    width: '90%',
                    textAlign: 'left',
                    marginTop: 14
                }}
            >
                Phone Number
            </Text>

            <Input
                placeholder="Enter Here"
                onChangeText={(value) => setNumber(value)}
                value={number}
                placeholderTextColor={COLORS.lightGray}
                maxLength={10}
                inputStyle={{ marginTop: 8 }}

            />

            <RectButton text={"Verify Now"} onClick={mobileVerification} />


            <Toast
                position='bottom'
                bottomOffset={40}
            />

        </View>

    )
}

export default MobileVerification;