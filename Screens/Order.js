import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BackHandler } from 'react-native';
export default function Order({route,navigation}) {

 const {ID,Type,Grams,phone,total,name,image,address} = route.params;

  return (
    <View style={styles.container}>
        <Image source={require("../Components/lgo.png")} resizeMode="contain" style={{width:"100%",height:"5%",marginVertical:'1%'}} />
        <View style={styles.successimg}>
        <Image source={require("../assets/ordersuc.webp")} resizeMode="contain" style={{width:'95%',height:'95%'}} />
        </View>
        <View style={styles.orderconfheading}>
          <Text style={styles.h2}>YOUR ORDER HAS BEEN BOOKED</Text>
          <Text style={styles.h2}>SUCCESSFULLY</Text>
        </View>

        <View style={styles.row}>
        <View><Text style={styles.h3}>Name : {name}</Text></View>
        <View><Text style={styles.h3}>Phone : {phone}</Text></View>
        </View>

        <View style={styles.row}>
        <View><Text style={{fontSize:10}}>Address : {address}</Text></View>
        </View>

        <View style={styles.row}>
        <View><Text style={styles.h3}>Order-No : {`JS-${ID}`}</Text></View>
        </View>

        <View style={styles.row}>
        <View><Text style={styles.h3}>Weight : {Grams}</Text></View>
        <View><Text style={styles.h3}>Type : {Type}</Text></View>
        <View><Text style={styles.h3}>Total : {total}</Text></View>
        </View>

        <View style={{width:"95%",height:'4%',marginBottom:"2%",marginTop:'3%',justifyContent:'center'}}>
        <Text style={{fontSize:10,textAlign:'center',fontWeight:'bold'}}>உங்கள் ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது</Text>
        </View>

        <View style={{width:"95%",height:'3%',marginBottom:"2%",flexDirection:'row',justifyContent:'center'}}>
          <Image resizeMode='contain' source={require("../assets/Ph.png")} style={{width:'10%',height:'100%'}}/>
        <Text style={styles.h3}>We will be Calling You for further Procedure.</Text>
        </View>

        <TouchableOpacity style={{height:'5%',width:'25%',backgroundColor:'red',borderRadius:20,alignItems:'center',justifyContent:'center',position:'absolute',bottom:20}} onPress={()=>navigation.replace("Home")}><Text style={{fontWeight:'bold',color:'white'}}>Close X</Text></TouchableOpacity>



    </View>
  )
}

const styles = StyleSheet.create({

  container:{

    flex:1,
    marginTop:StatusBar.currentHeight,
    alignItems:'center',
  },
  orderconfheading:{
    width:'90%',
    height:'10%',
    alignSelf:'center',
    marginTop:'5%',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:'1%'
  },
  h1:{
    fontSize:20,
    fontWeight:'bold'
  },
  h2:{
    fontSize:16,
    fontWeight:'bold'
  },
  h3:{
    fontSize:12,
    fontWeight:'bold'
  },
  successimg:{
    height:'30%',
    width:'60%',
    backgroundColor:'white',
    alignSelf:'center',
    marginTop:'10%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50
  }, 
  orderdetcont:{
    flexDirection:"row",
    width:'98%',
    height:"10%",
    marginVertical:'1%',

  },
  left:{
    width:'50%',
    height:'100%',
    justifyContent:'center',
    marginRight:'5%',
    alignItems:'center'
  },
  right:{
    width:'45%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  row:{
    width:'90%',
    height:'3%',
    backgroundColor:'lightgreen',
    marginBottom:'2%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    borderRadius:10
  }

})