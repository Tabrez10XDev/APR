import * as React from "react";
import { useState, useEffect } from "react";

import {
    Text,
    SafeAreaView,
} from "react-native";

import { Linking } from "react-native";

import Lottie from 'lottie-react-native';


import { StatusBar } from "react-native";

import { COLORS, FONTS, CONST } from "../../../contants";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { CommonActions } from "@react-navigation/native";

const ValidatePayment = ({ route, navigation }) => {


    const [state, setState] = useState(true)

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
            userId: route.params.userId,
            docId: route.params.docId,
            paymentOrderId: route.params.paymentOrderId
        }

        // console.log(payload)

        // try {
        //     const { instance, cancelSource } = createAxiosInstance();

        //     const response = await instance.post(`${CONST.baseUrl}/validatePayment`,
        //         payload,
        //     )

        //     // console.log(response.status)



        //     if (response.status === 200) {
        //         console.log('Request successful! Cancelling all pending requests.');
        //         setShouldMakeRequests(false)
        //         _shouldMakeRequests = false
        //         if (response.data.status == "error") {
        //             Toast.show({
        //                 type: 'error',
        //                 text1: "Booking Failed"
        //             });
        //             setState(false)
        //         } else {
        //             navigation.dispatch(
        //                 CommonActions.reset({
        //                     index: 1,
        //                     routes: [
        //                         { name: 'FlightsScreen' },
        //                         {
        //                             name: 'TicketInfo',
        //                             params: { ...response.data, showCancel: true }
        //                         },
        //                     ],
        //                 })
        //             );
        //         }

        //         axios.CancelToken.source().cancel('All pending requests cancelled.');
        //     }
        // } catch (error) {

        //     console.log("Error:")
        //     console.log(error.response ? error.response.status : "na");
        //     if (error.response ? error.response.status == 500 : false) {
        //         Toast.show({
        //             type: 'error',
        //             text1: "Please try again later"
        //         });
        //         setShouldMakeRequests(false)
        //         _shouldMakeRequests = false
        //     }
        //     if (axios.isCancel(error)) {
        //         Toast.show({
        //             type: 'error',
        //             text1: error.message,
        //         });
        //         setState(false)
        //         console.log('Pending request cancelled:', error.message);
        //     } else {
        //         Toast.show({
        //             type: 'error',
        //             text1: error.message
        //         });

        //     }
        // }
        // finally {
        //     console.log(shouldMakeRequests)
        //     if (_shouldMakeRequests) setTimeout(validatePayment, 2000); // 5 seconds
        // }






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

export default ValidatePayment;



