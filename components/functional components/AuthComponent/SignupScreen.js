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

const SignUpScreen = ({ navigation, route }) => {


    const [isChecked, setChecked] = useState(false)

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
            <ScrollView contentContainerStyle={{ alignItems: 'center', alignItems: 'center', paddingBottom:100 }}>



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
                    Name
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
                        marginTop: 14
                    }}
                >
                    Email
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
                        marginTop: 14
                    }}
                >
                    Phone Number
                </Text>

                <Input
                    placeholder="Email"
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                    placeholderTextColor={COLORS.lightGray}
                    inputStyle={{ marginTop: 8 }}

                />
                <View style={{ flexDirection: 'row', alignSelf: 'center', width: '90%', marginTop: 8, justifyContent:'space-between' }}>

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
                    // login()
                    navigation.navigate("OTPScreen")

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



                {/* <Toast
                    position='bottom'
                    bottomOffset={20}
                /> */}
            </ScrollView>

        </View>
    )
}

export default SignUpScreen;