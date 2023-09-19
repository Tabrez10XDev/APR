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

  useEffect(()=>{
    getData()
  },[])


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
    setAuth(true)
  }

  const logout = () => {
    saveAuth("-1")
    setAuth(false)
  }

  if (!loaded) {
    return null;
  }

  const TabNav = ()=>{
    return(
      <Tab.Navigator theme={theme} screenOptions={{ headerShown: false, tabBarActiveTintColor: COLORS.blue, tabBarInactiveTintColor: COLORS.greenAccent, backgroundColor: "white" }}>

      <Tab.Screen name={"Events"} component={Events} options={{ tabBarIcon: ({ focused, color }) => { return (<Feather name='calendar' size={24} color={focused ? COLORS.blue : COLORS.greenAccent} />) } }} />
      <Tab.Screen name={"My Schedule"} component={MySchedule} options={{ tabBarIcon: ({ focused, color }) => { return (<Feather name='clock' size={24} color={focused ? COLORS.blue : COLORS.greenAccent} />) } }} />
      <Tab.Screen name={"Settings"} initialParams={{logout: logout}} component={Trial} options={{ tabBarIcon: ({ focused, color }) => { return (<Feather name='settings' size={24} color={focused ? COLORS.blue : COLORS.greenAccent} />) } }} />

    </Tab.Navigator>
    )
  } 

  return (
    <RootSiblingParent>
      <authContext.Provider
      value={{userId, setUserId}}
      >

      
      <NavigationContainer>
        {
          auth ? (

            <Stack.Navigator theme={theme} screenOptions={{ headerShown: false }} initialRouteName="Dashboard">

              <Stack.Group screenOptions={{ headerStyle: { backgroundColor: COLORS.white } }}  >

                <Stack.Screen name="Home" component={TabNav } />

                <Stack.Screen name="EventDescription" component={EventDescription} />
                <Stack.Screen name="AddRegistrant" component={AddRegistrant} />
                <Stack.Screen name="AddRunners" component={AddRunners} />
                <Stack.Screen name="MasterList" component={MasterList} />




              </Stack.Group>
            </Stack.Navigator>

          ) :
            (
              <Stack.Navigator theme={theme} screenOptions={{ headerShown: false }} initialRouteName="Landing">

                <Stack.Group screenOptions={{ headerStyle: { backgroundColor: COLORS.white } }}  >




                  <Stack.Screen name="LoginScreen" component={LoginScreen} initialParams={{ finishAuth: finishAuth }} />

                  <Stack.Screen name="SignUpScreen" component={SignUpScreen} initialParams={{ finishAuth: finishAuth }} />


                  {/* <Stack.Screen name="MobileVerificationScreen" component={MobileVerificationScreen} initialParams={{ finishAuth: finishAuth, setCurr: setCurr }} /> */}

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
