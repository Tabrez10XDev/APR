import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton } from '../../ui components/Buttons';
import axios from 'axios';
import authContext from '../../../contants/authContext';
import { useRef, useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { StackActions, useTheme } from '@react-navigation/native';
import BillingInfoBottomSheet from '../../ui components/BillingInfoBottomSheet';
import Lottie from 'lottie-react-native';

const CreateOrder = ({ navigation, route }) => {


    const [billingAddress, setBillingAddress] = useState(route.params.billingAddress)
    const refRBSheet = useRef();


    const [animSpeed, setAnimSpeed] = useState(false)
    const animRef = useRef()



    function playAnimation() {
        setAnimSpeed(true)
    }

    console.log("-------");
    console.log(route.params)


    useEffect(() => {
        setTimeout(() => {
            animRef.current?.play();
        }, 100)
    }, [animSpeed])


    function pauseAnimation() {
        setAnimSpeed(false)
    }


    async function initiatePayment() {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${CONST.baseUrlRegister}api/payment/initiate`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(route.params.payload)
        };

        console.log(JSON.stringify(route.params.payload));

        playAnimation()


        axios.request(config)
            .then((response) => {
                console.log("Iniaited");
                if (response.data.status.code == "PAYMENT_INITIATED") {
                    navigation.navigate("PaymentWebView", { ...response.data.status.data, details: response.data.details, orderDetails: route.params.orderDetails })

                    // navigation.navigate("ValidatePayment", { ...response.data.status.data, details: response.data.details, orderDetails: route.params.orderDetails })
                }
            })
            .catch((error) => {
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: error.response.data
                });
            }).finally(() => {
                pauseAnimation()
            })
    }


    return (
        <authContext.Consumer>
            {({ userId, setUserId, corpCode }) => (
                <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                    <StatusBar
                        background={COLORS.blue}
                        backgroundColor={COLORS.blue}
                        barStyle="light-content"
                        style={{ backgroundColor: COLORS.blue, flex: 1 }}

                    ></StatusBar>

                    <View style={{ height: '12%', width: '100%', backgroundColor: COLORS.blue, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            navigation.dispatch(StackActions.pop(1))

                        }} style={{ width: 36, height: 36, position: 'absolute', left: 12, top: 60, alignSelf: 'flex-start' }}>
                            <Ionicons name="chevron-back" size={36} color="white" />
                        </TouchableOpacity>


                        <Text
                            style={{
                                fontSize: SIZES.large,
                                fontFamily: FONTS.bold,
                                color: COLORS.white,
                                textAlign: 'center',
                                marginBottom: 12
                            }}
                        >
                            Checkout
                        </Text>
                    </View>

                    <Text
                        style={{
                            fontSize: SIZES.medium,
                            fontFamily: FONTS.bold,
                            color: COLORS.blue,
                            textAlign: 'left',
                            marginHorizontal: 16,
                            marginTop: 16
                        }}
                    >
                        Please confirm and checkout the order

                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: 12 }}>

                        <Text
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 16
                            }}
                        >
                            Billing Address

                        </Text>

                        <Text
                            onPress={() => {
                                refRBSheet.current.open()
                            }}
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.regular,
                                color: COLORS.blue,
                                textAlign: 'left',
                                marginTop: 16,
                                marginRight: 8
                            }}
                        >
                            Edit

                        </Text>
                    </View>

                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 6,
                            }}
                        >
                            JOhn

                        </Text>

                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 6,
                                maxWidth: '80%'
                            }}
                        >
                            {billingAddress ?? "Billing Address"}

                        </Text>

                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 6,
                            }}
                        >
                            828282882

                        </Text>



                        <Text
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 32
                            }}
                        >
                            Order Summary

                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 12 }}>

                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.regular,
                                    color: COLORS.blue,
                                    textAlign: 'left',

                                }}
                            >
                                Order ID

                            </Text>


                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.regular,
                                    color: COLORS.black,
                                    textAlign: 'right',

                                }}
                            >
                                {route.params.orderDetails.order_id}

                            </Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>

                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.regular,
                                    color: COLORS.blue,
                                    textAlign: 'left',

                                }}
                            >
                                Registrant Class

                            </Text>


                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.regular,
                                    color: COLORS.black,
                                    textAlign: 'right',

                                }}
                            >
                                {route.params.orderDetails.registrant_class}

                            </Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>

                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.regular,
                                    color: COLORS.blue,
                                    textAlign: 'left',

                                }}
                            >
                                Amount

                            </Text>


                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.regular,
                                    color: COLORS.black,
                                    textAlign: 'right',

                                }}
                            >
                                {route.params.orderDetails.amount} /-

                            </Text>

                        </View>



                    </View>

                    <RectButton text={"Pay Now"} onClick={initiatePayment} alignSelf='center' position='absolute' bottom={60} />

                    <Toast
                        position='bottom'
                        bottomOffset={20}
                    />

                    <BillingInfoBottomSheet refRBSheet={refRBSheet} billingAddress={billingAddress} setBillingAddress={setBillingAddress} />

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


export default CreateOrder