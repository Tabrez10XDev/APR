import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    StyleSheet,
    Platform
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as AppleAuthentication from 'expo-apple-authentication';
import { StatusBar } from "react-native";
import { COLORS, SIZES, FONTS, assets, CONST, } from "../../../contants";
import Toast from 'react-native-toast-message';
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../ui components/Input";
import { RectButton, GSignInButton } from "../../ui components/Buttons";
import Lottie from 'lottie-react-native';
import authContext from '../../../contants/authContext';

const LoginScreen = ({ navigation, route }) => {


    const [isChecked, setChecked] = useState(false)

    const [passIcon, setPassIcon] = useState(false)
    const [visibility, setVisibility] = useState(false)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")


    const [animSpeed, setAnimSpeed] = useState(false)
    const animRef = useRef()

    function playAnimation() {
        setAnimSpeed(true)
    }


    const signIn = async (setCorpCode) => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log(userInfo)
          setCorpCode(false)

          await AsyncStorage.setItem('CorpState', "-1")
          route.params.finishAuth()

        //   await AsyncStorage.setItem('firstName', response.data.first_name)
        //   else saveAuth(response.data.user_id.toString())
        } catch (error) {
            console.log(error);
        //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //     // user cancelled the login flow
        //   } else if (error.code === statusCodes.IN_PROGRESS) {
        //     // operation (e.g. sign in) is in progress already
        //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //     // play services not available or outdated
        //   } else {
        //     // some other error happened
        //   }
        }
      };

    useEffect(()=>{
        GoogleSignin.configure();

    },[])

    useEffect(() => {
        setTimeout(() => {
            animRef.current?.play();
        }, 100)
    }, [animSpeed])


    function pauseAnimation() {
        setAnimSpeed(false)
    }




    const saveAuth = async (id) => {
        try {
            await AsyncStorage.setItem('AuthState', id.toString())
            route.params.finishAuth()
        } catch (err) {
            alert(err)
        }
    }




    // function safeLogin() {
    //     if (isChecked) corpLogin()
    //     else login()
    // }

    async function login(setCorpCode) {
        if (email.trim().length === 0 || pass.trim().length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Missing Data',
                visibilityTime: 1000
            });
            return;
        }

        playAnimation()
        const payload = {
            "first_name": null,
            "last_name": null,
            "email_id": email.toLowerCase(),
            "password": pass,
            "notif_token": null,
            "google_id": null
        }




        try {
            axios.post(`${CONST.baseUrlAuth}api/registrant/signin`, payload).then(async (response) => {
                console.log(response.data)
                if (response.status !== 200) {
                    Toast.show({
                        type: 'error',
                        text1: response.data
                    });
                }
                else if (response.data.mobile_no_verify_status == false) navigation.navigate("MobileVerification", response.data)
                else {

                    if (response.data.corporate_id) setCorpCode(true)
                    else setCorpCode(false)

                    await AsyncStorage.setItem('CorpState', response.data.corporate_id ? response.data.corporate_id.toString() : "-1")
                    await AsyncStorage.setItem('firstName', response.data.first_name)
                    if (response.data.registrant_id) saveAuth(response.data.registrant_id.toString())
                    else saveAuth(response.data.user_id.toString())
                }

            }).finally(() => {
                pauseAnimation(1)
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
        <authContext.Consumer>
            {({ userId, setUserId, setCorpCode }) => (
                <View style={{ flex: 1, backgroundColor: COLORS.white, alignItems: 'center' }}>
                    <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ alignItems: 'center', alignItems: 'center' }}>



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

                        {/* <View style={{ flexDirection: 'row', alignSelf: 'center', width: '90%', marginTop: 14, justifyContent: 'space-between', alignItems: 'center' }}>

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

                </View> */}


                        <RectButton marginTop={24} text="Sign In" onClick={() => {
                            login(setCorpCode)
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
                            signIn(setCorpCode)

                        }} />

                        {Platform.OS == "ios" &&
                            <AppleAuthentication.AppleAuthenticationButton
                                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                                cornerRadius={5}
                                style={styles.button}
                                onPress={async () => {
                                    try {
                                        const credential = await AppleAuthentication.signInAsync({
                                            requestedScopes: [
                                                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                                            ],
                                        });
                                        console.log("SUccess");
                                        route.params.finishAuth()

                                        // signed in
                                    } catch (e) {
                                        console.error(e);
                                        if (e.code === 'ERR_REQUEST_CANCELED') {
                                            // handle that the user canceled the sign-in flow
                                        } else {
                                            // handle other errors
                                        }
                                    }
                                }}
                            />}

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
        </authContext.Consumer>
    )
}

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '90%',
        marginTop: 16,
        height: 44,
    },
});