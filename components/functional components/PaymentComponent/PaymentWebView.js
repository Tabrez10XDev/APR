import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';
import { View } from 'react-native';

const PaymentWebView = ({ route }) => {
    return (
        <SafeAreaView style={{height:'100%', width:'100%', backgroundColor:'white'}}>

            <WebView source={{ uri: route.params.instrumentResponse.redirectInfo.url }} style={{ flex: 1, height: '100%', width: '100%',}} />
            </SafeAreaView>

    )
}

export default PaymentWebView