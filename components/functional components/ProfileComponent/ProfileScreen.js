import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton } from '../../ui components/Buttons';
import axios from 'axios';
import Input from '../../ui components/Input';
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import common from '../../../contants/common';
import authContext from '../../../contants/authContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ route, navigation }) => {

    const [name, setName] = useState("")


    useEffect(async () => {
        const result = await AsyncStorage.getItem('firstName')
        setName(result ?? "User")
    }, [])

    return (
        <authContext.Consumer>
            {({ userId, setUserId, corpCode }) => (
                <View style={{ backgroundColor: 'white', width: '100%', height: '100%', alignItems: 'flex-start' }}>


                    <StatusBar
                        background={COLORS.blue}
                        backgroundColor={COLORS.blue}
                        barStyle="light-content"
                        style={{ backgroundColor: COLORS.blue, flex: 1 }}
                    ></StatusBar>




                    <View style={{ height: '12%', width: '100%', backgroundColor: COLORS.blue, justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}>

                        <Text
                            style={{
                                fontSize: SIZES.large,
                                fontFamily: FONTS.bold,
                                color: COLORS.white,
                                textAlign: 'center',
                                marginBottom: 12
                            }}
                        >
                            Settings
                        </Text>
                    </View>

                    <View style={{ width: '90%', alignSelf: "center" }}>
                        <Text
                            style={{
                                fontSize: SIZES.large,
                                fontFamily: FONTS.bold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 24
                            }}
                        >
                            {name}
                        </Text>
                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 4
                            }}
                        >
                            REGISTRANT
                        </Text>

                        <TouchableOpacity
                            // onPress={() => { navigation.navigate("EditProfile", { userId: userId }) }}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 32 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <Ionicons name="person-outline" size={24} color={COLORS.blue} />
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginLeft: 12
                                    }}
                                >
                                    Edit Account
                                </Text>
                            </View>

                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { navigation.navigate("PaymentHistory", { userId: userId }) }}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 32 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <MaterialIcons name="history" size={24} color={COLORS.blue} />

                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginLeft: 12
                                    }}
                                >
                                    Payment History
                                </Text>
                            </View>

                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => route.params.logout()}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 32 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <MaterialIcons name="logout" size={24} color={COLORS.blue} />
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginLeft: 12
                                    }}
                                >
                                    Logout
                                </Text>
                            </View>


                        </TouchableOpacity>

                    </View>




                </View>
            )}
        </authContext.Consumer>
    )
}

export default ProfileScreen