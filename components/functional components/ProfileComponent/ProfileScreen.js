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
import Toast from 'react-native-toast-message';

const ProfileScreen = ({route,navigation})=>{
    return(
        <View style={{backgroundColor:'white', width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}>

            <RectButton text={"Logout"} onClick={()=>route.params.logout()}/>
        </View>
    )
}

export default ProfileScreen