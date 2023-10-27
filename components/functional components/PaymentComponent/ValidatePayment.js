import * as React from "react";
import { useState, useEffect } from "react";

import {
    Text,
    SafeAreaView,
} from "react-native";

import { Linking } from "react-native";

import Lottie from 'lottie-react-native';
import authContext from '../../../contants/authContext';


import { StatusBar } from "react-native";

import { COLORS, FONTS, CONST } from "../../../contants";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { CommonActions } from "@react-navigation/native";

const ValidatePayment = ({ route, navigation }) => {


    const [state, setState] = useState(true)

    const data = route.params

    useEffect(() => {
        Linking.openURL(route.params.instrumentResponse.redirectInfo.url)
    }, [])

    function createAxiosInstance() {
        const source = axios.CancelToken.source();
        const instance = axios.create({
            cancelToken: source.token,
        });
        return { instance, cancelSource: source };
    }

    const [shouldMakeRequests, setShouldMakeRequests] = useState(true)
    let _shouldMakeRequests = false; // Flag to control request loop


    const validatePayment = async () => {

        console.log("Payment API")
        const payload = {
            "registrant_id": data.details.registrant_id,
            "order_id": data.details.order_id,
            "booking_id": data.details.booking_id,
            "event_id": data.details.event_id,
            "registrant_class": data.details.registrant_class,
            "merchant_transaction_id": route.params.merchantTransactionId,
            "provider_reference_id": "T2310182036074772367080"
        }

        console.log(payload)



        try {


            const { instance, cancelSource } = createAxiosInstance();

            const response = await instance.post(`${CONST.baseUrlRegister}api/payment/payment-status`,
                payload,
            )




            if (response.status === 200) {
                console.log('Request successful! Cancelling all pending requests.');
                setShouldMakeRequests(false)
                _shouldMakeRequests = false
                if (response.data.status == "error") {
                    Toast.show({
                        type: 'error',
                        text1: "Booking Failed"
                    });
                    setState(false)
                } else {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: 'FlightsScreen' },
                                {
                                    name: 'TicketInfo',
                                    params: { ...response.data, showCancel: true }
                                },
                            ],
                        })
                    );
                }

                axios.CancelToken.source().cancel('All pending requests cancelled.');
            }
        } catch (error) {

            if (error.response ? error.response.status == 500 : false) {
                console.log("Error")

                Toast.show({
                    type: 'error',
                    text1: "Please try again later"
                });
                setShouldMakeRequests(false)
                _shouldMakeRequests = false
            }
            if (axios.isCancel(error)) {
                Toast.show({
                    type: 'error',
                    text1: error.message,
                });
                setState(false)
                console.log('Pending request cancelled:', error.message);
            } else {
                Toast.show({
                    type: 'error',
                    text1: error.message
                });

            }
        }
        finally {
            if (_shouldMakeRequests) setTimeout(validatePayment, 2000); // 5 seconds
        }






    }

    useEffect(() => {
        _shouldMakeRequests = true
        setShouldMakeRequests(true)

        validatePayment()
        return () => {
            _shouldMakeRequests = false
        };
    }, []);



    return (
        <authContext.Consumer>
            {({ userId, corpCode }) => (
                <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, alignItems: 'center' }}>
                    <StatusBar
                        background={COLORS.white}
                        backgroundColor={COLORS.white}
                        barStyle="dark-content"
                        style={{ backgroundColor: COLORS.white, flex: 1 }}
                    ></StatusBar>

                    {
                        shouldMakeRequests ?
                            <Lottie style={{ width: '60%', marginTop: '10%' }} source={require('../../../assets/paymentLoading.json')} autoPlay />
                            :
                            <Lottie style={{ width: '60%', marginTop: '10%' }} source={require('../../../assets/warning.json')} autoPlay />

                    }



                    {
                        shouldMakeRequests ?
                            <Text style={{ fontFamily: FONTS.medium, textAlign: 'center', width: '80%', marginTop: "55%" }}>
                                Once you have made the payment, wait for the validation
                            </Text>
                            :
                            <Text style={{ fontFamily: FONTS.medium, textAlign: 'center', width: '80%', marginTop: "55%" }}>
                                Error occured Please try again later, check My Schedule for more information
                            </Text>

                    }

                    {/* <Text style={{ fontFamily: FONTS.regular, textAlign: 'justify', width: '90%', marginTop: 64 }}>
                <Text style={{fontFamily:FONTS.semiBold}}>The following? </Text> Once your reservation has been paid for and confirmed, check your email inbox: you will find your confirmation email containing all the information necessary to prepare your trip.
            </Text>

            <Text style={{ fontFamily: FONTS.regular, textAlign: 'justify', width: '90%', marginTop: 4 }}>
                <Text style={{fontFamily:FONTS.semiBold}}>Undecided? </Text>Please contact Errances Voyages for any services or to modify your reservation (any intervention incurs costs).
            </Text> */}


                    <Toast
                        position='bottom'
                        bottomOffset={20}
                    />


                </SafeAreaView>
            )

            }
        </authContext.Consumer>
    )

}

export default ValidatePayment;



