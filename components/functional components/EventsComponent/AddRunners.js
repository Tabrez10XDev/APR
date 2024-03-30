import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton, WhiteButton } from '../../ui components/Buttons';
import axios from 'axios';
import Input from '../../ui components/Input';
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import common from '../../../contants/common';
import authContext from '../../../contants/authContext';
import DatePickerModal from '../../ui components/DatePickerModal';
import { StackActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import moment from 'moment/moment';

const AddRunners = ({ route, navigation }) => {
    const data = route.params


    const [open, setOpen] = useState(false)


    const Genders = [{
        label: "MALE",
        value: "MALE"
    },
    {
        label: "FEMALE",
        value: "FEMALE"
    },
    // {
    //     label: "OTHERS",
    //     value: "OTHERS"
    // }
]

    const [missing, setMissing] = useState({})

    const newDate = new Date()
    const currDate = moment().format("YYYY-MM-DD")
    const sevenYearsAgo = moment().subtract(7, 'years').format("YYYY-MM-DD"); // Date 7 years ago

    const [stateArray, setStateArray] = useState(data.stateArray)

    const [current, setCurrent] = useState(data.current)

    const [state, setState] = useState(stateArray[current])

    const [selectedDate, setSelectedDate] = useState(stateArray[current].date ?? "")
    const [stackIndex, setStackIndex] = useState(state.size ?? 0);

    useEffect(() => {
        setState(stateArray[current])
        setStackIndex(stateArray[current].size ?? 0)
        setSelectedDate(stateArray[current].date ?? "")
    }, [current])



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setCurrent(data.current)
        });

        return unsubscribe;
    }, [navigation]);


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

                    <ScrollView contentContainerStyle={{ minHeight: '0%', width: '90%', alignSelf: 'center' }}>

                        <Text
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.bold,
                                color: COLORS.blue,
                                textAlign: 'left',
                                marginTop: 12
                            }}
                        >
                            Runner Details* ({current + 1}/{route.params.total})
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
                                    inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start', borderColor: 'red', borderWidth: missing.firstName ? 1 : 0 }}
                                    onChangeText={(value) => {
                                        setState(current => ({ ...current, firstName: value }),
                                            setMissing(current => ({ ...current, firstName: false }))
                                        )
                                    }}
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
                                    inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start', }}
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
                                        {selectedDate.length == 0 ? "Select Here" : selectedDate}
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
                                        inputType='numeric'
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
                                        inputType='numeric'
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
                            T Shirt Size<Text style={{ color: COLORS.red }}>*</Text>
                        </Text>

                        <View style={{ width: '100%', height: 60, }}>
                            <ScrollView
                                horizontal={true}
                                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ width: '100%', alignSelf: 'center', height: 60 }} contentContainerStyle={{width:'100%', justifyContent:'center'}}>


                                <View style={{
                                    borderBottomWidth: 0,
                                    borderColor: "#CCE4FF",
                                    height: 60,
                                    flexDirection: 'row',
                                    justifyContent: 'center', alignItems: 'center', width: '100%', height: 45, marginTop: 8, backgroundColor: COLORS.white, borderRadius: 6, padding:6
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
                                            // setTripHistory(tripObj.pending)
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
                                            // setTripHistory(tripObj.pending)
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
                                            // setTripHistory(tripObj.pending)
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
                                placeholder="Run Category"
                                value={state.runCategory}
                                onChange={item => {
                                    setState(current => ({ ...current, runCategory: item.label }))
                                    setState(current => ({ ...current, runCategoryId: item.value }))

                                }}
                            />
                        </View>

                        <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <WhiteButton onClick={() => {
                                if (current > 0) {
                                    let temp = stateArray
                                    temp[current] = state
                                    temp[current]['size'] = stackIndex
                                    temp[current]['date'] = selectedDate
                                    setStateArray(temp)
                                    setCurrent(current - 1)
                                } else {
                                    navigation.dispatch(StackActions.pop(1))
                                }
                            }} text={"Back"} alignSelf={'center'} marginTop={24} width='45%' />
                            <RectButton onClick={() => {

                                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                                const _emergencyNumber = state.emergencyNumber ?? data.param.phone_number


                                if (
                                    common.isEmpty(state.firstName) ||
                                    common.isEmpty(state.lastName) ||
                                    common.isEmpty(state.gender) ||
                                    common.isEmpty(state.email) ||
                                    common.isEmpty(state.number) ||
                                    common.isEmpty(state.emergencyNumber ?? data.param.phone_number) ||
                                    common.isEmpty(selectedDate) ||
                                    stackIndex == 0
                                ) {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Missing Data',
                                        visibilityTime: 1000
                                    });
                                    return
                                }

                                if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(state.firstName) || !/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(state.lastName)){
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Invalid name',
                                        visibilityTime: 1000
                                    });
                                    return 
                                }

                            else if(!emailRegex.test(state.email)){
                                Toast.show({
                                    type: 'error',
                                    text1: 'Invalid email',
                                    visibilityTime: 1000
                                });
                            return
                                }

                            else if(state.number.length !== 10 || !/^[0-9]+$/.test(state.number)){
                                Toast.show({
                                    type: 'error',
                                    text1: 'Invalid Number',
                                    visibilityTime: 1000
                                });
                            return
                                }

                            else if(_emergencyNumber.length !== 10 || !/^[0-9]+$/.test(_emergencyNumber)){
                                Toast.show({
                                    type: 'error',
                                    text1: 'Invalid Emergency Number',
                                    visibilityTime: 1000
                                });
                            return
                                }

                            else if (
                            common.isEmpty(state.runCategory)
                            ) {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Please select a Run Category',
                                    visibilityTime: 1000
                                });
                                }


                            else if (current < data.total - 1) {
                                let _state = state
                            _state["date"] = selectedDate
                            _state['size'] = stackIndex
                            _state['emergencyNumber'] = state.emergencyNumber ?? data.param.phone_number
                            let temp = stateArray
                            temp[current] = _state
                            setStateArray(temp)
                            setCurrent(current + 1)
                                } else {
                                let _state = state
                            _state["date"] = selectedDate
                            _state['size'] = stackIndex
                            _state['emergencyNumber'] = state.emergencyNumber ?? data.param.phone_number

                            let temp = stateArray
                            temp[current] = _state
                            setStateArray(temp)

                            let _data = data
                            data.stateArray = stateArray
                            navigation.navigate("MasterList", data)
                                }
                            }} text={"Next"} alignSelf={'center'} marginTop={24} width='45%' />


                        </View>




                    </ScrollView>

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

export default AddRunners

const styles = StyleSheet.create({
    unSelectedBox: {
        borderRadius: 6, marginHorizontal: 12, backgroundColor: COLORS.white, height: 28, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
    },
    selectedBox: {
        borderRadius: 6,  marginHorizontal: 12, backgroundColor: COLORS.white, height: 28, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
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