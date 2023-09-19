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

const MasterList = ({ route, navigation }) => {

    const data = route.params

    return (
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

            {
                data.stateArray.map((ele, inx) => {
                    console.log(ele)
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
                                        Male, 32y
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
                                        5K
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
                            <TouchableOpacity onPress={()=>{
                                let _data = data
                                _data.current = inx
                                navigation.navigate("AddRunners",_data)}}>
                                <Feather name="edit" size={24} color="black" />
                            </TouchableOpacity>

                        </View>
                    )
                })
            }


        </View>
    )
}

export default MasterList