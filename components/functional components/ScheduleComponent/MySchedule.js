import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const MySchedule = () => {


    const [stackIndex, setStackIndex] = useState(1);


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

            </View>


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