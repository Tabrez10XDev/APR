import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton } from '../../ui components/Buttons';
import axios from 'axios';
import authContext from '../../../contants/authContext';
import { StackActions, useTheme } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react-native';


const EventDescription = ({ route, navigation }) => {
    const data = route.params
    const [modalVisible, setModalVisible] = useState(false);



    const [animSpeed, setAnimSpeed] = useState(false)
    const animRef = useRef()

    const ROUTE_IMAGES = ["https://res.cloudinary.com/dkmzwubep/image/upload/v1698330296/apr-website-images-frontend/2022_1kroute_1_zhwpaa.jpg", "https://res.cloudinary.com/dkmzwubep/image/upload/v1698330297/apr-website-images-frontend/2022_5kroute_1_pv1qrf.jpg", "https://res.cloudinary.com/dkmzwubep/image/upload/v1698330297/apr-website-images-frontend/2022_10kroute_1_hfffze.jpg"]
    const [currentImg, setCurrentImg] = useState(ROUTE_IMAGES[0])

    function playAnimation() {
        setAnimSpeed(true)
    } https://res.cloudinary.com/dkmzwubep/image/upload/v1698330297/apr-website-images-frontend/2022_10kroute_1_hfffze.jpg


    useEffect(() => {
        setTimeout(() => {
            animRef.current?.play();
        }, 100)
    }, [animSpeed])


    function pauseAnimation() {
        setAnimSpeed(false)
    }

    async function joinNow() {
        playAnimation()
        axios.post(`${CONST.baseUrlRegister}api/registration/registration/data`, {
            registrant_id: parseInt(data.userId),
            registrant_type_id: data.type_id
        })
        .then((response) => {
            let towers = []
            let phases = []
            response.data.tower_details.map((ele, inx) => {
                towers.push({ label: ele.tower_number, value: ele.tower_number, blocks: ele.block })

            })
            let classes = []
            response.data.registrant_class.map((ele, inx) => {
                let temp = {}
                if (ele.runners_allowed_count !== null && data.type_id == 1) temp['label'] = ele.category_name + " - " + ele.runners_allowed_count + " Persons" + " ( Rs." + ele.category_price + ")"
                else temp['label'] = ele.category_name + " - " + " ( Rs." + ele.category_price + " )"
                temp['count'] = ele.runners_allowed_count

                temp['value'] = ele.category_id
                classes.push(temp)
            })
            
            // if(data.type_id == 1){
            //     console.log("One");
            //     response.data.registrant_class["marathon runners"].map((ele, inx) => {
            //         let temp = {}
            //         if (ele.runners_allowed_count !== null) temp['label'] = ele.category_name + " - " + ele.runners_allowed_count + " Persons" + " ( Rs." + ele.category_price + ")"
            //         else temp['label'] = ele.category_name + " - " + " ( Rs." + ele.category_price + " )"
            //         temp['value'] = ele.category_id
            //         classes.push(temp)
            //     })
            // }
            // else if(data.type_id == 2){
            //     console.log("Two");
            //     response.data.registrant_class["donors with runners"].map((ele, inx) => {
            //         let temp = {}
            //         if (ele.runners_allowed_count !== null) temp['label'] = ele.category_name + " - " + ele.runners_allowed_count + " Persons" + " ( Rs." + ele.category_price + ")"
            //         else temp['label'] = ele.category_name + " - " + " ( Rs." + ele.category_price + " )"
    
            //         temp['value'] = ele.category_id
            //         classes.push(temp)
            //     })
            // }
            // else if(data.type_id == 3){
            //     console.log("Three");
            //     response.data.registrant_class["donate"].map((ele, inx) => {
            //         let temp = {}
            //         if (ele.runners_allowed_count !== null) temp['label'] = ele.category_name + " - " + ele.runners_allowed_count + " Persons" + " ( Rs." + ele.category_price + ")"
            //         else temp['label'] = ele.category_name + " - " + " ( Rs." + ele.category_price + " )"
    
            //         temp['value'] = ele.category_id
            //         classes.push(temp)
            //     })
            // }
        

            let _run_category = []
            response.data.run_category.map((ele) => {
                _run_category.push({
                    label: ele.race_type_name,
                    value: ele.race_type_id
                })
            })

            console.log(JSON.stringify(response.data));

            navigation.navigate("AddRegistrant", { ...response.data, run_category: _run_category, towers: towers, phases: phases, classes: classes, typeName: data.type_name })

        })
        .catch((err) => {
            console.error("Error")
            console.log(err.response.data)
        }).finally(() => {
            pauseAnimation()
        })
    }

    async function corpJoinNow() {

        console.log({
            registrant_id: parseInt(data.userId),
            registrant_type_id: data.type_id
        });
        playAnimation()
        axios.post(`${CONST.baseUrlRegister}api/corporate/registration/data/runner`, {
            registrant_id: data.userId,
            registrant_type_id: data.type_id
        }).then((response) => {
            pauseAnimation()
            let towers = []
            let phases = []
            response.data.tower_details.map((ele, inx) => {
                towers.push({ label: ele.tower_number, value: ele.tower_number, blocks: ele.block })

            })
            let classes = []
            response.data.registrant_class.map((ele, inx) => {
                let temp = {}
                if (ele.runners_allowed_count !== null) temp['label'] = ele.category_name + " - " + ele.runners_allowed_count + " Persons" + " ( Rs." + ele.category_price + ")"
                else temp['label'] = ele.category_name + " - " + " ( Rs." + ele.category_price + " )"
                temp['count'] = ele.runners_allowed_count
                temp['value'] = ele.category_id
                classes.push(temp)
            })

            let _run_category = []
            response.data.run_category.map((ele) => {
                _run_category.push({
                    label: ele.race_type_name,
                    value: ele.race_type_id
                })
            })

            const _data = { ...response.data, run_category: _run_category, towers: towers, phases: phases, classes: classes, typeName: data.type_name }

            let _stateArray = [{}]

            navigation.navigate("AddCorpRunner", {
                current: 0, total: _stateArray.length, stateArray: _stateArray, param: _data
            })

        }).catch((err) => {
            console.log(err);
            pauseAnimation()
        })
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

    const _eventDate = data.event_info.event_date
    const _eventTime = data.event_info.event_time ? data.event_info.event_time.substring(11, 16) : ""
    const eventDate = _eventDate.substring(8, 10) + ", " + monthMap[_eventDate.substring(5, 7) - 1] + " " + _eventDate.substring(0, 4) + " | at " + _eventTime

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
                            Event Description
                        </Text>
                    </View>



                    <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ paddingBottom: '80%' }}>


                        <View style={{ width: '95%', padding: 8, borderRadius: 16, borderWidth: 1, borderColor: '#D9D9D9', alignSelf: 'center', marginTop: 16, alignItems: 'center', height: '20%', justifyContent: 'space-evenly' }}>
                            <Image source={{ uri: data.image_url }} style={{ width: '100%', borderRadius: 8, height: '50%', resizeMode: 'cover' }} />
                            <Text
                                style={{
                                    fontSize: SIZES.large,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.black,
                                    textAlign: 'center',
                                    marginTop: 4
                                }}
                            >
                                {data.type_name}
                            </Text>


                            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '95%', marginTop: 4 }}>
                                <AntDesign name="clockcircle" size={18} color="blue" />
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginLeft: 8,
                                    }}
                                >
                                    {eventDate}
                                </Text>
                            </View>


                            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '96%', marginTop: 6 }}>
                                <Ionicons name="location-sharp" size={24} color="blue" />
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginLeft: 8,
                                    }}
                                >
                                    {data.event_info.event_location}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop: 24, justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Image source={assets.profile} style={{ width: 42, height: 42, resizeMode: 'cover', borderWidth: 3, borderColor: 'white', borderRadius: 32, position: 'absolute', left: 0 }} />
                            <Image source={assets.profile} style={{ width: 42, height: 42, resizeMode: 'cover', borderWidth: 3, borderColor: 'white', borderRadius: 32, position: 'absolute', left: 24, zIndex: 2 }} />
                            <Image source={assets.profile} style={{ width: 42, height: 42, resizeMode: 'cover', borderWidth: 3, borderColor: 'white', borderRadius: 32, position: 'absolute', left: 48, zIndex: 3 }} />
                            <Image source={assets.profile} style={{ width: 42, height: 42, resizeMode: 'cover', borderWidth: 3, borderColor: 'white', borderRadius: 32, position: 'absolute', left: 72, zIndex: 4 }} />
                            <Image source={assets.profile} style={{ width: 42, height: 42, resizeMode: 'cover', borderWidth: 3, borderColor: 'white', borderRadius: 32, position: 'absolute', left: 96, zIndex: 5 }} />
                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.black,
                                    textAlign: 'right',
                                    alignSelf: 'center'
                                }}
                            >
                                {data.registrant_count.registrant_count}+ people are interested
                            </Text>
                        </View>

                        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', marginTop: 16 }}>
                            <View>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.bold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginBottom: 4
                                    }}
                                >
                                    Race
                                </Text>
                                {data.race_timing.map((ele, inx) => {
                                    return (

                                        ele.timing == undefined ?
                                            <Text
                                                style={{
                                                    fontSize: SIZES.font,
                                                    fontFamily: FONTS.semiBold,
                                                    color: COLORS.black,
                                                    textAlign: 'left',
                                                    marginTop: 6
                                                }}
                                            >
                                                {data.raceCategories[ele.race_type_id_ref]} - {data.ageCategories[ele.age_type_id_ref]} Years
                                            </Text> : ele.timing.map((item, inx) => {
                                                return (
                                                    <Text
                                                        style={{
                                                            fontSize: SIZES.font,
                                                            fontFamily: FONTS.semiBold,
                                                            color: COLORS.black,
                                                            textAlign: 'left',
                                                            marginTop: 6
                                                        }}
                                                    >
                                                        {data.raceCategories[item.race_type_id_ref]} - {data.ageCategories[item.age_type_id_ref]} Years
                                                    </Text>
                                                )
                                            })

                                    )
                                })}
                            </View>

                            <View>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.bold,
                                        color: COLORS.black,
                                        textAlign: 'right',
                                        marginBottom: 4

                                    }}
                                >
                                    Time
                                </Text>
                                {data.race_timing.map((ele, inx) => {
                                    return (

                                        ele.timing == undefined ?
                                            <Text
                                                style={{
                                                    fontSize: SIZES.font,
                                                    fontFamily: FONTS.semiBold,
                                                    color: COLORS.black,
                                                    textAlign: 'right',
                                                    marginTop: 6
                                                }}
                                            >
                                                {ele.race_time.substring(11, 16)}
                                            </Text> : ele.timing.map((item, inx) => {
                                                return (
                                                    <Text
                                                        style={{
                                                            fontSize: SIZES.font,
                                                            fontFamily: FONTS.semiBold,
                                                            color: COLORS.black,
                                                            textAlign: 'right',
                                                            marginTop: 6
                                                        }}
                                                    >
                                                        {item.race_time.substring(11, 16)}
                                                    </Text>
                                                )
                                            })

                                    )
                                })}
                            </View>



                        </View>

                        <View style={{ width: '90%', alignSelf: 'center' }}>


                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', marginTop: 16 }}>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: SIZES.font,
                                            fontFamily: FONTS.bold,
                                            color: COLORS.black,
                                            textAlign: 'left',
                                            marginBottom: 4
                                        }}
                                    >
                                        Race Class
                                    </Text>
                                    {data.class_price.filter(curr => curr.registrant_type_id_ref == route.params.registrant_type_id_ref).map((ele, inx) => {
                                        return (
                                            <Text style={{
                                                fontSize: SIZES.font,
                                                fontFamily: FONTS.semiBold,
                                                color: COLORS.black,
                                                textAlign: 'left',
                                                marginTop: 6
                                            }}>
                                                {ele.category_name}
                                            </Text>
                                        )
                                    })}
                                </View>

                            {!data.type_name.toLowerCase().includes("donate") &&    <View>
                                    <Text
                                        style={{
                                            fontSize: SIZES.font,
                                            fontFamily: FONTS.bold,
                                            color: COLORS.black,
                                            textAlign: 'left',
                                            marginBottom: 4
                                        }}
                                    >
                                        Person(s)
                                    </Text>
                                    {data.class_price.filter(curr => curr.registrant_type_id_ref == route.params.registrant_type_id_ref).map((ele, inx) => {
                                        return (
                                            <Text style={{
                                                fontSize: SIZES.font,
                                                fontFamily: FONTS.semiBold,
                                                color: COLORS.black,
                                                textAlign: 'center',
                                                marginTop: 6
                                            }}>
                                                {ele.runners_allowed_count}
                                            </Text>
                                        )
                                    })}
                                </View>}

                                <View>
                                    <Text
                                        style={{
                                            fontSize: SIZES.font,
                                            fontFamily: FONTS.bold,
                                            color: COLORS.black,
                                            textAlign: 'right',
                                            marginBottom: 4

                                        }}
                                    >
                                        Prize
                                    </Text>
                                    {data.class_price.filter(curr => curr.registrant_type_id_ref == route.params.registrant_type_id_ref).map((ele, inx) => {
                                        return (

                                            <Text style={{
                                                fontSize: SIZES.font,
                                                fontFamily: FONTS.semiBold,
                                                color: COLORS.black,
                                                textAlign: 'right',
                                                marginTop: 6
                                            }}>
                                                {ele.category_price} ₹
                                            </Text>
                                        )
                                    })}
                                </View>



                            </View>


                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.bold,
                                    color: COLORS.black,
                                    textAlign: 'left',
                                    marginTop: 12,

                                }}
                            >
                                Race Instructions
                            </Text>
                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.regular,
                                    color: COLORS.black,
                                    textAlign: 'justify',
                                    marginTop: 8
                                }}
                            >
                                {data.event_info.race_instruction}
                            </Text>


                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.bold,
                                    color: COLORS.black,
                                    textAlign: 'left',
                                    marginTop: 12,

                                }}
                            >
                                Parking Instructions
                            </Text>
                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.regular,
                                    color: COLORS.black,
                                    textAlign: 'justify',
                                    marginTop: 8
                                }}
                            >
                                {data.event_info.parking_instruction}
                            </Text>
                        </View>

                        <View style={{ width: '90%', alignSelf: 'center' }}>
                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.bold,
                                    color: COLORS.black,
                                    textAlign: 'left',
                                    marginTop: 12,

                                }}
                            >
                                Spot Registrations
                            </Text>

                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.regular,
                                    color: COLORS.black,
                                    textAlign: 'left',
                                    marginTop: 4,

                                }}
                            >
                                {data.event_info.is_spot_registration_avail ? "Spot Registrations are availablle" : "No Spot Registrations"}
                            </Text>

                            <Text
                                style={{
                                    fontSize: SIZES.font,
                                    fontFamily: FONTS.bold,
                                    color: COLORS.black,
                                    textAlign: 'left',
                                    marginTop: 12,

                                }}
                            >
                                Race Routes
                            </Text>
                            <View style={{ flexWrap: 'wrap', width: '100%', flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
                                {
                                    data.raceCategory.map((ele) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (ele.race_type_name.toLowerCase() == "1k") setCurrentImg(ROUTE_IMAGES[0])
                                                    else if (ele.race_type_name.toLowerCase() == "5k") setCurrentImg(ROUTE_IMAGES[1])
                                                    else if (ele.race_type_name.toLowerCase() == "10k") setCurrentImg(ROUTE_IMAGES[2])

                                                    setModalVisible(!modalVisible)
                                                }}
                                                style={{ height: 45, width: '30%', borderRadius: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCB0B0', marginTop: 6 }}>
                                                <Text
                                                    style={{
                                                        fontSize: SIZES.medium,
                                                        fontFamily: FONTS.semiBold,
                                                        color: COLORS.black,
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {ele.race_type_name.toUpperCase()} Route
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }




                            </View>
                        </View>

                        <View style={{ width: '90%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', alignSelf: 'center', marginTop: 12 }}>
                           {data.min_price !== 0 && <View>
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.regular,
                                        color: COLORS.black,
                                        textAlign: 'center',
                                    }}
                                >
                                    Starting From
                                </Text>
                                <Text
                                    style={{
                                        fontSize: SIZES.large,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.black,
                                        textAlign: 'center',
                                    }}
                                >
                                    ₹ {data.min_price}/-
                                </Text>
                            </View>}

                            <RectButton onClick={() => {
                                if (corpCode) corpJoinNow()
                                else joinNow()
                            }} text={"Join Now"} width={"45%"} />

                        </View>

                    </ScrollView>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                    
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={{ width: '100%', position: 'absolute', top: '0%', alignSelf: 'center', alignItems:'center', justifyContent:'center'
                     }}>
                            <Image source={{ uri: currentImg }} style={{ height: Dimensions.get('window').height * 0.9, width: Dimensions.get('window').width * 1, resizeMode: 'contain', alignSelf: 'center', borderRadius: 6 }} />

                            <Pressable
                                style={{ position: 'absolute', top: 48, right: 24 }}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <AntDesign name="close" size={24} color="black" />
                            </Pressable>
                        </View>
                    </Modal>

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


export default EventDescription
