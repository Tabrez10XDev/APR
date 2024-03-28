import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MySchedule = ({ navigation }) => {


    


    const [stackIndex, setStackIndex] = useState(1);
    const [loaded, setLoaded] = useState(false)
    const [state, setState] = useState([])
    const [history, setHistory] = useState({ upcoming: [], completed: [] })
    const [userId, setUserId] = useState("-1")
    const [registerantInfo, setRegisterantInfo] = useState({})

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

    async function fetchHistory(userId) {
        playAnimation()

        axios.get(`${CONST.baseUrlRegister}api/registration/myschedule/data/${userId}`).then((response) => {
            if (response.data == []) return
            else if (response.data.runnerInfo === undefined) return
            const currDate = new Date()
            let _completed = []
            let _upcoming = []
            response.data.runnerInfo.map((ele, inx) => {
                const eventDate = new Date(ele.event_date)
                if (currDate.getTime() > eventDate.getTime())
                    _completed.push(ele)
                else
                    _upcoming.push(ele)
            })

            setRegisterantInfo(response.data.registerant_info)
            setHistory(current => ({ ...current, completed: _completed, upcoming: _upcoming }))
            setState(response.data.runnerInfo)
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoaded(true)
            pauseAnimation()
        })
    }

    const getData = async () => {
        try {

            const result = await AsyncStorage.getItem('AuthState')
            if (result !== null && result != "-1" && result != undefined) {
                setUserId(result)
                fetchHistory(result)
            } else {
                setUserId("-1")
            }

        } catch (e) {
            console.error(e)
        }
    }

    const monthMap = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoaded(false)
            getData()
        });

        return unsubscribe;
    }, [navigation]);

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
                    My Schedule
                </Text>
            </View>

            <View style={{
                flexDirection: 'row', marginBottom: 16,
                justifyContent: 'center', alignItems: 'center', width: '90%', height: 40, marginTop: 16, backgroundColor: '#EEEEEF', borderRadius: 6, padding: 2, alignSelf: 'center'
            }}>

                <Pressable
                    onPress={() => {
                        setStackIndex(1)
                    }}
                    style={[stackIndex == 1 ? styles.selectedBox : styles.unSelectedBox]}>
                    <Text
                        style={[stackIndex == 1 ? styles.selectedText : styles.unSelectedText]}
                    >
                        Upcoming
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        setStackIndex(2)
                    }}

                    style={[stackIndex == 2 ? styles.selectedBox : styles.unSelectedBox]}>
                    <Text
                        style={[stackIndex == 2 ? styles.selectedText : styles.unSelectedText]}
                    >
                        Completed
                    </Text>
                </Pressable>


            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ width: '100%', alignSelf: 'center' }}
                contentContainerStyle={{ alignItems: 'center', width: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
                data={stackIndex == 1 ? history.upcoming : history.completed}
                renderItem={({ item, index }) =>
                    <TouchableOpacity
                    onPress={()=>{navigation.navigate("BookingInfo", {...item, registerantInfo: registerantInfo})}}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', alignSelf: 'center', marginTop: 12 }}>

                        <View style={{alignItems:'flex-start', width:'80%', justifyContent:'flex-start'}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',  width:'100%' }}>

                                <Text
                                    style={{
                                        fontSize: SIZES.medium,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                    }}
                                >
                                    {item.type_name}
                                </Text>
                                <Ionicons name="checkmark-circle" size={24} color="#23A26D" style={{ marginHorizontal: 8 }} />
                            </View>

                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.regular,
                                    color: COLORS.blue,
                                    textAlign: 'left',
                                }}
                            >
                                {item.event_date.substring(8, 10)} {monthMap[parseInt(item.event_date.substring(5, 7) - 1)]} {item.event_date.substring(0, 4)}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.grey,
                                        textAlign: 'left',
                                    }}
                                >
                                    {item.runners.length} ticket(s)
                                </Text>
                                <View style={{ width: 6, height: 6, borderRadius: 4, backgroundColor: COLORS.grey, marginHorizontal: 8 }}></View>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.grey,
                                        textAlign: 'left',
                                    }}
                                >
                                    {item.run_category}
                                </Text>


                            </View>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                {
                                    item.runners.map((ele, inx) => {
                                        return (
                                            <Text
                                                style={{
                                                    fontSize: SIZES.font,
                                                    fontFamily: FONTS.regular,
                                                    color: COLORS.grey,
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {ele.bib_number} {' '}
                                            </Text>
                                        )
                                    })
                                }
                            </View> */}


                        </View>

                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 16}} />

                    </TouchableOpacity>

                }
            />

            {
                stackIndex == 1 && history.upcoming.length == 0 && loaded &&
                <Text
                    style={{
                        position: 'absolute',
                        top: "50%",
                        alignSelf: 'center',
                        fontSize: SIZES.font,
                        fontFamily: FONTS.semiBold,
                        color: COLORS.greenAccent,
                    }}>
                    No Results found
                </Text>
            }

            {
                stackIndex == 2 && history.completed.length == 0 && loaded &&
                <Text style={{
                    position: 'absolute',
                    top: "50%",
                    alignSelf: 'center',
                    fontSize: SIZES.font,
                    fontFamily: FONTS.semiBold,
                    color: COLORS.greenAccent,
                }}>
                    No Results found
                </Text>
            }
            {/* 
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', alignSelf: 'center', marginTop: 12 }}>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.black,
                                textAlign: 'left',
                            }}
                        >
                            Marathon Runners
                        </Text>
                        <Ionicons name="md-checkmark-circle" size={24} color="#23A26D" style={{ marginHorizontal: 8 }} />
                    </View>

                    <Text
                        style={{
                            fontSize: SIZES.font,
                            fontFamily: FONTS.regular,
                            color: COLORS.blue,
                            textAlign: 'left',
                        }}
                    >
                        Dec 11th 2023

                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.regular,
                                color: COLORS.grey,
                                textAlign: 'left',
                            }}
                        >
                            4 tickets
                        </Text>
                        <View style={{ width: 6, height: 6, borderRadius: 4, backgroundColor: COLORS.grey, marginHorizontal: 8 }}></View>
                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.regular,
                                color: COLORS.grey,
                                textAlign: 'left',
                            }}
                        >
                            1k/5K/10k
                        </Text>
                    </View>

                </View>

                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 16 }} />

            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', alignSelf: 'center', marginTop: 12 }}>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.black,
                                textAlign: 'left',
                            }}
                        >
                            Marathon Runners
                        </Text>
                        <Ionicons name="md-checkmark-circle" size={24} color="#23A26D" style={{ marginHorizontal: 8 }} />
                    </View>

                    <Text
                        style={{
                            fontSize: SIZES.font,
                            fontFamily: FONTS.regular,
                            color: COLORS.blue,
                            textAlign: 'left',
                        }}
                    >
                        Dec 11th 2023

                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.regular,
                                color: COLORS.grey,
                                textAlign: 'left',
                            }}
                        >
                            4 tickets
                        </Text>
                        <View style={{ width: 6, height: 6, borderRadius: 4, backgroundColor: COLORS.grey, marginHorizontal: 8 }}></View>
                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.regular,
                                color: COLORS.grey,
                                textAlign: 'left',
                            }}
                        >
                            1k/5K/10k
                        </Text>
                    </View>

                </View>

                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 16 }} />

            </View> */}



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

export default MySchedule

const styles = StyleSheet.create({
    unSelectedBox: {
        borderRadius: 6, width: '50%', backgroundColor: '#EEEEEF', height: 36, justifyContent: 'center', alignItems: 'center'
    },
    selectedBox: {
        borderRadius: 6, width: '50%',
        height: 36, justifyContent: 'center', alignItems: 'center',
        backgroundColor: COLORS.blue,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    unSelectedText: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: SIZES.font,
        fontFamily: FONTS.semiBold,
        color: COLORS.greenAccent,
    },
    selectedText: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: SIZES.font,
        fontFamily: FONTS.semiBold,
        color: COLORS.white,
    }

});