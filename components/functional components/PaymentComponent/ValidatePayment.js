import * as React from "react";
import { useState, useEffect } from "react";

import {
    Text,
    SafeAreaView,
} from "react-native";

import { Linking } from "react-native";
import Lottie from 'lottie-react-native'
import authContext from '../../../contants/authContext';


import { StatusBar } from "react-native";

import { COLORS, FONTS, CONST } from "../../../contants";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { CommonActions } from "@react-navigation/native";

const ValidatePayment = ({ route, navigation }) => {



    const data = route.params
    const [success, setSuccess] = useState(false)

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

        console.log("Payment API", _shouldMakeRequests)



        try {
            const payload = {
                "order_id": route.params.orderDetails.order_id,
                "merchant_id": "PGTESTPAYUAT93",
                "merchant_transaction_id": route.params.merchantTransactionId,
            }


            const { instance, cancelSource } = createAxiosInstance();

            const response = await instance.post(`${CONST.baseUrlRegister}api/payment/check/payment`,
                payload,
            )




            if (response.status === 200 && response.data[0].payment_status == "PAYMENT_SUCCESS") {
                console.log('Request successful! Cancelling all pending requests.');
                const payload = {
                    "booking_id": route.params.details.booking_id,
                    "event_id": route.params.details.event_id,
                    "merchant_transaction_id": route.params.merchantTransactionId,
                    "order_id": route.params.orderDetails.order_id,
                    "provider_reference_id": null,
                    "registrant_class": route.params.orderDetails.registrant_class,
                    "registrant_id": parseInt(route.params.orderDetails.registrant_id)
                }

                console.log(payload)


                const checkResponse = await axios.post(`${CONST.baseUrlRegister}api/payment/payment-status`, payload)

                

                if (checkResponse) {

                    const response = await axios.post(`${CONST.baseUrlRegister}api/payment/confirmation/booking`, {
                        "registrant_id": parseInt(route.params.orderDetails.registrant_id),
                        "order_id": route.params.orderDetails.order_id,
                        "booking_id": parseInt(route.params.details.booking_id)
                    })

                    setShouldMakeRequests(false)
                    _shouldMakeRequests = false
                    setSuccess(true)


                    console.log("Payment Successful")
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: 'Home' },
                                {
                                    name: 'BookingInfo',
                                    params: { ...response.data.runnerInfo[0], registerantInfo: response.data.registrantInfo }
                                },
                            ],
                        })
                    );


                }

                // }
                axios.CancelToken.source().cancel('All pending requests cancelled.');
            }
        } catch (error) {

            if (error.response ? error.response.status == 501 : false) {
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
                // setState(false)
                console.log('Pending request cancelled:', error.message);
            } else {
                Toast.show({
                    type: 'error',
                    text1: error.message
                });

            }
        }
        finally {
            if (_shouldMakeRequests) setTimeout(validatePayment, 5000);
        }






    }

    useEffect(() => {
        _shouldMakeRequests = true
        setShouldMakeRequests(true)

        validatePayment()
        return () => {
            console.log("ending");
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
                            </Text> : <Text></Text>
                    }
                    {shouldMakeRequests == false ?

                        <Text style={{ fontFamily: FONTS.medium, textAlign: 'center', width: '80%', marginTop: "55%" }}>
                            Error occured Please try again later, check My Schedule for more information
                        </Text> : <Text></Text>

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



