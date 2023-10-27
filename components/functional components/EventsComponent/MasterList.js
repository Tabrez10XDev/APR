import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton } from '../../ui components/Buttons';
import axios from 'axios';
import Input from '../../ui components/Input';
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import common from '../../../contants/common';
import authContext from '../../../contants/authContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const MasterList = ({ route, navigation }) => {

    const data = route.params


    async function register() {

        let runnerDetails = []
        data.stateArray.map((ele, inx) => {
            let temp = {
                registrant_id_ref: data.registrant_id,
                runner_first_name: ele.firstName,
                runner_last_name: ele.lastName,
                runner_dob: ele.date.replaceAll("/", "-"),
                runner_gender: ele.gender.toLowerCase(),
                runner_email_id: ele.email,
                runner_phone_number: ele.number,
                runner_emergency_contact_name: null,
                runner_emergency_contact_number: ele.emergencyNumber,
                runner_address_type: null,
                runner_address: null,
                runner_city: null,
                runner_state: null,
                runner_country: null,
                runner_pincode: null,
                tshirt_size: common.sizes[ele.size - 1],
                runner_blood_group: ele.bloodGroup,
                run_category_id_ref: ele.runCategoryId,
                registrant_event_id_ref: data.event_id_ref //TODO
            }

            runnerDetails.push(temp)
        })


        const payload = {
            registrant_detail: {
                registrant_id: data.registrant_id,
                registrant_type_ref: data.registrant_type_ref,
                resident_of_apr: data.resident_of_apr,
                address_type: data.address_type,
                address: data.address,
                addr_villa_number: data.addr_villa_number,
                addr_villa_lane_no: data.addr_villa_lane_no,
                addr_villa_phase_no: data.addr_villa_phase_no,
                addr_tower_no: data.addr_tower_no,
                addr_tower_block_no: data.addr_tower_block_no,
                addr_tower_flat_no: data.addr_tower_flat_no,
                external_address: null,
                city: data.city,
                state: data.state,
                country: data.country,
                pin_code: data.pin_code,
                need_80G_certificate: data.need_80G_certificate,
                pancard_number: data.pancard_number,
                registrant_source_ref: data.registrant_source_ref,
                registrant_class_ref: data.registrant_class_ref,
                event_id_ref: data.event_id_ref,
                role: data.role
            },
            runner_details: runnerDetails
        }


        try {
            axios.put(`${CONST.baseUrlRegister}api/registration/add/registrant/web`, payload).then((response) => {
                console.log("Success")

                let data = JSON.stringify({
                    "registrant_id": 53,
                    "order_id": "ACT00011",
                    "amount": 10000,
                    "registrant_class": "silver",
                    "payment_date": "2023-10-14"
                });



                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://apr-marathon-registerticket-render.onrender.com/api/payment/initiate',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };


                axios.request(config)
                    .then((response) => {
                        if(response.data.status.code == "PAYMENT_INITIATED"){
                            navigation.navigate("ValidatePayment", {...response.data.status.data, details: response.data.details})
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        Toast.show({
                            type: 'error',
                            text1: error.response.data
                        });
                    });


            })
        } catch (error) {

            console.log(err.response.data)

            Toast.show({
                type: 'error',
                text1: error.response.data
            });
        }



    }

    async function corpRegister() {

        const payload = {
            registrant_id: data.registrant_id,
            registrant_type_ref: data.registrant_type_ref,
            resident_of_apr: data.resident_of_apr,
            address_type: data.address_type,
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            pin_code: data.pin_code,
            need_80G_certificate: data.need_80G_certificate,
            pancard_number: data.pancard_number,
            registrant_source_ref: data.registrant_source_ref,
            registrant_class_ref: data.registrant_class_ref,
            event_id_ref: data.event_id_ref,
            role: data.role
        }


        try {
            axios.put(`${CONST.baseUrlRegister}api/corporate/add/corp/registrant`, payload).then((response) => {
                console.log(response.data)
                console.log("Success")
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

    function calculateAge(birthdate) {
        // Parse the birthdate string into a Date object
        console.log("---");
        console.log(birthDate)
        const birthDate = new Date(birthdate);

        // Get the current date
        const currentDate = new Date();

        // Calculate the difference in milliseconds between the current date and birthdate
        const timeDiff = currentDate - birthDate;

        // Calculate the age based on the time difference
        const age = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));

        return age;
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
                    <View style={{ height: '12%', width: '100%', backgroundColor: COLORS.blue, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 12 }}>
                        <Text
                            style={{
                                fontSize: SIZES.large,
                                fontFamily: FONTS.bold,
                                color: COLORS.white,
                                textAlign: 'center',
                                marginBottom: 12
                            }}
                        >
                            Master List
                        </Text>
                    </View>

                    <ScrollView>
                        <View>


                            {
                                data.stateArray.map((ele, inx) => {
                                    console.log(ele.date.replaceAll("/", "-"));
                                    const dob = calculateAge(ele.date.replaceAll("/", "-")) + "y"
                                    return (
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center', alignSelf: 'center', marginTop: 10 }}>
                                            <View>
                                                <Text
                                                    style={{
                                                        fontSize: SIZES.medium,
                                                        fontFamily: FONTS.semiBold,
                                                        color: COLORS.black,
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    {ele.firstName} {ele.lastName}
                                                </Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                                    <Text
                                                        style={{
                                                            fontSize: SIZES.font,
                                                            fontFamily: FONTS.regular,
                                                            color: COLORS.grey,
                                                            textAlign: 'left',
                                                        }}
                                                    >
                                                        {ele.gender}, {dob}
                                                    </Text>
                                                    <View style={{ height: 6, width: 6, borderRadius: 6, backgroundColor: COLORS.grey, marginHorizontal: 6 }} />
                                                    <Text
                                                        style={{
                                                            fontSize: SIZES.font,
                                                            fontFamily: FONTS.regular,
                                                            color: COLORS.grey,
                                                            textAlign: 'left',
                                                        }}
                                                    >
                                                        {ele.runCategory}
                                                    </Text>
                                                    <View style={{ height: 6, width: 6, borderRadius: 6, backgroundColor: COLORS.grey, marginHorizontal: 6 }} />

                                                    <Text
                                                        style={{
                                                            fontSize: SIZES.font,
                                                            fontFamily: FONTS.regular,
                                                            color: COLORS.grey,
                                                            textAlign: 'left',
                                                        }}
                                                    >
                                                        Marathon Runner
                                                    </Text>
                                                </View>


                                            </View>
                                            <TouchableOpacity onPress={() => {
                                                let _data = data
                                                _data.current = inx
                                                navigation.navigate("AddRunners", _data)
                                            }}>
                                                <Feather name="edit" size={24} color="black" />
                                            </TouchableOpacity>

                                        </View>
                                    )
                                })
                            }

                        </View>

                    </ScrollView>

                    <RectButton alignSelf={"center"} marginBottom={24} text={"Checkout"} onClick={() => {
                        if (corpCode) corpRegister()
                        else register()
                    }} />
                    <Toast
                        position='bottom'
                        bottomOffset={20}
                    />

                </View>
            )
            }
        </authContext.Consumer>
    )
}



export default MasterList