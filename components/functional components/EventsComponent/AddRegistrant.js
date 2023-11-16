import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton } from '../../ui components/Buttons';
import axios from 'axios';
import Input from '../../ui components/Input';
import { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import common from '../../../contants/common';
import authContext from '../../../contants/authContext';
import Toast from 'react-native-toast-message';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Lottie from 'lottie-react-native';
import { StackActions, useTheme } from '@react-navigation/native';


const AddRegistrant = ({ route, navigation }) => {



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



    const data = route.params
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        flatNo: null,
        residentType: null,
        address: "",
        tower: null,
        phase: null,
        city: "",
        state: "Karnataka",
        country: "India",
        zipCode: "",
        runnersClass: null,
        sourceRef: null,
        certificate: false,
        panCard: null,
        amount: "",
        runnerKits: false,
        block: null,
        residentOfAPR: false,
        laneNumber: null,
        villaNumber: ''
    })
    
        useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            verifyVilla()
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [state.villaNumber])

    const isDonors = data.typeName.toLowerCase().includes("donat")
    const isWithout = data.typeName.toLowerCase().includes("with")
    const [blocks, setBlocks] = useState([])



    async function createOrder(responseData) {

        const payload = {
            "registrant_id": responseData.registrant_id,
            "registrant_class_ref": responseData.registrant_class_ref,
            "booking_id_ref": responseData.booking_id_ref,
            "event_id_ref": responseData.event_id_ref,
            "runner_count": responseData.runner_count
        }


        axios.post(`${CONST.baseUrlRegister}api/registration/create/order`, payload).then((response) => {
            console.log("order created");
            const currDate = new Date()
            const orderDetails = response.data.order_details
            let data = {
                "registrant_id": parseInt(orderDetails.registrant_id),
                "order_id": orderDetails.order_id,
                "amount": orderDetails.amount,
                "registrant_class": orderDetails.registrant_class,
                "payment_date": `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate() < 10 ? "0" + currDate.getDate() : currDate.getDate()}`
            };

            navigation.navigate("CreateOrder", { payload: data, orderDetails: orderDetails, billingAddress: response.data.billing_address })


        }).finally(() => {
            pauseAnimation()
        })
    }


    async function register(userId) {



        if (state.residentType == null || state.runnersClass == null || state.city.trim().length == 0 || state.state.trim().length == 0 || state.country.trim().length == 0 || state.zipCode.trim().length == 0  || state.runnersClass == undefined || state.runnersClass == null) {
            Toast.show({
                type: 'error',
                text1: 'Missing Data',
                visibilityTime: 1000
            });
            return;
        }

        let address = state.flatNo
        if (state.residentType == "villa") address = null
        if (state.residentType == "tower") address = null
        else address += state.address


        let registrantOfAPR = false
        if (state.residentType == "villa" || state.residentType == "tower") registrantOfAPR = true

        const _payload = {
            "registrant_id": parseInt(userId),
            "registrant_type_ref": data.registrant_class[0].registrant_type_id_ref,
            "resident_of_apr": registrantOfAPR,
            "address_type": state.residentType,
            "external_address": address,
            "city": state.city,
            "state": state.state,
            "country": state.country,
            "pin_code": state.zipCode,
            "need_80G_certificate": state.certificate,
            "pancard_number": state.panCard,
            "registrant_class_ref": state.runnersClass,
            "event_id_ref": 3,
            "role": "registrant",
            addr_villa_number: state.residentType == "villa" ? state.villaNumber : null,
            addr_villa_lane_no: state.residentType == "villa" ? state.laneNumber : null,
            addr_villa_phase_no: state.residentType == "villa" ? state.phase : null,
            addr_tower_no: state.residentType == "tower" ? state.tower : null,
            addr_tower_block_no: state.residentType == "tower" ? state.block : null,
            addr_tower_flat_no: state.flatNo,
        }


        let runnerDetails = []

        playAnimation()

        const payload = {
            registrant_detail: _payload,
            runner_details: runnerDetails
        }

        console.log(JSON.stringify(payload));


        try {
            axios.put(`${CONST.baseUrlRegister}api/registration/add/registrant/web`, payload).then((response) => {
                console.log("Success")
                createOrder(response.data)

            })
        } catch (error) {

            console.log(err.response.data)
            Toast.show({
                type: 'error',
                text1: error.response.data
            });
        }



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


    async function addRegistrant(userId) {


        if (state.residentType == null || state.runnersClass == null || state.city.trim().length == 0 || state.state.trim().length == 0 || state.country.trim().length == 0 || state.zipCode.trim().length == 0 || state.runnersClass == undefined || state.runnersClass == null) {
            Toast.show({
                type: 'error',
                text1: 'Missing Data',
                visibilityTime: 1000
            });
            return;
        }

        let address = state.flatNo
        if (state.residentType == "villa") address += ", " + state.phase + ", "
        if (state.residentType == "tower") address += ", " + state.tower + ", "

        address += state.address

        let registrantOfAPR = false
        if (state.residentType == "villa" || state.residentType == "tower") registrantOfAPR = true

        const payload = {
            "registrant_id": userId,
            "registrant_type_ref": data.registrant_class[0].registrant_type_id_ref,
            "resident_of_apr": registrantOfAPR,
            "address_type": state.residentType,
            "address": address,
            "city": state.city,
            "state": state.state,
            "country": state.country,
            "pin_code": state.zipCode,
            "need_80G_certificate": state.certificate,
            "pancard_number": state.panCard,
            "registrant_source_ref": state.sourceRef,
            "registrant_class_ref": state.runnersClass,
            "event_id_ref": 3,
            "role": "registrant",
            addr_villa_number: state.residentType == "villa" ? `${state.villaNumber}` : null,
            addr_villa_lane_no: state.residentType == "villa" ? `${state.laneNumber}` : null,
            addr_villa_phase_no: state.residentType == "villa" ? `${state.phase}` : null,
            addr_tower_no: state.residentType == "tower" ? `${state.tower}` : null,
            addr_tower_block_no: state.residentType == "tower" ? `${state.block}` : null,
            addr_tower_flat_no: `${state.flatNo}`,
            amount: state.amount
        }

        let _stateArray = []
        data.registrant_class.map((ele) => {
            if (ele.category_id == state.runnersClass) {
                for (i = 0; i < ele.runners_allowed_count; i++) {
                    _stateArray.push({})
                }
            }
        })

        console.log(JSON.stringify(payload))

        navigation.navigate("AddRunners", { ...payload, current: 0, total: _stateArray.length, stateArray: _stateArray, param: data })

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

    async function addRegistrantCorp(userId) {



        if (state.residentType == null || state.runnersClass == null || state.city.trim().length == 0 || state.state.trim().length == 0 || state.country.trim().length == 0 || state.zipCode.trim().length == 0  || state.runnersClass == undefined || state.runnersClass == null) {
            Toast.show({
                type: 'error',
                text1: 'Missing Data',
                visibilityTime: 1000
            });
            return;
        }

        let address = state.flatNo
        if (state.residentType == "villa") address = null
        if (state.residentType == "tower") address = null
        else address += state.address


        let registrantOfAPR = false
        if (state.residentType == "villa" || state.residentType == "tower") registrantOfAPR = true

        const payload = {
            "event_id": 3, //Event ID
            "registrant_id": parseInt(userId),
            "registrant_type_ref": data.registrant_class[0].registrant_type_id_ref,
            "resident_of_apr": registrantOfAPR,
            "address_type": state.residentType,
            "external_address": address,
            "city": state.city,
            "state": state.state,
            "country": state.country,
            "pin_code": state.zipCode,
            "need_80G_certificate": state.certificate,
            "pancard_number": state.panCard,
            "registrant_class_ref": state.runnersClass,
            "event_id_ref": 3,
            "role": "registrant",
            addr_villa_number: state.residentType == "villa" ? `Villa ` + state.villaNumber : null,
            addr_villa_lane_no: state.residentType == "villa" ? `Lane ` + state.laneNumber : null,
            addr_villa_phase_no: state.residentType == "villa" ? `Phase ` + state.phase : null,
            addr_tower_no: state.residentType == "tower" ? `Tower ` + state.tower : null,
            addr_tower_block_no: state.residentType == "tower" ? `Block ` + state.block : null,
            addr_tower_flat_no: state.flatNo,
        }



        playAnimation()

     



        try {
            axios.put(`${CONST.baseUrlRegister}api/registration/add/registrant/web`, payload).then((response) => {
                console.log("Success")
                navigation.navigate("BookingConfirmed", response.data)

            })
        } catch (error) {

            console.log(err.response.data)
            Toast.show({
                type: 'error',
                text1: error.response.data
            });
        }



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
    ]





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
                            Registration
                        </Text>
                    </View>

                    <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ minHeight: '100%', paddingBottom: 50, width: '90%', alignSelf: 'center' }}>

                        <Text
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.bold,
                                color: COLORS.blue,
                                textAlign: 'left',
                                marginTop: 12
                            }}
                        >
                            Registrant Details*
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
                                    // onChangeText={(value) => setState(current => ({ ...current, firstName: value }))}
                                    value={data.first_name}
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
                                    value={data.last_name}
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
                            value={data.email_id}
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
                                onChangeText={(value) => setState(current => ({ ...current, number: value }))}
                                value={data.phone_number}
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
                            Runners Class<Text style={{ color: COLORS.red }}>*</Text>
                        </Text>

                        <Dropdown
                            mode='modal'
                            style={{
                                height: 45,
                                borderColor: COLORS.lightGray,
                                borderRadius: 6,
                                borderWidth: 1,
                                width: '100%',
                                paddingHorizontal: 12,
                                alignSelf: 'flex-start',
                                marginTop: 18,
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
                            data={data.classes}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select"
                            value={state.runnersClass}
                            onChange={item => {
                                setState(current => ({ ...current, runnersClass: item.value }))
                            }}

                        />


                        {isDonors &&
                            <View>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', width: '95%', marginTop: 14, justifyContent: 'space-between', alignItems: 'center' }}>

                                    <BouncyCheckbox
                                        size={25}
                                        fillColor={COLORS.blue}
                                        unfillColor={COLORS.grey}
                                        iconStyle={{ borderColor: COLORS.grey }}
                                        innerIconStyle={{ borderWidth: 2 }}
                                        onPress={(isChecked) => { setState(current => ({ ...current, certificate: isChecked })) }}
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
                                        80G Certificate required<Text style={{ color: COLORS.red }}>*</Text>
                                    </Text>

                                </View>

                                {state.certificate &&
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: SIZES.font,
                                                fontFamily: FONTS.bold,
                                                color: COLORS.black,
                                                textAlign: 'left',
                                                marginTop: 16
                                            }}
                                        >
                                            PAN Card<Text style={{ color: COLORS.red }}>*</Text>
                                        </Text>

                                        <Input
                                            placeholder="Enter Here"
                                            inputprops={{ width: '100%', marginTop: 8, alignSelf: 'flex-start' }}
                                            onChangeText={(value) => setState(current => ({ ...current, panCard: value }))}
                                            value={state.panCard}
                                            placeholderTextColor={COLORS.lightGray}
                                        />
                                    </View>
                                }
                            </View>
                        }

                        {isWithout &&
                            <View>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', width: '95%', marginTop: 14, justifyContent: 'space-between', alignItems: 'center' }}>

                                    <BouncyCheckbox
                                        size={25}
                                        fillColor={COLORS.blue}
                                        unfillColor={COLORS.grey}
                                        iconStyle={{ borderColor: COLORS.grey }}
                                        innerIconStyle={{ borderWidth: 2 }}
                                        onPress={(isChecked) => { setState(current => ({ ...current, certificate: isChecked })) }}
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
                                        80G Certificate required<Text style={{ color: COLORS.red }}>*</Text>
                                    </Text>

                                </View>

                                {state.certificate &&
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: SIZES.font,
                                                fontFamily: FONTS.bold,
                                                color: COLORS.black,
                                                textAlign: 'left',
                                                marginTop: 16
                                            }}
                                        >
                                            PAN Card<Text style={{ color: COLORS.red }}>*</Text>
                                        </Text>

                                        <Input
                                            placeholder="Enter Here"
                                            inputprops={{ width: '100%', marginTop: 8, alignSelf: 'flex-start' }}
                                            onChangeText={(value) => setState(current => ({ ...current, panCard: value }))}
                                            value={state.panCard}
                                            placeholderTextColor={COLORS.lightGray}
                                        />
                                    </View>
                                }
                            </View>
                        }

                        {isWithout &&
                            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '95%', marginTop: 14, justifyContent: 'space-between', alignItems: 'center' }}>

                                <BouncyCheckbox
                                    size={25}
                                    fillColor={COLORS.blue}
                                    unfillColor={COLORS.grey}
                                    iconStyle={{ borderColor: COLORS.grey }}
                                    innerIconStyle={{ borderWidth: 2 }}
                                    onPress={(isChecked) => { setState(current => ({ ...current, runnerKits: isChecked })) }}
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
                                    I opt for home-delivered (runners kit)
                                </Text>

                            </View>
                        }

{isDonors &&
                            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '95%', marginTop: 14, justifyContent: 'space-between', alignItems: 'center' }}>

                                <BouncyCheckbox
                                    size={25}
                                    fillColor={COLORS.blue}
                                    unfillColor={COLORS.grey}
                                    iconStyle={{ borderColor: COLORS.grey }}
                                    innerIconStyle={{ borderWidth: 2 }}
                                    onPress={(isChecked) => { setState(current => ({ ...current, runnerKits: isChecked })) }}
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
                                    I opt for home-delivered (runners kit)
                                </Text>

                            </View>
                        }


                        <RectButton onClick={() => {
                            if (isDonors) {
                                register(userId)
                            }
                            else if (corpCode) addRegistrantCorp(userId)
                            else addRegistrant(userId)
                        }} text={isDonors ? "Pay Now" : "Add Runner Details"} alignSelf={'center'} marginTop={24} />



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
        </authContext.Consumer>
    )
}

export default AddRegistrant