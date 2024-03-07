import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import authContext from '../../../contants/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';

const Events = ({ navigation }) => {

    const [data, setData] = useState({ event_info: {}, percentage: "70", registrant_type: [] })
    const [cutoff, setCutoff] = useState({})
    const [name, setName] = useState("")


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



    async function fetchDashboard(result2) {
        console.log("Fetching")
        playAnimation()

        axios.get(`${CONST.baseUrlRegister}api/registration/get/registrant/category/details`).then((response) => {
            setData(response.data)
            const combinedDateTimeStr = `${response.data.event_info.event_cut_off_date}T${response.data.event_info.event_cut_off_time}:00`;

            const createdAt = new Date(response.data.event_info.created_at);
            const eventCutOffDateTime = new Date(combinedDateTimeStr);
            const timeDifferenceMs = eventCutOffDateTime - createdAt;

            // // Calculate the total time duration in milliseconds
            const totalDurationMs = eventCutOffDateTime - new Date()
            // // Calculate the percentage
            const _percentage = (100 - (totalDurationMs / timeDifferenceMs) * 100)
            const percent = _percentage <= 100 ? _percentage : "70"

            const _eventDate = response.data.event_info.event_date
            console.log(_eventDate.substring(5, 7))
            const eventDate = _eventDate.substring(8, 10) + " " + monthMap[parseInt(_eventDate.substring(5, 7) - 1)] + " " + _eventDate.substring(0, 4)
            console.log(eventDate);
            let ageCategories = {}
            let raceCategories = {}

            response.data.overAllageCategory.map((ele, inx) => {
                ageCategories[ele.age_type_id] = ele.age_type_name
            })

            response.data.raceCategory.map((ele, inx) => {
                raceCategories[ele.race_type_id] = ele.race_type_name
            })
            
            let registrant_type = response.data.registrant_type

            if (result2 != null && result2 == "1"){
                registrant_type = response.data.registrant_type.filter(current=>current.type_name.toLowerCase().includes("marathon"))
            }

            

            setData(current => ({ ...current, percentage: percent, eventDate: eventDate, ageCategories: ageCategories, raceCategories: raceCategories, registrant_type: registrant_type }))

        }).catch((err) => {
            if(data.registrant_type.length == 0){
                console.log("Running again");
                fetchDashboard()
            }
            console.log(err)
        }).finally(() => {
            pauseAnimation()
        })
    }


    useEffect(() => {
        const intervalId = setInterval(() => {

            const eventCutOffDate = data.event_info.event_cut_off_time ? new Date(`${data.event_info.event_cut_off_time}`) : new Date()
            const currentDate = new Date();

            const timeDifferenceMs = eventCutOffDate - currentDate;

            const hours = Math.floor(timeDifferenceMs / 3600000);
            const minutes = Math.floor((timeDifferenceMs % 3600000) / 60000);
            const seconds = Math.floor((timeDifferenceMs % 60000) / 1000);
            setCutoff({
                days: Math.floor(hours / 24),
                hours: hours % 24,
                minutes: minutes < 10 ? "0" + minutes : minutes,
                seconds: seconds < 10 ? "0" + seconds : seconds
            })


        }, 1000);

        return () => clearInterval(intervalId);
    }, [data]);

    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', async () => {


            const result2 = await AsyncStorage.getItem('CorpState')
            const result = await AsyncStorage.getItem('firstName')
            setName(result ?? "User")

            // if (result2 != null && result2 == "1") fetchDashboard()
            // else
         fetchDashboard(result2)


            // fetchDashboard()
        }
        );

        return unsubscribe;
    }, []);


    return (

        <authContext.Consumer>
            {({ userId, setUserId, corpCode }) => (

                <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                    {/* <ScrollView> */}
                    {/* <View style={{ height: '100%' }}> */}

                    <Image source={assets.eventsEllipse} style={{ width: '100%', resizeMode: 'cover', position: 'absolute', top: 0, height: '40%' }} />
                    <View style={{ flexDirection: 'row', marginTop: '15%', width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Text
                                style={{
                                    fontSize: SIZES.large,
                                    fontFamily: FONTS.bold,
                                    color: COLORS.white,
                                    textAlign: 'left',
                                }}
                            >
                                Hello {name}!
                            </Text>

                            <Image source={assets.wavingHand} style={{ width: 32, height: 32, resizeMode: 'contain', marginLeft: 8 }} />
                        </View>

                        <Image source={assets.profile} style={{ width: 42, height: 42, resizeMode: 'contain', borderRadius: 24, borderWidth: 3, borderColor: 'white' }} />


                    </View>

                    <Text
                        style={{
                            fontSize: SIZES.medium,
                            fontFamily: FONTS.regular,
                            color: COLORS.white,
                            textAlign: 'left',
                            width: '90%',
                            alignSelf: 'center',
                            marginTop: 8
                        }}
                    >
                        Let’s run together to power the society
                    </Text>

                    <View style={{ flexDirection: 'row', alignSelf: 'center', width: '90%', marginTop: 12 }}>
                        <Ionicons name="location-sharp" size={24} color="white" />
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.regular,
                                color: COLORS.white,
                                textAlign: 'left',
                                marginLeft: 8,
                                maxWidth: '90%'
                            }}
                        >
                            {data.event_info.event_location}
                        </Text>
                    </View>

                    <View style={{ width: '90%', borderRadius: 16, backgroundColor: 'white', padding: 12, alignSelf: 'center', marginTop: 24, justifyContent: 'center' }}>
                        <Text
                            style={{
                                fontSize: SIZES.large,
                                fontFamily: FONTS.extraBold,
                                color: COLORS.blue,
                                textAlign: 'center',
                                width: '90%',
                                alignSelf: 'center',
                                marginTop: 8
                            }}
                        >
                            {data.event_info.event_name ?? "APR Marathon"} Invites YOU!
                        </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.grey,
                                    textAlign: 'left',
                                }}
                            >
                                Registration closes in
                            </Text>


                            {cutoff.days != NaN && <Text
                                style={{
                                    fontSize: SIZES.medium,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.black,
                                    textAlign: 'right',
                                }}
                            >
                                {cutoff.days ?? 0} days, {cutoff.hours ?? "00"}:{cutoff.minutes ?? "00"}:{cutoff.seconds ?? "00"}
                            </Text>}
                        </View>

                        <View style={{ marginTop: 12 }}>
                            <View style={{ borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: 4, height: 8, width: '100%', position: 'absolute' }}></View>
                            <View style={{ backgroundColor: COLORS.red, borderRadius: 4, height: 8, width: `${data.percentage ?? "1"}%`, position: 'absolute' }}></View>

                        </View>

                    </View>

                    {/* </View> */}
                    <Text
                        style={{
                            fontSize: SIZES.medium,
                            fontFamily: FONTS.semiBold,
                            color: COLORS.black,
                            textAlign: 'left',
                            marginLeft: 24,
                            marginTop: 24
                        }}
                    >
                        Upcoming Events
                    </Text>

                    <ScrollView>
                        <>
                            {data.registrant_type.map((ele, inx) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("EventDescription", { ...data, ...ele, userId: userId })
                                        }}
                                        style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop: 16, alignItems: 'center' }}>
                                        <Image source={{ uri: ele.image_url }} style={{ height: Dimensions.get('window').width * 0.2, width: Dimensions.get('window').width * 0.25, resizeMode: 'cover', alignItems: 'center', borderRadius: 6 }} />
                                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 16 }}>
                                            <Text
                                                style={{
                                                    fontSize: SIZES.medium,
                                                    fontFamily: FONTS.semiBold,
                                                    color: COLORS.black,
                                                    textAlign: 'left',
                                                    marginLeft: 8,
                                                }}
                                            >
                                                {ele.type_name.substring(0, 1).toUpperCase()}{ele.type_name.substring(1, ele.type_name.length)}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: SIZES.font,
                                                    fontFamily: FONTS.regular,
                                                    color: COLORS.grey,
                                                    textAlign: 'left',
                                                    marginLeft: 8,
                                                    marginTop: 2
                                                }}
                                            >
                                                {data.eventDate ?? "NA"}
                                            </Text>

                                            <Text
                                                style={{
                                                    fontSize: SIZES.font,
                                                    fontFamily: FONTS.semiBold,
                                                    color: COLORS.blue,
                                                    textAlign: 'left',
                                                    marginLeft: 8,
                                                    marginTop: 2
                                                }}
                                            >
                                                {ele.run_category ?? ""}
                                            </Text>

                                        </View>
                                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ alignSelf: 'center', position: 'absolute', right: 12 }} />
                                    </TouchableOpacity>
                                )
                            })}



                        </>
                    </ScrollView>


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

export default Events