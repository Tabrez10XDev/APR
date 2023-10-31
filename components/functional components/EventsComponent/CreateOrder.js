import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton } from '../../ui components/Buttons';
import axios from 'axios';
import authContext from '../../../contants/authContext';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CreateOrder = ({ navigation, route }) => {
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
                        {/* <TouchableOpacity style={{ width: 36, height: 36, position: 'absolute', left:24 }}>
                            <Ionicons name="chevron-back" size={24} color="black" />
                        </TouchableOpacity> */}
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
                            Order Summary
                        </Text>
                    </View>




                </View>
            )
            }
        </authContext.Consumer>
    )
}


export default CreateOrder