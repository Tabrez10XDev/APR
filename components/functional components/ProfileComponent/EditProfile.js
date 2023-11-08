import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton } from '../../ui components/Buttons';
import axios from 'axios';
import Input from '../../ui components/Input';
import { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import common from '../../../contants/common';
import authContext from '../../../contants/authContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import Lottie from 'lottie-react-native';
import { StackActions, useTheme } from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const EditProfile = ({ route, navigation }) => {

    const [animSpeed, setAnimSpeed] = useState(false)
    const animRef = useRef()

    function playAnimation() {
        setAnimSpeed(true)
    }


    useEffect(() => {
        setTimeout(() => {
            animRef.current?.play();
        }, 100)
    }, [animSpeed])


    function pauseAnimation() {
        setAnimSpeed(false)
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

    const [state, setState] = useState({})


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            verifyVilla()
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [state.addr_villa_number])

    async function fetchUser() {
        playAnimation()
        axios.get(`${CONST.baseUrlRegister}api/registration/registrant/details/${route.params.userId}`).then((response) => {
            setState(response.data[0])
            console.log(JSON.stringify(response.data[0]));
        }).catch((err) => {

        }).finally(() => {
            pauseAnimation()
        })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUser()
        });

        return unsubscribe;
    }, [navigation]);


    return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%'}}>


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
                    Edit Profile
                </Text>
            </View>

            <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ minHeight: '90%', paddingBottom: 50, width: '90%', alignSelf: 'center' }}>
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
                            // onChangeText={(value) => setState(current => ({ ...current, firstName: value }))}
                            value={state.first_name}
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
                            // onChangeText={(value) => setState(current => ({ ...current, lastName: value }))}
                            value={state.last_name}
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
                    Email ID<Text style={{ color: COLORS.red }}>*</Text>
                </Text>

                <Input
                    placeholder="Enter Here"
                    inputprops={{ width: '100%', marginTop: 8, alignSelf: 'flex-start' }}
                    // onChangeText={(value) => setState(current => ({ ...current, email: value }))}
                    value={state.email_id}
                    placeholderTextColor={COLORS.lightGray}
                />

                <Text
                    style={{
                        fontSize: SIZES.font,
                        fontFamily: FONTS.bold,
                        color: COLORS.black,
                        textAlign: 'left',
                        marginTop: 16
                    }}
                >
                    Phone Number<Text style={{ color: COLORS.red }}>*</Text>
                </Text>
                <View style={{ justifyContent: 'center' }}>
                    <Feather name="phone" size={24} color={COLORS.icons} style={{ position: 'absolute', zIndex: 5, left: 8, top: '40%' }} />
                    <Input
                        placeholder="Enter Here"
                        inputprops={{ width: '100%', marginTop: 8, alignSelf: 'flex-start', paddingLeft: 42 }}
                        value={state.mobile_number}
                        placeholderTextColor={COLORS.lightGray}
                    />
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
                        disableBuiltInState
                        isChecked={state.resident_of_apr}
                        onPress={(isChecked) => { setState(current => ({ ...current, resident_of_apr: isChecked })) }}
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
                        value={state.address_type}
                        onChange={item => {
                            setState(current => ({ ...current, address_type: item.value }))
                        }}

                    />
                    {state.residentType == 'others' &&

                        <Input
                            placeholder="Flat No"
                            inputprops={{ width: '48%', marginTop: 8, alignSelf: 'flex-start', marginLeft: 8 }}
                            onChangeText={(value) => setState(current => ({ ...current, flatNo: value }))}
                            value={state.flatNo}
                            placeholderTextColor={COLORS.lightGray}
                        />}

                </View>

                {
                    state.address_type == "villa" &&
                    <View style={{ width: '98%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', alignSelf: 'center' }}>

                        <View style={{ width: '100%' }}>

                            <Input
                                placeholder="Villa Number"
                                inputprops={{ width: '100%', marginTop: 8 }}
                                onChangeText={(value) => setState(current => ({ ...current, addr_villa_number: value }))}
                                value={state.addr_villa_number}
                                placeholderTextColor={COLORS.lightGray}
                            />
                        </View>

                        {/* <RectButton
                                    onClick={() => {
                                        verifyVilla()
                                    }}
                                    width={'45%'}
                                    text={"Verify"}
                                /> */}

                    </View>


                }

                {
                    state.address_type == 'villa' &&
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                        <View style={{ width: '50%' }}>
                            <Input
                                editable={false}
                                placeholder="Lane No"
                                inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start' }}
                                onChangeText={(value) => setState(current => ({ ...current, addr_villa_lane_no: value }))}
                                value={state.addr_villa_lane_no}
                                placeholderTextColor={COLORS.lightGray}
                            />
                        </View>
                        <View style={{ width: '50%' }}>
                            <Input
                                editable={false}
                                placeholder="Phase No"
                                inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start' }}
                                onChangeText={(value) => setState(current => ({ ...current, addr_villa_phase_no: value }))}
                                value={state.addr_villa_phase_no}
                                placeholderTextColor={COLORS.lightGray}
                            />
                        </View>
                    </View>
                }

                {
                    state.address_type == "tower" &&
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
                        value={state.addr_tower_no}
                        onChange={item => {
                            // setState(current => ({ ...current, sourceRef: item.value }))
                            setState(current => ({ ...current, addr_tower_no: item.label }))

                        }}

                    />

                }

                {
                    state.address_type == "tower" &&
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
                        value={state.addr_tower_block_no}
                        onChange={item => {
                            setState(current => ({ ...current, addr_tower_block_no: item.block_number }))

                        }}

                    />

                }
                {state.address_type == 'others' &&

                    <Input
                        placeholder="Address"
                        inputprops={{ width: '100%', marginTop: 12, alignSelf: 'center' }}
                        onChangeText={(value) => setState(current => ({ ...current, external_address: value }))}
                        value={state.external_address}
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
                            onChangeText={(value) => setState(current => ({ ...current, pin_code: value }))}
                            value={state.pin_code}
                            placeholderTextColor={COLORS.lightGray}
                        />
                    </View>
                </View>


<RectButton text={"Save Changes"} onClick={()=>{}} alignSelf="center" marginTop={48}/>
        

            </ScrollView>
            <Toast
                position='bottom'
                bottomOffset={40}
            />

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

export default EditProfile