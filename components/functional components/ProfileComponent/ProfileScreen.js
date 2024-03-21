import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton } from '../../ui components/Buttons';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react-native';
import authContext from '../../../contants/authContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';


const ProfileScreen = ({ route, navigation }) => {
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

    const [name, setName] = useState("")

    const deleteAccount = (userId) =>
        Alert.alert('Are you sure you want to delete your account', 'Once deleted it cannot be recovered', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => _deleteAccount(userId) },
        ]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const result = await AsyncStorage.getItem('firstName')
            console.log(result);
            setName(result ?? "User")
        });

        return unsubscribe;
    }, [navigation]);



    async function _deleteAccount(userId) {

        playAnimation()



        axios.put(`${CONST.baseUrlAuth}api/registrant/delete/account/${userId}`).then((response) => {
            console.log(response.data)
            pauseAnimation()
            Toast.show({
                type: 'success',
                text1: 'Success'
            });

            setTimeout(() => {
                route.params.logout()
            }, 1000)


        }).catch((error) => {
            pauseAnimation()
            Toast.show({
                type: 'error',
                text1: error
            });
        })
    }

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
                            onPress={() => { navigation.navigate("EditProfile", { userId: userId }) }}
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


                        <TouchableOpacity
                            onPress={() => deleteAccount(userId)}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 32 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <AntDesign name="deleteuser" size={24} color={COLORS.blue} />
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginLeft: 12
                                    }}
                                >
                                    Delete Account
                                </Text>
                            </View>


                        </TouchableOpacity>

                    </View>

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
            )}
        </authContext.Consumer>
    )
}

export default ProfileScreen