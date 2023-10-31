import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useRef } from "react";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import LoginScreen from './components/functional components/AuthComponent/LoginScreen';
import SignUpScreen from './components/functional components/AuthComponent/SignupScreen';
import Trial from './components/functional components/Trial';

import { COLORS } from './contants';
import OTPScreen from './components/functional components/AuthComponent/OTPScreen';
import Events from './components/functional components/EventsComponent/Events';
import EventDescription from './components/functional components/EventsComponent/EventDescription';
import MySchedule from './components/functional components/ScheduleComponent/MySchedule';
import AddRegistrant from './components/functional components/EventsComponent/AddRegistrant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddRunners from './components/functional components/EventsComponent/AddRunners';
import authContext from './contants/authContext';
import MasterList from './components/functional components/EventsComponent/MasterList';
import ProfileScreen from './components/functional components/ProfileComponent/ProfileScreen';
import ValidatePayment from './components/functional components/PaymentComponent/ValidatePayment';
import BookingConfirmed from './components/functional components/PaymentComponent/BookingConfirmed';
import CreateOrder from './components/functional components/EventsComponent/CreateOrder';
import MobileVerification from './components/functional components/AuthComponent/MobileVerification';

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
  const [userId, setUserId] = useState("-1")
  const [corpCode, setCorpCode] = useState(false)

  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    try {

      const result = await AsyncStorage.getItem('AuthState')
      if (result !== null && result != "-1" && result != undefined) {
        setAuth(true)
        setUserId(result)
      } else {
        setUserId("-1")
        setAuth(false)
      }

      const result2 = await AsyncStorage.getItem('CorpState')
      if(result2 != null && result2 == "1") setCorpCode(true)


    } catch (e) {
      console.error(e)
    }
  }


  const [loaded] = useFonts({
    SFProExtraBold: require("./assets/fonts/OpenSans-ExtraBold.ttf"),
    SFProBold: require("./assets/fonts/OpenSans-Bold.ttf"),
    SFProSemiBold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
    SFProMedium: require("./assets/fonts/OpenSans-Medium.ttf"),
    SFProRegular: require("./assets/fonts/OpenSans-Regular.ttf"),
  })

  const saveAuth = async (id) => {
    try {
      await AsyncStorage.setItem('AuthState', id)
    } catch (err) {
      alert(err)
    }
  }


  const finishAuth = () => {
    getData()
    setAuth(true)
  }

  const logout = () => {
    saveAuth("-1")
    setAuth(false)
  }

  if (!loaded) {
    return null;
  }

  const TabNav = () => {
    return (
      <Tab.Navigator theme={theme} screenOptions={{ headerShown: false, tabBarActiveTintColor: COLORS.blue, tabBarInactiveTintColor: COLORS.greenAccent, backgroundColor: "white" }}>

        <Tab.Screen name={"Events"} component={Events} options={{ tabBarIcon: ({ focused, color }) => { return (<Feather name='calendar' size={24} color={focused ? COLORS.blue : COLORS.greenAccent} />) } }} />
        <Tab.Screen name={"My Schedule"} component={MySchedule} options={{ tabBarIcon: ({ focused, color }) => { return (<Feather name='clock' size={24} color={focused ? COLORS.blue : COLORS.greenAccent} />) } }} />
        <Tab.Screen name={"Settings"} initialParams={{ logout: logout }} component={ProfileScreen} options={{ tabBarIcon: ({ focused, color }) => { return (<Feather name='settings' size={24} color={focused ? COLORS.blue : COLORS.greenAccent} />) } }} />

      </Tab.Navigator>
    )
  }

  return (
    <RootSiblingParent>
      <authContext.Provider
        value={{ userId, setUserId, corpCode }}
      >
        <NavigationContainer>
          {
            auth ? (

              <Stack.Navigator theme={theme} screenOptions={{ headerShown: false }} initialRouteName="Dashboard">

                <Stack.Group screenOptions={{ headerStyle: { backgroundColor: COLORS.white } }}  >

                  <Stack.Screen name="Home" component={TabNav} />

                  <Stack.Screen name="EventDescription" component={EventDescription} />
                  <Stack.Screen name="AddRegistrant" component={AddRegistrant} />
                  <Stack.Screen name="AddRunners" component={AddRunners} />
                  <Stack.Screen name="MasterList" component={MasterList} />
                  <Stack.Screen name="CreateOrder" component={CreateOrder} />
                  <Stack.Screen name="ValidatePayment" component={ValidatePayment} />
                  <Stack.Screen name="BookingConfirmed" component={BookingConfirmed} />
                  
                </Stack.Group>
              </Stack.Navigator>

            ) :
              (
                <Stack.Navigator theme={theme} screenOptions={{ headerShown: false }} initialRouteName="Landing">

                  <Stack.Group screenOptions={{ headerStyle: { backgroundColor: COLORS.white } }}  >




                    <Stack.Screen name="LoginScreen" component={LoginScreen} initialParams={{ finishAuth: finishAuth }} />

                    <Stack.Screen name="SignUpScreen" component={SignUpScreen} initialParams={{ finishAuth: finishAuth }} />

                    <Stack.Screen name="MobileVerification" component={MobileVerification} initialParams={{ finishAuth: finishAuth }} />


                    <Stack.Screen name="OTPScreen" component={OTPScreen} initialParams={{ finishAuth: finishAuth }} />

                    {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} initialParams={{ finishAuth: finishAuth }} /> */}










                  </Stack.Group>
                </Stack.Navigator>

              )
          }
        </NavigationContainer>
      </authContext.Provider>
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
