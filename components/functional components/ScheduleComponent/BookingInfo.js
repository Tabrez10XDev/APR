import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, Share, Platform } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton } from '../../ui components/Buttons';
import axios from 'axios';
import authContext from '../../../contants/authContext';
import { StackActions, useTheme } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react-native';
import * as FileSystem from 'expo-file-system';

const BookingInfo = ({ route, navigation }) => {

    const data = route.params

    const share = async (url) => {
        try {
            const result = await Share.share({
                url
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function saveFile(uri, filename, mimetype) {

        if (Platform.OS === "android") {
          const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (permissions.granted) {
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      
            await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
              .then(async (uri) => {
                await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                console.log("success");
              })
              .catch(e => console.log(e,"err"));
          } else {
            shareAsync(uri);
          }
        } else{
            share(uri);

        }
      }

    async function downloadInvoice() {
        FileSystem.downloadAsync(
            `${CONST.baseUrlRegister}api/payment/invoice/data/${data.registerantInfo.registrant_id}/${data.order_id_ref}/${data.booking_id}`,
            FileSystem.documentDirectory + `invoice.pdf`
        )
            .then((result) => {
                const {uri} = result
                console.log('Finished downloading to ', uri);
                saveFile(result.uri, "invoice", "application/pdf");
            })
            .catch(error => {
                console.error(error);
            });
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
                            Transaction/Order ID: {data.order_id_ref}
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
                                    console.log(ele,"Item");
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
                                                {ele.race_type_name}
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