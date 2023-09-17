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



    const [passIcon, setPassIcon] = useState(false)
    const [visibility, setVisibility] = useState(false)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")









    // async function login() {
    //     if (email.trim().length === 0 || pass.trim().length === 0) {
    //         Toast.show({
    //             type: 'error',
    //             text1: 'Missing Data',
    //             visibilityTime: 1000
    //         });
    //         return;
    //     }
    //     try {
    //         await signInWithEmailAndPassword(auth, email, pass);
    //         route.params.finishAuth()

    //     } catch (error) {
    //         Toast.show({
    //             type: 'error',
    //             text1: error.response.data
    //         });
    //         throw error
    //     }
    // }


    return (

        <View style={{ flex: 1, backgroundColor: COLORS.white, alignItems: 'center' }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center',alignItems: 'center' }}>



                <StatusBar
                    background={COLORS.white}
                    backgroundColor={COLORS.white}
                    barStyle="dark-content"
                    style={{ backgroundColor: COLORS.white, flex: 1 }}
                ></StatusBar>

                <Image
                    source={assets.authDecor}
                    style={{ width: '35%', resizeMode: 'cover', height: '20%',position:'absolute', top:0, right:0 }}
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
                    placeholder="Email"
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
                        placeholder="Password"
                        onChangeText={(value) => setEmail(value)}
                        value={email}
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


                <RectButton marginTop={24} text="Sign In" onClick={() => {
                    // login()
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



                {/* <Toast
                    position='bottom'
                    bottomOffset={20}
                /> */}
            </ScrollView>

        </View>
    )
}

export default LoginScreen;