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

const PaymentHistory = ({ route, navigation }) => {

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


    const [filterText, setFilterText] = useState("")
    const [state, setState] = useState([])
    const [staticState, setStaticState] = useState([])

    async function getPaymentHistory() {
        playAnimation()
        axios.get(`${CONST.baseUrlRegister}api/payment/details/${route.params.userId}`).then((response) => {
            setState(response.data)
            setStaticState(response.data)

            console.log(response.data);
        }).catch((err) => {

        }).finally(() => {
            pauseAnimation()
        })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPaymentHistory()
        });

        return unsubscribe;
    }, [navigation]);

    



    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(filterText.trim() == "" && staticState.length !== 0){
                setState(staticState)
            }else if(filterText.trim() !== ""){
                const _filterText = filterText.toLowerCase()
                let temp = staticState.filter(current=>(current.order_id.toLowerCase().includes(_filterText) || current.email_id.toLowerCase().includes(_filterText) || current.type_name.toLowerCase().includes(_filterText) ))
                setState(temp)
            }
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [filterText])

    return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%', alignItems: 'flex-start' }}>


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
                    Payment History
                </Text>

              
            </View>

            <View style={{ width: '90%', alignSelf: 'center' }}>

                <TextInput value={filterText} onChangeText={(text) => { setFilterText(text) }} placeholder='Filter' style={{ width: '100%', height: 45, borderColor: '#656565', borderWidth: 1, marginTop: 10, padding: 6, borderRadius: 6, marginBottom: 18 }} color={COLORS.black} />

                <ScrollView contentContainerStyle={{ minHeight: '100%' }} showsVerticalScrollIndicator={false}>
                    {state.map((ele, inx) => {
                        return (
                            <View style={{ width: '100%', backgroundColor: '#EBF0F9', borderRadius: 10, padding: 10, marginVertical: 8, alignSelf: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text
                                        style={{
                                            fontSize: SIZES.font,
                                            fontFamily: FONTS.semiBold,
                                            color: COLORS.blue,
                                            textAlign: 'left',
                                        }}
                                    >
                                        Order ID: {ele.order_id}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: SIZES.font,
                                            fontFamily: FONTS.semiBold,
                                            color: COLORS.blue,
                                            textAlign: 'right',
                                        }}
                                    >
                                        {ele.type_name}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                                    <Text
                                        style={{
                                            fontSize: SIZES.font,
                                            fontFamily: FONTS.semiBold,
                                            color: COLORS.blue,
                                            textAlign: 'left',
                                        }}
                                    >
                                        {ele.email_id}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: SIZES.font,
                                            fontFamily: FONTS.semiBold,
                                            color: COLORS.blue,
                                            textAlign: 'right',
                                        }}
                                    >
                                        {ele.created_at.substring(0, 10)}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                                    <Text
                                        style={{
                                            fontSize: SIZES.font,
                                            fontFamily: FONTS.semiBold,
                                            color: COLORS.blue,
                                            textAlign: 'left',
                                        }}
                                    >
                                        {ele.total_amount} ₹
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: SIZES.font,
                                            fontFamily: FONTS.semiBold,
                                            color: COLORS.blue,
                                            textAlign: 'right',
                                        }}
                                    >
                                        {ele.order_status.toUpperCase()}
                                    </Text>
                                </View>

                            </View>
                        )
                    })}
                </ScrollView>

                {state.length == 0 &&
                    <Text style={{
                        top: '30%', alignSelf: 'center', position: 'absolute',
                        fontSize: SIZES.font,
                        fontFamily: FONTS.semiBold,
                    }}>
                        No results to show
                    </Text>
                }





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
                    position: 'absolute', height: '88%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0)', alignSelf: 'center', padding: 24, bottom: 0 
                }}>

                    <Lottie source={require('../../../assets/loading.json')} autoPlay style={{ height: 100, width: 100, alignSelf: 'center' }} loop ref={animRef} speed={1} />
                </View>
            }
        </View>
    )
}

export default PaymentHistory