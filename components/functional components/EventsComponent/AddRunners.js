import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Pressable } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton, WhiteButton } from '../../ui components/Buttons';
import axios from 'axios';
import Input from '../../ui components/Input';
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import common from '../../../contants/common';
import authContext from '../../../contants/authContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePickerModal from '../../ui components/DatePickerModal';

const AddRunners = ({ route, navigation }) => {
    const data = route.params
    const [stackIndex, setStackIndex] = useState(1);


    const [open, setOpen] = useState(false)


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
        city: null,
        state: null,
        country: "",
        zipCode: "",
        runnersClass: null,
        date: new Date()
    })

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

                    <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ minHeight: '100%', width: '90%', alignSelf: 'center' }}>

                        <Text
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.bold,
                                color: COLORS.blue,
                                textAlign: 'left',
                                marginTop: 12
                            }}
                        >
                            Runner Details* ({route.params.current + 1}/{route.params.total})
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

                                <TouchableOpacity onPress={() => { setOpen(true) }}>
                                    <Input
                                        editable={false}
                                        placeholder="Enter Here"
                                        inputprops={{ width: '95%', marginTop: 8, alignSelf: 'flex-start', disabled: true }}
                                        // onChangeText={(value) => setState(current => ({ ...current, firstName: value }))}
                                        value={data.first_name}
                                        placeholderTextColor={COLORS.lightGray}
                                    />
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
                                    value={state.residentType}
                                    onChange={item => {
                                        setState(current => ({ ...current, residentType: item.value }))
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
                            // onChangeText={(value) => setState(current => ({ ...current, email: value }))}
                            value={data.email_id}
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
                                        inputprops={{ width: '100%', marginTop: 8, alignSelf: 'flex-start', paddingLeft: 42 }}
                                        onChangeText={(value) => setState(current => ({ ...current, number: value }))}
                                        value={data.phone_number}
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
                                        inputprops={{ width: '100%', marginTop: 8, alignSelf: 'flex-start', paddingLeft: 42 }}
                                        onChangeText={(value) => setState(current => ({ ...current, number: value }))}
                                        value={data.phone_number}
                                        placeholderTextColor={COLORS.lightGray}
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

                        <View style={{width:'100%', height:60}}>
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
                                data={[]}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Blood Group"
                                value={state.residentType}
                                onChange={item => {
                                    setState(current => ({ ...current, residentType: item.value }))
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
                                data={[]}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Run Category"
                                value={state.residentType}
                                onChange={item => {
                                    setState(current => ({ ...current, residentType: item.value }))
                                }}

                            />

                        </View>

<View style={{width:'100%', alignSelf:'center',flexDirection:'row', justifyContent:'space-evenly'}}>
                        <WhiteButton onClick={()=>{}} text={"Back"} alignSelf={'center'} marginTop={24} width='45%' />
                        <RectButton onClick={()=>{}} text={"Next"} alignSelf={'center'} marginTop={24} width='45%' />


</View>




                    </ScrollView>

                    <DatePickerModal modalVisible={open} setModalVisible={setOpen} setSelectedDate={state.date} />

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