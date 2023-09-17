import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useRef } from "react";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Trial from './components/functional components/Trial';
import { Feather } from '@expo/vector-icons';
import LoginScreen from './components/functional components/AuthComponent/LoginScreen';
import SignUpScreen from './components/functional components/AuthComponent/SignupScreen';
import { COLORS } from './contants';
import OTPScreen from './components/functional components/AuthComponent/OTPScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colour: {
    ...DefaultTheme.colors,
    background: "white"
  }
}


export default function App() {

  const [auth, setAuth] = useState(false)

  const [loaded] = useFonts({
    SFProExtraBold: require("./assets/fonts/OpenSans-ExtraBold.ttf"),
    SFProBold: require("./assets/fonts/OpenSans-Bold.ttf"),
    SFProSemiBold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
    SFProMedium: require("./assets/fonts/OpenSans-Medium.ttf"),
    SFProRegular: require("./assets/fonts/OpenSans-Regular.ttf"),
  })

  const finishAuth = () => {
    setAuth(true)
  }

  if (!loaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
      {
        auth ? (
          <Tab.Navigator theme={theme} screenOptions={{ headerShown: false, tabBarActiveTintColor: COLORS.blue, tabBarInactiveTintColor: COLORS.greenAccent, backgroundColor:"white" }}>
            
            <Tab.Screen name={"Events"} component={Trial} options={{ tabBarIcon: ({ focused, color }) => { return (<Feather name='calendar' size={24} color={focused ? COLORS.blue : COLORS.greenAccent} />) } }} />
            <Tab.Screen name={"My Schedule"} component={Trial} options={{ tabBarIcon: ({ focused, color }) => { return (<Feather name='clock' size={24} color={focused ? COLORS.blue : COLORS.greenAccent} />) } }} />
            <Tab.Screen name={"Settings"} component={Trial} options={{ tabBarIcon: ({ focused, color }) => { return (<Feather name='settings' size={24} color={focused ? COLORS.blue : COLORS.greenAccent} />) } }} />

          </Tab.Navigator>

        ) :
          (
            <Stack.Navigator theme={theme} screenOptions={{ headerShown: false }} initialRouteName="Landing">

              <Stack.Group screenOptions={{ headerStyle: { backgroundColor: COLORS.white } }}  >
                  



                      <Stack.Screen name="LoginScreen" component={LoginScreen} initialParams={{ finishAuth: finishAuth }}/>

                      <Stack.Screen name="SignUpScreen" component={SignUpScreen} initialParams={{ finishAuth: finishAuth }} />


                      {/* <Stack.Screen name="MobileVerificationScreen" component={MobileVerificationScreen} initialParams={{ finishAuth: finishAuth, setCurr: setCurr }} /> */}

                      <Stack.Screen name="OTPScreen" component={OTPScreen} initialParams={{ finishAuth: finishAuth }} />

                      {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} initialParams={{ finishAuth: finishAuth }} /> */}







                  

                
              </Stack.Group>
            </Stack.Navigator>

           )
        }
      </NavigationContainer>
      </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
