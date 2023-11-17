import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton } from '../../ui components/Buttons';
import axios from 'axios';
import authContext from '../../../contants/authContext';
import { StackActions, useTheme } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react-native';
import * as FileSystem from 'expo-file-system';

const BookingInfo = ({ route, navigation }) => {


    async function downloadInvoice() {
        // FileSystem.downloadAsync(
        //     `${CONST.baseUrlRegister}/fetchInvoice?orderId=${route.params.display.orderId}`,
        //     FileSystem.documentDirectory + 'ticket.pdf'
        // )
        //     .then(({ uri }) => {
        //         console.log('Finished downloading to ', uri);
        //         share(uri);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
    }

    const data = route.params

    return (
        <authContext.Consumer>
            {({ userId, setUserId, corpCode }) => (
                <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                    {console.log(JSON.stringify(route.params))}

                    <StatusBar
                        background={COLORS.blue}
                        backgroundColor={COLORS.blue}
                        barStyle="light-content"
                        style={{ backgroundColor: COLORS.blue, flex: 1 }}
                    ></StatusBar>




                    <View style={{ height: '12%', width: '100%', backgroundColor: COLORS.blue, justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}>

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
                            Booking Confirmed
                        </Text>

                        <TouchableOpacity
                            onPress={
                                downloadInvoice
                            }
                            style={{ width: 36, height: 36, position: 'absolute', right: 12, top: 60, alignSelf: 'flex-start' }}>
                            <Ionicons name="download-outline" size={28} color="white" />


                        </TouchableOpacity>
                    </View>

                    <ScrollView>


                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
                            <AntDesign name="checkcircle" size={24} color={COLORS.green} />
                            <Text
                                style={{
                                    fontSize: SIZES.medium,
                                    fontFamily: FONTS.bold,
                                    color: COLORS.green,
                                    textAlign: 'center',
                                    marginLeft: 12
                                }}
                            >
                                Booking Confirmed
                            </Text>
                        </View>

                        <Text
                            style={{
                                fontSize: SIZES.small,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.black,
                                textAlign: 'center',
                                marginTop: 12,
                                maxWidth: '95%'
                            }}
                        >
                            Congratulations ! Your tickets are successfully booked.
                        </Text>

                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.black,
                                textAlign: 'center',
                                marginTop: 12,
                                maxWidth: '95%'
                            }}
                        >
                            Transaction/Booking ID: {data.order_id_ref}
                        </Text>


                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.black,
                                textAlign: 'center',
                                marginTop: 6,
                                maxWidth: '95%'
                            }}
                        >
                            Booked On: {data.payment_date}
                        </Text>

                        <View style={{ width: '90%', alignSelf: 'center' }}>
                            <Text
                                style={{
                                    fontSize: SIZES.medium,
                                    fontFamily: FONTS.bold,
                                    color: COLORS.blue,
                                    textAlign: 'left',
                                    marginTop: 16,
                                }}
                            >
                                Booking Details
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    Name
                                </Text>

                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    {data.registerantInfo.first_name} {data.registerantInfo.last_name}
                                </Text>
                            </View>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    Email address
                                </Text>

                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    {data.registerantInfo.email_id}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    Address
                                </Text>

                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    {data.registerantInfo.address_type}
                                </Text>
                            </View>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    Phone
                                </Text>

                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    {data.registerantInfo.mobile_number ?? "NA"}
                                </Text>
                            </View>

                            <Text
                                style={{
                                    fontSize: SIZES.medium,
                                    fontFamily: FONTS.bold,
                                    color: COLORS.blue,
                                    textAlign: 'left',
                                    marginTop: 16,
                                }}
                            >
                                BIB Number
                            </Text>

                            {
                                data.runners.map((ele, inx) => {
                                    return (
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                                            <Text
                                                style={{
                                                    fontSize: SIZES.font,
                                                    fontFamily: FONTS.semiBold,
                                                    color: COLORS.black,
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {ele.runner_first_name} {ele.runner_last_name}
                                            </Text>

                                            <Text
                                                style={{
                                                    fontSize: SIZES.font,
                                                    fontFamily: FONTS.regular,
                                                    color: COLORS.black,
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {ele.bib_number ?? "NA"}
                                            </Text>
                                        </View>
                                    )
                                })
                            }

                            {data.runners.length === 0 &&
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.black,
                                        textAlign: 'center',
                                        marginTop: 8,
                                    }}
                                >
                                    No Runners
                                </Text>
                            }


                            <Text
                                style={{
                                    fontSize: SIZES.medium,
                                    fontFamily: FONTS.bold,
                                    color: COLORS.blue,
                                    textAlign: 'left',
                                    marginTop: 16,
                                }}
                            >
                                Instructions
                            </Text>

                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.regular,
                                    color: COLORS.black,
                                    textAlign: 'left',
                                    marginTop: 4,
                                    maxWidth: '100%'
                                }}
                            >
                                No refund or cancellation of tickets. If you need further assistance regarding your booking, kindly contact Puma Nitro Apr marathon volunteer team.
                            </Text>

                            <Text
                                style={{
                                    fontSize: SIZES.medium,
                                    fontFamily: FONTS.bold,
                                    color: COLORS.blue,
                                    textAlign: 'left',
                                    marginTop: 16,
                                }}
                            >
                                Payment summary
                            </Text>


                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    Subtotal
                                </Text>

                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    ₹ 20,000
                                </Text>
                            </View> */}

                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    GST (18%)
                                </Text>

                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    ₹ 1,800
                                </Text>
                            </View> */}


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.bold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    Total
                                </Text>

                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.bold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    ₹ {data.payment_amount}
                                </Text>
                            </View>

                        </View>

                        <RectButton text={"Go to Home"} alignSelf={'center'} marginTop={48} onClick={() => {
                            navigation.dispatch(StackActions.pop(1))
                        }} />


                    </ScrollView>

                </View>
            )}
        </authContext.Consumer>
    )
}

export default BookingInfo