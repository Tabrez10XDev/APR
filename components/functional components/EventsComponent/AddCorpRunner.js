import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton, WhiteButton } from '../../ui components/Buttons';
import axios from 'axios';
import Input from '../../ui components/Input';
import { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import common from '../../../contants/common';
import authContext from '../../../contants/authContext';
import DatePickerModal from '../../ui components/DatePickerModal';
import { StackActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import moment from 'moment/moment';
import Lottie from 'lottie-react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';


const AddCorpRunner = ({ route, navigation }) => {

    const data = route.params

    const [animSpeed, setAnimSpeed] = useState(false)
    const animRef = useRef()

    const [open, setOpen] = useState(false)

    function playAnimation() {
        setAnimSpeed(true)
    }

    const TSHIRTS = ["s","m","l","xl","xxl","xxl"]


    useEffect(() => {
        setTimeout(() => {
            animRef.current?.play();
        }, 100)
    }, [animSpeed])


    function pauseAnimation() {
        setAnimSpeed(false)
    }

    
    const ResidentTypes = [

        {
            label: 'Villa',
            value: 'villa'
        },
        {
            label: "Tower",
            value: "tower"
        },
        {
            label: 'Others',
            value: 'others'
        },
    ]


    const Genders = [{
        label: "MALE",
        value: "MALE"
    },
    {
        label: "FEMALE",
        value: "FEMALE"
    },
    {
        label: "OTHERS",
        value: "OTHERS"
    }]


    const sevenYearsAgo = moment().subtract(7, 'years').format("YYYY-MM-DD"); // Date 7 years ago

    const [stateArray, setStateArray] = useState(data.stateArray)

    const [current, setCurrent] = useState(data.current)

    const [state, setState] = useState({})

    const [selectedDate, setSelectedDate] = useState(stateArray[current].date ?? "")
    const [stackIndex, setStackIndex] = useState(state.size ?? 1);

    useEffect(() => {
        setState(stateArray[current])
        setStackIndex(stateArray[current].size ?? 1)
        setSelectedDate(stateArray[current].date ?? "")
    }, [current])



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setCurrent(data.current)
        });

        return unsubscribe;
    }, [navigation]);

    async function addRunnerCorp(userId) {
        console.log("innn")
        let address = null
        if (state.residentType == "others") address = state.flatNo + ", " + state.address
        playAnimation()

        const payload =  {
            "event_id": 3,
            "registrant_id": parseInt(userId),
            "runner_first_name": state.firstName,
            "runner_last_name": state.lastName,
            "runner_dob": selectedDate,
            "runner_gender": state.gender,
            "runner_email_id": state.email,
            "runner_phone_number": state.number,
            "runner_emergency_contact_name": null,
            "runner_emergency_contact_number": state.emergencyNumber,
            "resident_of_apr": state.registrantOfAPR,
            "runner_address_type": state.residentType,
            addr_villa_number: state.residentType == "villa" ? state.villaNumber : null,
            addr_villa_lane_no: state.residentType == "villa" ? state.laneNumber : null,
            addr_villa_phase_no: state.residentType == "villa" ? state.phase : null,
            addr_tower_no: state.residentType == "tower" ? state.tower : null,
            addr_tower_block_no: state.residentType == "tower" ? state.block : null,
            addr_tower_flat_no: state.flatNo,
            "external_address": address ?? null,
            "runner_city": state.city,
            "runner_state": state.state,
            "runner_country": state.country,
            "runner_pincode": state.zipCode,
            "tshirt_size": TSHIRTS[stackIndex-1],
            "runner_blood_group": state.bloodGroup,
            "run_category_id_ref": state.runCategoryId
        }


        console.log(JSON.stringify(payload));

        axios.post(`${CONST.baseUrlRegister}api/corporate/add/corp/registrant`,
        payload
        ).then((response) => {
            console.log("Success");
            pauseAnimation()
            navigation.navigate("BookingConfirmed", response.data)

        }).catch((err) => {
            console.error(err);
            pauseAnimation()
            Toast.show({
                type: 'error',
                text1: 'Please try again later',
                visibilityTime: 1500
            });
        })
    }


    async function verifyVilla() {
        axios.post(`${CONST.baseUrlRegister}api/registration/verify/address`,
            {
                "villa_number": state.villaNumber
            }
        ).then((response) => {
            console.log(response.data)
            setState(current => (
                {
                    ...current,
                    laneNumber: response.data.lane_no,
                    phase: response.data.phase_no
                }
            ))
            console.log(response.data)
        })
    }


    useEffect(() => {
        if (state.tower) {
            data.towers.map((ele, inx) => {
                if (ele.label == state.tower) {
                    setBlocks(ele.blocks)
                }
            })
        }
    }, [state.tower])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            verifyVilla()
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [state.villaNumber])


    return (

        <authContext.Consumer>
            {({ userId, setUserId }) => (


                <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                    <StatusBar
                        background={COLORS.blue}
                        backgroundColor={COLORS.blue}
                        barStyle="light-content"
                        style={{ backgroundColor: COLORS.blue, flex: 1 }}
                    ></StatusBar>
                    <View style={{ height: '12%', width: '100%', backgroundColor: COLORS.blue, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text
                            style={{
                                fontSize: SIZES.large,
                                fontFamily: FONTS.bold,
                                color: COLORS.white,
                                textAlign: 'center',
                                marginBottom: 12
                            }}
                        >
                            Registration
                        </Text>
                    </View>

                    <ScrollView automaticallyAdjustKeyboardInsets  contentContainerStyle={{ minHeight: '100%', width: '90%', alignSelf: 'center' }}>

                        <Text
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.bold,
                                color: COLORS.blue,
                                textAlign: 'left',
                                marginTop: 12
                            }}
                        >
                            Runner Details*
                        </Text>

                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                            <View style={{ width: '50%' }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.bold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginTop: 12
                                    }}
                                >
                                    First Name<Text style={{ color: COLORS.red }}>*</Text>
                                </Text>

                                <Input
                                    placeholder="Enter Here"
                                    inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start' }}
                                    onChangeText={(value) => setState(current => ({ ...current, firstName: value }))}
                                    value={state.firstName}
                                    placeholderTextColor={COLORS.lightGray}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.bold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginTop: 12
                                    }}
                                >
                                    Last Name<Text style={{ color: COLORS.red }}>*</Text>
                                </Text>

                                <Input
                                    placeholder="Enter Here"
                                    inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start' }}
                                    onChangeText={(value) => setState(current => ({ ...current, lastName: value }))}
                                    value={state.lastName}
                                    placeholderTextColor={COLORS.lightGray}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                            <View style={{ width: '50%' }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.bold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginTop: 12
                                    }}
                                >
                                    DOB<Text style={{ color: COLORS.red }}>*</Text>
                                </Text>

                                <TouchableOpacity onPress={() => { setOpen(true) }} style={{ borderColor: COLORS.ash, borderWidth: 1, borderRadius: 6, marginTop: 8, width: '95%' }}>
                                    <Text style={{ paddingVertical: 12, paddingHorizontal: 8 }}>
                                        {selectedDate.length == 0 ? "Enter Here" : selectedDate}
                                    </Text>

                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.bold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginTop: 12
                                    }}
                                >
                                    Gender<Text style={{ color: COLORS.red }}>*</Text>
                                </Text>

                                <Dropdown
                                    style={{
                                        height: 45,
                                        borderColor: COLORS.lightGray,
                                        borderRadius: 6,
                                        borderWidth: 1,
                                        width: '100%',
                                        paddingHorizontal: 12,
                                        alignSelf: 'flex-start',
                                        marginTop: 10,
                                        color: COLORS.black
                                    }}
                                    placeholderStyle={{ fontSize: 16, color: COLORS.black }}
                                    selectedTextStyle={{
                                        fontSize: SIZES.smallFont,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.black
                                    }}
                                    inputSearchStyle={{}}
                                    iconStyle={{}}
                                    data={Genders}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Gender"
                                    value={state.gender}
                                    onChange={item => {
                                        setState(current => ({ ...current, gender: item.value }))
                                    }}

                                />
                            </View>
                        </View>

                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.bold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 16
                            }}
                        >
                            Email ID<Text style={{ color: COLORS.red }}>*</Text>
                        </Text>

                        <Input
                            placeholder="Enter Here"
                            inputprops={{ width: '100%', marginTop: 8, alignSelf: 'flex-start' }}
                            onChangeText={(value) => setState(current => ({ ...current, email: value }))}
                            value={state.email}
                            placeholderTextColor={COLORS.lightGray}
                        />

                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                            <View style={{ width: '50%' }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.bold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginTop: 12
                                    }}
                                >
                                    Phone Number<Text style={{ color: COLORS.red }}>*</Text>
                                </Text>

                                <View style={{ justifyContent: 'center' }}>
                                    <Feather name="phone" size={24} color={COLORS.icons} style={{ position: 'absolute', zIndex: 5, left: 8, top: '40%' }} />
                                    <Input
                                        placeholder="Enter Here"
                                        inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start', paddingLeft: 42 }}
                                        onChangeText={(value) => setState(current => ({ ...current, number: value }))}
                                        value={state.number}
                                        maxLength={10}
                                        placeholderTextColor={COLORS.lightGray}
                                    />
                                </View>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.bold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginTop: 12
                                    }}
                                >
                                    Emergency No<Text style={{ color: COLORS.red }}>*</Text>
                                </Text>

                                <View style={{ justifyContent: 'center' }}>
                                    <Feather name="phone" size={24} color={COLORS.icons} style={{ position: 'absolute', zIndex: 5, left: 8, top: '40%' }} />
                                    <Input
                                        placeholder="Enter Here"
                                        inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start', paddingLeft: 42 }}
                                        onChangeText={(value) => setState(current => ({ ...current, emergencyNumber: value }))}
                                        value={state.emergencyNumber ?? data.param.phone_number}
                                        placeholderTextColor={COLORS.lightGray}
                                        maxLength={10}
                                    />
                                </View>
                            </View>
                        </View>

                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.bold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 16
                            }}
                        >
                            Address<Text style={{ color: COLORS.red }}>*</Text>
                        </Text>


                        <View style={{ flexDirection: 'row', alignSelf: 'center', width: '95%', marginVertical: 14, justifyContent: 'space-between', alignItems: 'center' }}>



                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.medium,
                                    color: COLORS.grey,
                                    width: '90%',
                                    textAlign: 'left',
                                }}
                            >
                                Are you a resident of APR
                            </Text>

                            <BouncyCheckbox
                                size={25}
                                fillColor={COLORS.blue}
                                unfillColor={COLORS.grey}
                                iconStyle={{ borderColor: COLORS.grey }}
                                innerIconStyle={{ borderWidth: 2 }}
                                onPress={(isChecked) => { setState(current => ({ ...current, residentOfAPR: isChecked })) }}
                            />

                        </View>

                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignSelf: 'center' }}>




                            <Dropdown
                                style={{
                                    height: 45,
                                    borderColor: COLORS.lightGray,
                                    borderRadius: 6,
                                    borderWidth: 1,
                                    width: '48%',
                                    paddingHorizontal: 12,
                                    alignSelf: 'flex-start',
                                    marginTop: 10,
                                    color: COLORS.black
                                }}
                                placeholderStyle={{ fontSize: 16, color: COLORS.black }}
                                selectedTextStyle={{
                                    fontSize: SIZES.smallFont,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.black
                                }}
                                inputSearchStyle={{}}
                                iconStyle={{}}
                                data={state.residentOfAPR ? ResidentTypes : [{ label: "Others", value: "others" }]}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Resident type"
                                value={state.residentType}
                                onChange={item => {
                                    setState(current => ({ ...current, residentType: item.value }))
                                }}

                            />
                            {state.residentType == 'tower' &&

                                <Input
                                    placeholder="Flat No"
                                    inputprops={{ width: '48%', marginTop: 8, alignSelf: 'flex-start', marginLeft: 8 }}
                                    onChangeText={(value) => setState(current => ({ ...current, flatNo: value }))}
                                    value={state.flatNo}
                                    placeholderTextColor={COLORS.lightGray}
                                />}

                        </View>


                        {
                            state.residentType == "villa" &&
                            <View style={{ width: '98%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', alignSelf: 'center' }}>

                                <View style={{ width: '100%' }}>

                                    <Input
                                        placeholder="Villa Number"
                                        inputprops={{ width: '100%', marginTop: 8 }}
                                        onChangeText={(value) => setState(current => ({ ...current, villaNumber: value }))}
                                        value={state.villaNumber}
                                        placeholderTextColor={COLORS.lightGray}
                                    />
                                </View>

                            

                            </View>


                        }

                        {
                            state.residentType == 'villa' &&
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                                <View style={{ width: '50%' }}>
                                    <Input
                                        editable={false}
                                        placeholder="Lane No"
                                        inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start' }}
                                        onChangeText={(value) => setState(current => ({ ...current, laneNumber: value }))}
                                        value={state.laneNumber}
                                        placeholderTextColor={COLORS.lightGray}
                                    />
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Input
                                        editable={false}
                                        placeholder="Phase No"
                                        inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start' }}
                                        onChangeText={(value) => setState(current => ({ ...current, phase: value }))}
                                        value={state.phase}
                                        placeholderTextColor={COLORS.lightGray}
                                    />
                                </View>
                            </View>
                        }

                        {
                            state.residentType == "tower" &&
                            <Dropdown
                                style={{
                                    height: 45,
                                    borderColor: COLORS.lightGray,
                                    borderRadius: 6,
                                    borderWidth: 1,
                                    width: '100%',
                                    paddingHorizontal: 12,
                                    alignSelf: 'flex-start',
                                    marginTop: 10,
                                    color: COLORS.black
                                }}
                                placeholderStyle={{ fontSize: 16, color: COLORS.black }}
                                selectedTextStyle={{
                                    fontSize: SIZES.smallFont,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.black
                                }}
                                inputSearchStyle={{}}
                                iconStyle={{}}
                                data={data.towers}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Choose the tower"
                                value={state.tower}
                                onChange={item => {
                                    setState(current => ({ ...current, sourceRef: item.value }))
                                    setState(current => ({ ...current, tower: item.label }))

                                }}

                            />

                        }

                        {
                            state.residentType == "tower" &&
                            <Dropdown
                                style={{
                                    height: 45,
                                    borderColor: COLORS.lightGray,
                                    borderRadius: 6,
                                    borderWidth: 1,
                                    width: '100%',
                                    paddingHorizontal: 12,
                                    alignSelf: 'flex-start',
                                    marginTop: 10,
                                    color: COLORS.black
                                }}
                                placeholderStyle={{ fontSize: 16, color: COLORS.black }}
                                selectedTextStyle={{
                                    fontSize: SIZES.smallFont,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.black
                                }}
                                inputSearchStyle={{}}
                                iconStyle={{}}
                                data={blocks}
                                maxHeight={300}
                                labelField="block_number"
                                valueField="block_number"
                                placeholder="Choose the block"
                                value={state.block}
                                onChange={item => {
                                    setState(current => ({ ...current, block: item.block_number }))

                                }}

                            />

                        }
                        {state.residentType == 'others' &&

                            <Input
                                placeholder="Address"
                                inputprops={{ width: '100%', marginTop: 12, alignSelf: 'center' }}
                                onChangeText={(value) => setState(current => ({ ...current, address: value }))}
                                value={state.address}
                                placeholderTextColor={COLORS.lightGray}
                            />
                        }
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignSelf: 'center', marginTop: 6 }}>
                            <Dropdown
                                search={true}
                                style={{
                                    height: 45,
                                    borderColor: COLORS.lightGray,
                                    borderRadius: 6,
                                    borderWidth: 1,
                                    width: '48%',
                                    paddingHorizontal: 12,
                                    alignSelf: 'flex-start',
                                    marginTop: 10,
                                    color: COLORS.black
                                }}
                                placeholderStyle={{ fontSize: 16, color: COLORS.black }}
                                selectedTextStyle={{
                                    fontSize: SIZES.smallFont,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.black
                                }}
                                inputSearchStyle={{}}
                                iconStyle={{}}
                                data={common.cities}
                                maxHeight={300}
                                labelField="name"
                                valueField="name"
                                placeholder="City"
                                value={state.city}
                                onChange={item => {
                                    setState(current => ({ ...current, city: item.name, state: item.state }))
                                }}

                            />

                            <Dropdown
                                style={{
                                    height: 45,
                                    borderColor: COLORS.lightGray,
                                    borderRadius: 6,
                                    borderWidth: 1,
                                    width: '48%',
                                    paddingHorizontal: 12,
                                    alignSelf: 'flex-start',
                                    marginTop: 10,
                                    color: COLORS.black
                                }}
                                placeholderStyle={{ fontSize: 16, color: COLORS.black }}
                                selectedTextStyle={{
                                    fontSize: SIZES.smallFont,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.black
                                }}
                                inputSearchStyle={{}}
                                iconStyle={{}}
                                data={common.states}
                                maxHeight={300}
                                labelField="name"
                                valueField="name"
                                placeholder="State"
                                value={state.state}
                                onChange={item => {
                                    setState(current => ({ ...current, state: item.name }))
                                }}

                            />

                        </View>


                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                            <View style={{ width: '50%' }}>
                                <Input
                                    placeholder="Country"
                                    inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start' }}
                                    onChangeText={(value) => setState(current => ({ ...current, country: value }))}
                                    value={state.country}
                                    placeholderTextColor={COLORS.lightGray}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <Input
                                    placeholder="Zip Code"
                                    inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start' }}
                                    onChangeText={(value) => setState(current => ({ ...current, zipCode: value }))}
                                    value={state.zipCode}
                                    placeholderTextColor={COLORS.lightGray}
                                />
                            </View>
                        </View>



                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.bold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 16
                            }}
                        >
                            T Shirt Size<Text style={{ color: COLORS.red }}>*</Text>
                        </Text>

                        <View style={{ width: '100%', height: 60 }}>
                            <ScrollView
                                horizontal={true}
                                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ width: '98%', alignSelf: 'center', height: 60 }}>


                                <View style={{
                                    borderBottomWidth: 0,
                                    borderColor: "#CCE4FF",
                                    height: 60,
                                    flexDirection: 'row',
                                    justifyContent: 'center', alignItems: 'center', width: '100%', height: 45, marginTop: 8, backgroundColor: COLORS.white, borderRadius: 6, padding: 2,
                                }}>

                                    <Pressable
                                        onPress={() => {
                                            setStackIndex(1)
                                            // setTripHistory(tripObj.upcoming)
                                        }}
                                        style={[stackIndex == 1 ? styles.selectedBox : styles.unSelectedBox]}>

                                        <View style={{ height: 18, width: 18, borderRadius: 9, borderWidth: stackIndex == 1 ? 4 : 1, borderColor: stackIndex == 1 ? COLORS.blue : COLORS.lightGray, marginRight: 4 }}></View>
                                        <Text
                                            style={[stackIndex == 1 ? styles.selectedText : styles.unSelectedText]}
                                        >
                                            S
                                        </Text>



                                    </Pressable>
                                    <Pressable
                                        onPress={() => {
                                            setStackIndex(2)
                                            // setTripHistory(tripObj.completed)
                                        }}

                                        style={[stackIndex == 2 ? styles.selectedBox : styles.unSelectedBox]}>
                                        <View style={{ height: 18, width: 18, borderRadius: 9, borderWidth: stackIndex == 2 ? 4 : 1, borderColor: stackIndex == 2 ? COLORS.blue : COLORS.lightGray, marginRight: 4 }}></View>


                                        <Text
                                            style={[stackIndex == 2 ? styles.selectedText : styles.unSelectedText]}
                                        >
                                            M
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => {
                                            setStackIndex(3)
                                            // setTripHistory(tripObj.cancelled)
                                        }}

                                        style={[stackIndex == 3 ? styles.selectedBox : styles.unSelectedBox]}>
                                        <View style={{ height: 18, width: 18, borderRadius: 9, borderWidth: stackIndex == 3 ? 4 : 1, borderColor: stackIndex == 3 ? COLORS.blue : COLORS.lightGray, marginRight: 4 }}></View>

                                        <Text
                                            style={[stackIndex == 3 ? styles.selectedText : styles.unSelectedText]}
                                        >
                                            L
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => {
                                            setStackIndex(4)
                                        }}

                                        style={[stackIndex == 4 ? styles.selectedBox : styles.unSelectedBox]}>
                                        <View style={{ height: 18, width: 18, borderRadius: 9, borderWidth: stackIndex == 4 ? 4 : 1, borderColor: stackIndex == 4 ? COLORS.blue : COLORS.lightGray, marginRight: 4 }}></View>

                                        <Text
                                            style={[stackIndex == 4 ? styles.selectedText : styles.unSelectedText]}
                                        >
                                            XL
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => {
                                            setStackIndex(5)
                                        }}

                                        style={[stackIndex == 4 ? styles.selectedBox : styles.unSelectedBox]}>
                                        <View style={{ height: 18, width: 18, borderRadius: 9, borderWidth: stackIndex == 5 ? 4 : 1, borderColor: stackIndex == 5 ? COLORS.blue : COLORS.lightGray, marginRight: 4 }}></View>

                                        <Text
                                            style={[stackIndex == 5 ? styles.selectedText : styles.unSelectedText]}
                                        >
                                            XXL
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => {
                                            setStackIndex(6)
                                        }}

                                        style={[stackIndex == 6 ? styles.selectedBox : styles.unSelectedBox]}>
                                        <View style={{ height: 18, width: 18, borderRadius: 9, borderWidth: stackIndex == 6 ? 4 : 1, borderColor: stackIndex == 6 ? COLORS.blue : COLORS.lightGray, marginRight: 4 }}></View>

                                        <Text
                                            style={[stackIndex == 6 ? styles.selectedText : styles.unSelectedText]}
                                        >
                                            XXXL
                                        </Text>
                                    </Pressable>

                                </View>

                            </ScrollView>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignSelf: 'center' }}>



                            <Dropdown
                                style={{
                                    height: 45,
                                    borderColor: COLORS.lightGray,
                                    borderRadius: 6,
                                    borderWidth: 1,
                                    width: '48%',
                                    paddingHorizontal: 12,
                                    alignSelf: 'flex-start',
                                    marginTop: 10,
                                    color: COLORS.black
                                }}
                                placeholderStyle={{ fontSize: 16, color: COLORS.black }}
                                selectedTextStyle={{
                                    fontSize: SIZES.smallFont,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.black
                                }}
                                inputSearchStyle={{}}
                                iconStyle={{}}
                                data={common.bloodGroups}
                                maxHeight={300}
                                labelField="label"
                                valueField="label"
                                dropdownPosition="top"
                                placeholder="Blood Group"
                                value={state.bloodGroup}
                                onChange={item => {
                                    setState(current => ({ ...current, bloodGroup: item.label }))
                                }}

                            />

                            <Dropdown
                                style={{
                                    height: 45,
                                    borderColor: COLORS.lightGray,
                                    borderRadius: 6,
                                    borderWidth: 1,
                                    width: '48%',
                                    paddingHorizontal: 12,
                                    alignSelf: 'flex-start',
                                    marginTop: 10,
                                    color: COLORS.black
                                }}
                                placeholderStyle={{ fontSize: 16, color: COLORS.black }}
                                selectedTextStyle={{
                                    fontSize: SIZES.smallFont,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.black
                                }}
                                inputSearchStyle={{}}
                                iconStyle={{}}
                                data={data.param.run_category}
                                maxHeight={300}
                                labelField="label"
                                valueField="label"
                                dropdownPosition="top"
                                placeholder="Run Category"
                                value={state.runCategory}
                                onChange={item => {
                                    setState(current => ({ ...current, runCategory: item.label }))
                                    setState(current => ({ ...current, runCategoryId: item.value }))

                                }}

                            />


                        </View>

                        <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>


                            <RectButton onClick={() => {
                                if (
                                    common.isEmpty(state.firstName) ||
                                    common.isEmpty(state.lastName) ||
                                    common.isEmpty(state.gender) ||
                                    common.isEmpty(state.email) ||
                                    common.isEmpty(state.number) ||
                                    common.isEmpty(state.emergencyNumber ?? data.param.phone_number) ||
                                    common.isEmpty(selectedDate)
                                ) {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Missing Data',
                                        visibilityTime: 500
                                    });
                                }
                                else {
                                    addRunnerCorp(userId)
                                }
                            }} text={"Next"} alignSelf={'center'} marginTop={24} width='45%' />


                        </View>




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

                    <DatePickerModal modalVisible={open} setModalVisible={setOpen} maxDate={sevenYearsAgo} setSelectedDate={setSelectedDate} />
                    <Toast
                        position='bottom'
                        bottomOffset={40}
                    />
                    {/* <DatePicker
                        modal
                        open={open}
                        date={state.date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setState(current => ({ ...current, date: date }))
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    /> */}
                </View>
            )

            }
        </authContext.Consumer>
    )
}

export default AddCorpRunner

const styles = StyleSheet.create({
    unSelectedBox: {
        borderRadius: 6, width: 30, marginHorizontal: 12, backgroundColor: COLORS.white, height: 28, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
    },
    selectedBox: {
        borderRadius: 6, width: 30, marginHorizontal: 12, backgroundColor: COLORS.white, height: 28, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
    },
    unSelectedText: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: SIZES.smallFont,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
    },
    selectedText: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: SIZES.smallFont,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
    }

});