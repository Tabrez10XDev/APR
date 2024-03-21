import * as React from "react";

import {
    Text,
    View,
    SafeAreaView,
    Image
} from "react-native";

import { StatusBar } from "react-native";
import * as Clipboard from 'expo-clipboard';

import { COLORS, SIZES, FONTS, assets, CONST } from "../../../contants";
import { RectButton } from "../../ui components/Buttons";
// import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useState, useEffect, useRef } from "react";
import Toast from 'react-native-toast-message';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import OTPTextView from "react-native-otp-textinput";

const OTPScreen = ({ route }) => {

    let otpinput = useRef(null);


    const [animSpeed, setAnimSpeed] = useState(false)
    const animRef = useRef()

    function playAnimation() {
        setAnimSpeed(true)
    }


    const [otp, setOtp] = useState("")

    const handleCellTextChange = async (text, i) => {
        if (i === 0 && Clipboard) {
            const clippedText = await Clipboard.getStringAsync();
            console.log(clippedText);
            if (clippedText && clippedText.slice(0, 1) === text) {
                otpinput.current?.setValue(clippedText, true);
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            animRef.current?.play();
        }, 100)
    }, [animSpeed])


    function pauseAnimation() {
        setAnimSpeed(false)
    }


    const [remainingTime, setRemainingTime] = useState(30);
    const [timerActive, setTimerActive] = useState(false);


    const saveAuth = async (id, name) => {
        try {
            await AsyncStorage.setItem('AuthState', id.toString())
            await AsyncStorage.setItem('firstName', name.toString())

            route.params.finishAuth()
        } catch (err) {
            alert(err)
        }
    }



    async function verifyOTP(otp) {

        let payload = {
            "current_phone_number": null,
            "phone_number": route.params.phone_number,
            "otp": parseInt(otp),
            "notif_token": null,
            "change_phone_number": false,
            "email_id": route.params.email ?? null
        }

        if (route.params.isChange) {
            payload = {
                "current_phone_number": route.params.phone_number,
                "phone_number": route.params.new_phone_number,
                "change_phone_number": true,
                "email_id": route.params.email ?? null,
                "otp": parseInt(otp),
                "notif_token": null
            }
        }

        console.log(payload);
        playAnimation()

        axios.post(`${CONST.baseUrlAuth}api/registrant/verify/otp`, payload).then(async (response) => {
            console.log(response.data)
            if (response.data.mobile_no_verify_status) {
                saveAuth(response.data.registrant_id, response.data.first_name + " " + response.data.last_name)

            } else {
                Toast.show({
                    type: 'error',
                    text1: response.data.message

                });
            }
        }).catch((err) => {
            console.log(err.response.data)
            Toast.show({
                type: 'error',
                text1: err.response.data.message
            });
        }).finally(() => {
            pauseAnimation()
        })

    }


    async function resendOTP() {

        const payload = {
            "email_id": route.params.email ?? null,
            "mobile_number": route.params.number
        }
        // try {
        axios.post(`${CONST.baseUrlAuth}api/registrant/resend/otp`, payload).then((response) => {
            console.log(response.data)
            startTimer()
        }).catch((err) => {
            console.error(err.response.data)
            Toast.show({
                type: 'error',
                text1: err.response.data
            });
        })
    }



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

                <OTPTextView
                    tintColor={COLORS.blue}
                    ref={otpinput}
                    handleCellTextChange={handleCellTextChange}
                    textInputStyle={{
                        borderRadius: 10,
                        borderWidth: 1,

                    }}
                    inputCount={6} handleTextChange={(text) => {
                        if (text.length == 6) {
                            setOtp(text)
                            console.log(text);
                            verifyOTP(text)
                        }
                    }} />


                {/* <OTPInputView
                    style={{ width: '100%', height: 100 }}
                    pinCount={6}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={{
                        width: 54,
                        height: 54,
                        borderWidth: 1,
                        borderRadius: 12,
                        backgroundColor: COLORS.otpBg,
                        color: 'black'
                    }}
                    codeInputHighlightStyle={{ borderColor: COLORS.blue }}

                    onCodeFilled={(code => {
                        verifyOTP(code)
                        console.log(`Code is ${code}, you are good to go!`)
                    })}
                /> */}

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
                        onPress={() => { if (!timerActive) resendOTP() }}
                        style={{
                            textAlign: 'center',
                            fontSize: SIZES.font,
                            fontFamily: FONTS.regular,
                            color: COLORS.blue,
                            marginLeft: 6,
                            marginTop: 16
                            // textDecorationLine: 'underline'

                        }}
                    >
                        {timerActive ? `Wait for ${remainingTime} seconds before sending OTP again` : "Resend Code"}
                    </Text>

                </View>

                {/* <RectButton text={"Verify Now"} onClick={route.params.finishAuth} /> */}
            </View>

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
            }

            <Toast
                position='bottom'
                bottomOffset={40}
            />

        </View>

    )
}

export default OTPScreen;