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
    Dimensions
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { StatusBar } from "react-native";
import { COLORS, SIZES, FONTS, assets, CONST, } from "../../../contants";
// import { TextInput } from "@react-native-material/core";
import Toast from 'react-native-toast-message';
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
// import {Input} from "../../ui components";
import Input from "../../ui components/Input";
import { RectButton, GSignInButton } from "../../ui components/Buttons";

const LoginScreen = ({ navigation, route }) => {


    const [isChecked, setChecked] = useState(false)

    const [passIcon, setPassIcon] = useState(false)
    const [visibility, setVisibility] = useState(false)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")



    const saveAuth = async (id) => {
        try {
            await AsyncStorage.setItem('AuthState', id.toString())
            route.params.finishAuth()
        } catch (err) {
            alert(err)
        }
    }




    function safeLogin() {
        if (isChecked) corpLogin()
        else login()
    }

    async function login() {
        if (email.trim().length === 0 || pass.trim().length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Missing Data',
                visibilityTime: 1000
            });
            return;
        }
        const payload = {
            "first_name": null,
            "last_name": null,
            "email_id": email,
            "password": pass,
            "notif_token":null,
            "google_id": ""
        }
        console.log(`${CONST.baseUrlAuth}api/registrant/signin`)
        try {
            axios.post(`${CONST.baseUrlAuth}api/registrant/signin`, payload).then(async (response) => {
                console.log(response.data)
                await AsyncStorage.setItem('CorpState', "0")

                saveAuth(response.data.user_id)

            }).catch((err) => {
                console.log(err.response.data)
                Toast.show({
                    type: 'error',
                    text1: err.response.data
                });
            })
            // route.params.finishAuth()

        } catch (error) {
            console.log(err.response.data)

            Toast.show({
                type: 'error',
                text1: error.response.data
            });
            throw error
        }
    }

    async function corpLogin() {
        if (email.trim().length === 0 || pass.trim().length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Missing Data',
                visibilityTime: 1000
            });
            return;
        }
        const payload = {
            "email_id": email,
            "password": pass
        }
        try {
            axios.post(`${CONST.baseUrlAuth}api/registrant/corp/user/login`, payload).then(async (response) => {
                console.log(response.data)
                await AsyncStorage.setItem('CorpState', "1")
                saveAuth(response.data.user_id)

            }).catch((err) => {
                console.log(err.response.data)
                Toast.show({
                    type: 'error',
                    text1: err.response.data
                });
            })
            // route.params.finishAuth()

        } catch (error) {
            console.log(err.response.data)

            Toast.show({
                type: 'error',
                text1: error.response.data
            });
            throw error
        }
    }




    return (

        <View style={{ flex: 1, backgroundColor: COLORS.white, alignItems: 'center' }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', alignItems: 'center' }}>



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
                    Login
                </Text>

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
                    Email/ Phone Number
                </Text>

                <Input
                    placeholder="Enter Here"
                    onChangeText={(value) => setEmail(value)}
                    value={email}
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
                        marginTop: 16
                    }}
                >
                    Password
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <Input
                        placeholder="Enter Here"
                        onChangeText={(value) => setPass(value)}
                        value={pass}
                        placeholderTextColor={COLORS.lightGray}
                        inputprops={{ secureTextEntry: !visibility }}
                    />
                    {/* <TextInput value={pass} onChangeText={(text) => { setPass(text) }} secureTextEntry={!visibility} variant="outlined" label="Password" style={{ marginHorizontal: 16, width: '90%' }} color={COLORS.blue} /> */}
                    <TouchableOpacity
                        onPress={() => {
                            setVisibility(!visibility)
                            setPassIcon(!passIcon)
                        }}
                        style={{ alignItems: 'center', justifyContent: 'center', width: 32, height: 32, position: 'absolute', right: 24, zIndex: 5 }}
                    >
                        <Feather name={passIcon ? 'eye-off' : 'eye'} size={24} color={COLORS.grey} />


                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 12, marginEnd: 24, alignSelf: 'flex-end' }}>

                    <Text
                        style={{
                            fontSize: SIZES.small,
                            fontFamily: FONTS.medium,
                            color: COLORS.blue,
                            padding: 4

                        }}
                        onPress={() => {
                            // navigation.navigate("ForgotPassword")
                        }}
                    >
                        Forgot Password ?
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignSelf: 'center', width: '90%', marginTop: 14, justifyContent: 'space-between', alignItems: 'center' }}>

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
                        }}
                    >
                        Choose this for Corporate Login
                    </Text>

                </View>


                <RectButton marginTop={24} text="Sign In" onClick={() => {
                    safeLogin()
                    // route.params.finishAuth()
                }} />

                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: SIZES.medium,
                        fontFamily: FONTS.medium,
                        color: COLORS.black,
                        marginTop: 16

                    }}
                >
                    Or
                </Text>

                {/* <TouchableOpacity style={{marginTop:8}}>
                    <Image source={assets.google} style={{width:42, height:42, resizeMode:'contain'}}/>
                </TouchableOpacity> */}

                <GSignInButton text="Sign In with Google" onClick={() => {
                    // promptAsync()

                }} />

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: SIZES.medium }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: SIZES.medium,
                            fontFamily: FONTS.regular,
                            color: COLORS.greenAccent,

                        }}
                    >
                        Don’t have an account?
                    </Text>
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
                            navigation.navigate("SignUpScreen")
                        }}
                    >
                        Sign Up Now
                    </Text>



                </View>



                <Toast
                    position='bottom'
                    bottomOffset={20}
                />
            </ScrollView>

        </View>
    )
}

export default LoginScreen;