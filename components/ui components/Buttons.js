import * as React from "react";
import { COLORS, SIZES, FONTS, assets } from "../../contants";

import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    Modal,
    ScrollView,
    Image,
    TextInput,
} from "react-native";




export const RectButton = ({ text, onClick, hide, ...props }) => {

    return (
        hide ? null :
            <TouchableOpacity
                style={{ height: 48, backgroundColor: COLORS.blue, justifyContent: 'center', alignItems: 'center', width: '90%', borderRadius: 6, marginTop: 16, ...props }}
                onPress={() => { onClick() }}
            >

                <Text style={{
                    color: COLORS.white, fontSize: 18, fontFamily: FONTS.semiBold,
                }}>{text}</Text>
            </TouchableOpacity>)
}

export const GSignInButton = ({onClick,text, ...props}) => {
    return (<TouchableOpacity
        style={{ ...props,height: 48, justifyContent: 'center', alignItems: 'center', width: '90%', borderRadius: 8, marginTop:12, borderWidth:1, borderColor:COLORS.blue, borderStyle:'dashed' }}
        onPress={()=>{onClick()}}
    >

<View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

        <Image
        style={{height:24, width:24, marginEnd:8}}
        source={assets.google}
        />

        <Text style={{ color: COLORS.black, fontSize: SIZES.medium, fontWeight: FONTS.semiBold }}>{text}</Text>
        </View>

    </TouchableOpacity>)
}







