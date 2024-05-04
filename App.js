import { Image, Modal, StyleSheet, Text, View} from 'react-native'
import React,{ useState,useEffect } from 'react'
import Order from './Screens/Order';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import PlaceOrder from './Screens/PlaceOrder';
import GoldShow from './Screens/GoldShow';
import FrontPage from './Screens/FrontPage';
import NetInfo from '@react-native-community/netinfo'



const Stack = createNativeStackNavigator()



export default function App() {

  const [netinf,setnetinf] = useState(false);


  useEffect(()=>{
    const unsubcribe = NetInfo.addEventListener(state =>{
      setnetinf(!state.isInternetReachable);
    }
    );
  },[])


  return (
<NavigationContainer>
  <Modal visible={netinf} transparent style={styles.modal} >
    <View style={styles.notintcont}>
    <Image source={require("./assets/noint.gif")} resizeMode="contain" style={{height:"30%",width:'100%'}} />
    <Text style={styles.h1}>No Internet Connection!</Text>
    <Text style={styles.h2}>Please Check your Connection</Text>
    </View>
  </Modal>


  <Stack.Navigator screenOptions={{headerShown:false}}>
  <Stack.Screen name='Home' component={FrontPage} />
  <Stack.Screen name='PlaceOrder' component={PlaceOrder} />

  <Stack.Screen name='Gold' component={GoldShow} />
  <Stack.Screen name='Order' component={Order} />


      </Stack.Navigator>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({

  notintcont:{
    width:'100%',
    height:'100%',
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#f1faee'
  },
  h1:{
    fontSize:20,
    fontWeight:'bold',
    color:'#e63946'
  },
  h2:{
    fontSize:16,
    fontWeight:'500',
    letterSpacing:1,
    marginTop:10,
    color:'#1d3557'
  }
})