import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';
import { View } from 'react-native';
import { RectButton } from '../../ui components/Buttons';
import { StackActions, useTheme } from '@react-navigation/native';

const PaymentWebView = ({ route, navigation }) => {
    return (
        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>

            <WebView source={{ uri: route.params.instrumentResponse.redirectInfo.url }} style={{ flex: 1, height: '95%', width: '100%', }} />
            <RectButton height={'5%'} text={"Go Home"} alignSelf={'center'} onClick={() => {
                navigation.dispatch(StackActions.popToTop());
            }} />
        </SafeAreaView>

    )
}

export default PaymentWebView