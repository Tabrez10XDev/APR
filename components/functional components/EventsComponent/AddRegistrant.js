import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton } from '../../ui components/Buttons';
import axios from 'axios';
import Input from '../../ui components/Input';
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

const AddRegistrant = () => {


    const ResidentTypes = [{
        label: 'Villa',
        value: 'villa'
    },
    {
        label: "Tower",
        value: "tower"
    }
    ]



    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        flatNo: null,
        residentType: null
    })

    return (
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

            <ScrollView contentContainerStyle={{ minHeight: '100%', paddingBottom: 150, width: '90%', alignSelf: 'center' }}>

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
                        value={state.number}
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
                        data={ResidentTypes}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Resident type"
                        value={state.residentType}
                        onChange={item => {
                            setState(current => ({ ...current, residentType: item.value }))
                        }}

                    />

                    <Input
                        placeholder="Flat No"
                        inputprops={{ width: '48%', marginTop: 8, alignSelf: 'flex-start', marginLeft: 8 }}
                        onChangeText={(value) => setState(current => ({ ...current, flatNo: value }))}
                        value={state.flatNo}
                        placeholderTextColor={COLORS.lightGray}
                    />

                </View>

                {
                    state.residentType == "villa" ?
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
                            data={ResidentTypes}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Resident type"
                            value={state.residentType}
                            onChange={item => {
                                setState(current => ({ ...current, residentType: item.value }))
                            }}

                        /> : <Dropdown
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
                            data={ResidentTypes}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Resident type"
                            value={state.residentType}
                            onChange={item => {
                                setState(current => ({ ...current, residentType: item.value }))
                            }}

                        />

                }
            </ScrollView>
        </View>
    )
}

export default AddRegistrant