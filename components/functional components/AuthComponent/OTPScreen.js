import * as React from "react";

import {
    Text,
    View,
    SafeAreaView,
    Image
} from "react-native";

import { StatusBar } from "react-native";

import { COLORS, SIZES, FONTS, assets } from "../../../contants";
import { RectButton } from "../../ui components/Buttons";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useState, useEffect } from "react";
import Toast from 'react-native-toast-message';



const OTPScreen = ({ route }) => {


    const [remainingTime, setRemainingTime] = useState(30);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        let interval;

        if (timerActive && remainingTime > 0) {
            interval = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (remainingTime === 0) {
            clearInterval(interval);
            setTimerActive(false);
            setRemainingTime(30)
            // Set your flag to true here
        }

        return () => clearInterval(interval);
    }, [timerActive, remainingTime]);

    const startTimer = () => {
        setRemainingTime(30);
        setTimerActive(true);
        // Set your flag to false when starting the timer
    };

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


            <View style={{ marginTop: 24, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center', width: '95%' }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: SIZES.font,
                        fontFamily: FONTS.medium,
                        color: COLORS.black,
                        marginBottom: 32
                    }}
                >
                    Enter 6 digit code that sent to your phone number
                </Text>


                <OTPInputView
                    style={{ width: '100%', height: 100 }}
                    pinCount={6}
                    autoFocusOnLoad
                    codeInputFieldStyle={{
                        width: 54,
                        height: 54,
                        borderWidth: 1,
                        borderRadius: 12,
                        backgroundColor: COLORS.otpBg,
                    }}
                    codeInputHighlightStyle={{ borderColor: COLORS.blue }}
                    onCodeFilled={(code => {
                        if (code == "000000") {
                                route.params.finishAuth()
                        } else {
                            Toast.show({
                                type: 'error',
                                text1: 'Wrong OTP'
                            });
                        }
                        console.log(`Code is ${code}, you are good to go!`)
                    })}
                />

                <View style={{ flexDirection: 'row' }}>

                    {/* <Text

                    style={{
                        textAlign: 'center',
                        fontSize: SIZES.medium,
                        fontFamily: FONTS.regular,
                        color: COLORS.black,
                        marginRight:6

                    }}
                >
                    {remainingTime}:00
                </Text> */}


                    <Text
                        onPress={() => { if (!timerActive) startTimer() }}
                        style={{
                            textAlign: 'center',
                            fontSize: SIZES.font,
                            fontFamily: FONTS.regular,
                            color: COLORS.blue,
                            marginLeft: 6
                            // textDecorationLine: 'underline'

                        }}
                    >
                        {timerActive ? `Wait for ${remainingTime} seconds before sending OTP again` : "Resend Code"}
                    </Text>

                </View>

                {/* <RectButton text={"Verify Now"} onClick={route.params.finishAuth} /> */}
            </View>

            <Toast
                position='bottom'
                bottomOffset={40}
            />

        </View>

    )
}

export default OTPScreen;