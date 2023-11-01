import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { COLORS, SIZES, FONTS } from "../../contants";



import { TextInput } from "@react-native-material/core";

import {
    Text,
    View,
    Image,
    Dimensions,
    Pressable,
    TouchableOpacity,
    StyleSheet,
    ScrollView,


} from "react-native";

import RBSheet from "react-native-raw-bottom-sheet";


export default BillingInfoBottomSheet = ({ refRBSheet, billingAddress, setBillingAddress }) => {


    const [name, setName] = useState("")
    const [state, setState] = useState({})


    // const 








    return (


        <RBSheet
            ref={refRBSheet}
            height={Dimensions.get("window").height * 0.70}
            openDuration={5}
            closeOnDragDown={true}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                container: {
                    borderTopStartRadius: 20,
                    borderTopEndRadius: 20,
                    backgroundColor: COLORS.white,
                }
            }}
        >

            <View style={{
                width: '100%',
                backgroundColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                paddingHorizontal: 16,
                borderTopStartRadius: 20,
                borderTopEndRadius: 20

            }}>


                <Text
                    style={{
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontSize: SIZES.large,
                        fontFamily: FONTS.semiBold,
                        color: COLORS.black,
                    }}
                >
                    Edit Billing Info
                </Text>

            </View>


            <View style={{
                flexDirection: 'column', marginTop: 0, width: '100%', paddingHorizontal: 16,
            }}>


                <TextInput
                    variant="outlined"
                    label="Name"
                    textContainerStyle={{}}
                    style={{ borderRadius: 8, marginTop: SIZES.smallFont, height: 60, color: COLORS.blue }}
                    color={COLORS.textInput}
                    value={state.name}
                    onChangeText={(text) => { setState(current => ({ ...current, name: text })) }}

                />


                <TextInput
                    variant="outlined"
                    label="Address"
                    textContainerStyle={{ height: 180, padding: 12, alignItems:'center', justifyContent:'center' }}
                    inputContainerStyle={{height:180, paddingVertical:8}}
                    style={{ borderRadius: 8, marginTop: SIZES.smallFont, color: COLORS.blue }}
                    color={COLORS.textInput}
                    value={billingAddress ?? ""}
                    editable
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => { setBillingAddress(text) }}

                />

                <TextInput
                    variant="outlined"
                    label="Number"
                    textContainerStyle={{}}
                    style={{ borderRadius: 8, marginTop: SIZES.smallFont, height: 60, color: COLORS.blue }}
                    color={COLORS.textInput}
                    value={state.number}
                    keyboardType="numeric"
                    onChangeText={(text) => { setState(current => ({ ...current, number: text })) }}

                />













                <TouchableOpacity
                    style={{ alignSelf: 'center', height: 48, backgroundColor: COLORS.blue, justifyContent: 'center', alignItems: 'center', width: '80%', borderRadius: 8, marginTop: 24 }}
                    onPress={() => {
                        refRBSheet.current.close()
                    }}
                >

                    <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: FONTS.medium }}>Close</Text>
                </TouchableOpacity>
            </View>




        </RBSheet>

    )
}

