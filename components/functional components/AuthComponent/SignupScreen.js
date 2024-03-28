import * as React from "react";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Platform,
    Dimensions
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";
import { COLORS, SIZES, FONTS, assets, CONST, } from "../../../contants";
// import { TextInput } from "@react-native-material/core";
import Toast from 'react-native-toast-message';
import axios from "axios";
// import {Input} from "../../ui components";
import Input from "../../ui components/Input";
import { RectButton, GSignInButton } from "../../ui components/Buttons";
import { useRef } from "react";
import Lottie from 'lottie-react-native';


const SignUpScreen = ({ navigation, route }) => {



    const [animSpeed, setAnimSpeed] = useState(false)
    const animRef = useRef()

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


    const [isChecked, setChecked] = useState(false)

    const [passIcon, setPassIcon] = useState(false)
    const [visibility, setVisibility] = useState(false)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        corpCode: null,
        number: ""
    })

    function safeSignUp() {
        signup()
        // if (state.corpCode == null) signup()
        // else if (state.corpCode.trim().length == 0) signup()
        // else corpSignup()
    }

    // async function corpSignup() {

    //     if (!isChecked) {
    //         Toast.show({
    //             type: 'error',
    //             text1: 'Agree to Terms&Conditions',
    //             visibilityTime: 1000
    //         });
    //         return;
    //     }

    //     if (state.firstName.trim().length === 0 || state.lastName.trim().length === 0 || state.email.trim().length === 0 || state.number.trim().length === 0) {
    //         Toast.show({
    //             type: 'error',
    //             text1: 'Missing Data',
    //             visibilityTime: 1000
    //         });
    //         return;
    //     }
    //     if(state.number.trim().length !== 10){
    //         Toast.show({
    //             type: 'error',
    //             text1: 'Invalid Number',
    //             visibilityTime: 1000
    //         });
    //         return; 
    //     }
    //     if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())){
    //         Toast.show({
    //             type: 'error',
    //             text1: 'Invalid Email',
    //             visibilityTime: 1000
    //         });
    //         return; 
    //     }
    //     const payload = {
    //         "first_name": state.firstName,
    //         "middle_name": null,
    //         "last_name": state.lastName,
    //         "email_id": state.email,
    //         "mobile_number": state.number,
    //         corporate_code: state.corpCode,
    //         corporate_user: true,
    //         google_id: null,
    //         notif_token: null
    //     }

    //     console.log(payload)
    //     playAnimation()
    //     try {
    //         axios.post(`${CONST.baseUrlAuth}api/registrant/signup`, payload).then(async (response) => {
    //             console.log(response.data)
    //             console.log("----")
    //             await AsyncStorage.setItem('CorpState', "1")
    //             await AsyncStorage.setItem('firstName', state.firstName)
    //             pauseAnimation()
    //             navigation.navigate("OTPScreen", { number: state.number, email: state.email })
    //         }).catch((err) => {
    //             console.log(err.response)
    //             pauseAnimation()
    //             Toast.show({
    //                 type: 'error',
    //                 text1: err.response.data ?? "Please try again later"
    //             });
    //         })

    //     } catch (error) {
    //         pauseAnimation()
    //         Toast.show({
    //             type: 'error',
    //             text1: error.response.data
    //         });
    //         throw error
    //     }
    // }

    async function signup() {

        if (!isChecked) {
            Toast.show({
                type: 'error',
                text1: 'Agree to Terms&Conditions',
                visibilityTime: 1000
            });
            return;
        }

        if (state.firstName.trim().length === 0 || state.lastName.trim().length === 0 || state.email.trim().length === 0 || state.number.trim().length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Missing Data',
                visibilityTime: 1000
            });
            return;
        }

        if(state.number.trim().length !== 10){
            Toast.show({
                type: 'error',
                text1: 'Invalid Number',
                visibilityTime: 1000
            });
            return; 
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())){
            Toast.show({
                type: 'error',
                text1: 'Invalid Email',
                visibilityTime: 1000
            });
            return; 
        }
        if(!/^[A-Za-z]+$/.test(state.firstName.trim()) || !/^[A-Za-z]+$/.test(state.lastName.trim())){
            Toast.show({
                type: 'error',
                text1: 'Numbers are not accepted in Names',
                visibilityTime: 1000
            });
            return; 
        }



        playAnimation()
        const payload = {
            "first_name": state.firstName.trim(),
            "middle_name": null,
            "last_name": state.lastName.trim(),
            "email_id": state.email.toLowerCase().trim(),
            "mobile_number": state.number,
            "google_id": null,
            "corporate_user": false,
            "password": "",
            "corporate_code": null,
            "notif_token": null

        }

        console.log(payload)
        axios.post(`${CONST.baseUrlAuth}api/registrant/signup`, payload).then(async (response) => {
            console.log(response.data)
            console.log(response.status);
            if (response.status == 200) {
                console.log("----")
                await AsyncStorage.setItem('CorpState', "0")
                await AsyncStorage.setItem('firstName', state.firstName)
                // await axios.post(`${CONST.baseUrlAuth}api/registrant/resend/otp`, {
                //     "email_id": state.email.toLowerCase(),
                //     "mobile_number": state.number
                // })

                navigation.navigate("OTPScreen", { phone_number: state.number, email: state.email })
            } else {
                Toast.show({
                    type: 'error',
                    text1: response.data ?? "Please try again later"
                });
            }
        })
            .catch((err) => {
                console.log(err.response.data)
                Toast.show({
                    type: 'error',
                    text1: err.response.data.error_msg ? "Please try again later!" : err.response.data
                });
            }).finally(() => {
                pauseAnimation()
            })

    }






    return (

        <View style={{ flex: 1, backgroundColor: COLORS.white, alignItems: 'center' }}>
            <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ alignItems: 'center', alignItems: 'center', paddingBottom: Platform.OS == 'ios' ? 10 :10 }}>



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
                        fontSize: SIZES.large,
                        fontFamily: FONTS.extraBold,
                        color: COLORS.black,
                        width: '90%',
                        textAlign: 'left',
                        marginTop: 8
                    }}
                >
                    Sign Up
                </Text>

                <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: "space-between" }}>
                    <View style={{ alignSelf: 'flex-start', width: '48%' }}>
                        <Text
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.bold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 14
                            }}
                        >
                            First Name
                        </Text>

                        <Input
                            placeholder="Enter Here"
                            onChangeText={(value) => setState(current => ({ ...current, firstName: value }))}
                            value={state.firstName}
                            placeholderTextColor={COLORS.lightGray}
                            inputprops={{ width: "100%", alignSelf: 'flex-start' }}

                        />

                    </View>

                    <View style={{ alignSelf: 'flex-start', width: '48%' }}>
                        <Text
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.bold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 14
                            }}
                        >
                            Last Name
                        </Text>

                        <Input
                            placeholder="Enter Here"
                            onChangeText={(value) => setState(current => ({ ...current, lastName: value }))}
                            value={state.lastName}
                            placeholderTextColor={COLORS.lightGray}
                            inputprops={{ width: "100%", alignSelf: 'flex-start' }}

                        />

                    </View>


                </View>


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
                    Email
                </Text>

                <Input
                    placeholder="Enter Here"
                    onChangeText={(value) => setState(current => ({ ...current, email: value }))}
                    value={state.email}
                    placeholderTextColor={COLORS.lightGray}
                    inputStyle={{ marginTop: 8 }}

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
                    Corporate code <Text style={{ color: COLORS.grey }}>( optional)</Text>
                </Text>

                <Input
                    placeholder="Enter Here"
                    onChangeText={(value) => setState(current => ({ ...current, corpCode: value }))}
                    value={state.corpCode}
                    placeholderTextColor={COLORS.lightGray}
                    inputStyle={{ marginTop: 8 }}

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
                    onChangeText={(value) => setState(current => ({ ...current, number: value }))}
                    value={state.number}
                    inputType='numeric'
                    maxLength={10}
                    placeholderTextColor={COLORS.lightGray}
                    inputStyle={{ marginTop: 8 }}

                />
                <View style={{ flexDirection: 'row', alignSelf: 'center', width: '90%', marginTop: 8, justifyContent: 'space-between' }}>

                    <BouncyCheckbox
                        size={25}
                        fillColor={COLORS.blue}
                        unfillColor={COLORS.grey}
                        iconStyle={{ borderColor: COLORS.grey }}
                        innerIconStyle={{ borderWidth: 2 }}
                        onPress={(isChecked) => { setChecked(isChecked) }}
                    />

                    <Text
                        style={{
                            fontSize: SIZES.font,
                            fontFamily: FONTS.medium,
                            color: COLORS.grey,
                            width: '90%',
                            textAlign: 'left',
                            marginTop: 14
                        }}
                    >
                        By sign up, you agree to APR marathon {`\n`}
                        <Text style={{ color: COLORS.blue, textDecorationLine: 'underline' }}>Terms and Conditions</Text> & <Text style={{ color: COLORS.blue, textDecorationLine: 'underline' }}>Privacy Policy</Text>
                    </Text>

                </View>







                <RectButton marginTop={24} text="Sign Up" onClick={() => {
                    safeSignUp()

                }} />



                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: SIZES.medium, paddingBottom: 12 }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: SIZES.medium,
                            fontFamily: FONTS.regular,
                            color: COLORS.greenAccent,

                        }}
                    >
                        Already have an account?</Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: SIZES.medium,
                            fontFamily: FONTS.medium,
                            color: COLORS.blue,
                            marginStart: 8,
                            textDecorationLine: 'underline'

                        }}
                        onPress={() => {
                            navigation.navigate("LoginScreen")
                        }}
                    >
                        Login Now
                    </Text>



                </View>




            </ScrollView>

            <Toast
                position='bottom'
                bottomOffset={40}
            />

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

        </View>
    )
}

export default SignUpScreen;