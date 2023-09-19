import * as React from "react";

import {
    View,
    Modal,

} from "react-native";

import { COLORS} from "../../contants";
import DatePicker from 'react-native-modern-datepicker';
import { RectButton } from "../ui components/Buttons";

export default DatePickerModal = ({ modalVisible, setModalVisible, setSelectedDate, minDate, maxDate }) => {

    // const [modalVisible, setModalVisible] = useState(true);

    return (
        <Modal
            
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            presentationStyle='overFullScreen'
            
            onRequestClose={() => {
                  setModalVisible(!modalVisible);
            }}
            
                
        >
            
            <View style={{
                alignSelf: 'center', position: 'absolute', top: '30%', borderRadius: 10, width: '90%',
                padding:4, backgroundColor:'#000000CC',           
            }}>
                <DatePicker
                options={{
                    backgroundColor: COLORS.almostBlack,
                    textHeaderColor: COLORS.white,
                    textDefaultColor: COLORS.white,
                    selectedTextColor: COLORS.blue,
                    mainColor: COLORS.white,
                    textSecondaryColor: COLORS.white,
                    borderColor: 'rgba(122, 146, 165, 0.1)',
                }}
                    minimumDate={minDate}
                    maximumDate={maxDate}
                    mode="calendar"
                    style={{ 
                        borderTopLeftRadius: 10,
                        borderTopRightRadius:10
                     }}
                    onSelectedChange={date => setSelectedDate(date)}


                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor:COLORS.almostBlack, borderBottomEndRadius:10, borderBottomStartRadius:10, marginTop:-12, padding:12 }}>
                    <RectButton text={"Cancel"} onClick={() => { setModalVisible(!modalVisible) }} width={"40%"} backgroundColor={COLORS.bankAccent} />
                    <RectButton text={"Confirm"} onClick={() => { setModalVisible(!modalVisible) }} width={"40%"} backgroundColor={COLORS.bankAccent}/>

                </View>

            </View>



        </Modal>
    )
}

