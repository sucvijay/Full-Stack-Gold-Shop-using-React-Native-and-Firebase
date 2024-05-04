import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect } from 'react';
import { screenWidth,screenHeight } from './GoldShow'
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/FBconfig';


export default function FrontPage({navigation,route}) {
    const [goldr, setGr] = useState([{ price: '4820' }]);
    const [gold,setGold] = useState([{}]);

    const getD = async (type) => {

        console.log(type);
        navigation.navigate("Gold",{tipe : type,goldrate:goldr});
    
      }

      let i = 0;



      // useEffect(()=>{
      //   const chk = onSnapshot(doc(db, "GoldRate", "GoldRate"), (doc) => {
      //     setGr([doc.data()]);
      //   })

      //   return chk;
      // },
      //  []);


     const isClosetoBottom = ({layoutMeasurement,contentOffset,contentSize}) =>{
        const paddingtoBottom = 20;
        return layoutMeasurement.height+contentOffset.y >= contentSize.height - paddingtoBottom;
     }


     const [showm,setShow] = useState(true);

     
  return (



<View style={{alignItems:'center',height:screenHeight,width:screenWidth}}>

        <View style={{width:'100%',height:'6%',marginBottom:'2%',marginTop:StatusBar.currentHeight}}>
    <Image source={require("../Components/lgo.png")} resizeMode="contain" style={{height:'100%',width:'100%'}} />
        </View>
        
        

        <View style={{width:'100%',height:'5%',marginBottom:'2%'}}>
          <Text style={{fontWeight:'bold',textAlign:'center',fontSize:13}}>123 , Gold St , Tvl , 627001</Text>
          <Text style={{fontWeight:'bold',textAlign:'center',fontSize:12,marginTop:3}}>PH: 123 456 7890 | 77 77 777 177 | 22 22 222 222</Text>
        </View>


        <View style={{width:'75%',height:'5%',backgroundColor:'white',marginVertical:'2%',alignSelf:'center',flexDirection:'row',justifyContent:'space-evenly',borderRadius:30,borderWidth:1}}>
        <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'center'}}>GOLD RATE TODAY:</Text>
        <Text style={{fontSize:25,fontWeight:'bold',alignSelf:'center'}}>₹ {goldr[0].price}</Text>
        </View>


          {
            showm?(
              <View style={styles.scrolldowncont}>
              <Image source={require("../assets/swipedown.gif")} resizeMode="contain" style={{height:'100%',width:'10%'}} />
              <Text>Swipe Down for More.</Text>

        </View>
            ):(
              <View style={styles.scrolldowncont}>
                <Text>No More Content!</Text>
                </View>
            )
          }


        
        <ScrollView style={{width:'95%',height:'80%',marginBottom:'2%',alignSelf:'center',}} showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent})=>{
          if(isClosetoBottom(nativeEvent)){
            setShow(false)
          }else{
            setShow(true)
          }
        }}>


        
        <View style={{width:'100%',height:screenHeight*0.24,marginBottom:'1%',flexDirection:'row',justifyContent:"space-evenly"}}>
        
        <TouchableOpacity style={styles.single} onPress={()=>getD("Chain")}>
      <Image resizeMode='contain' source={require(`../assets/chain.png`)} style={{width:'100%',height:'100%',borderRadius:10}} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.single} onPress={()=>getD("Bangle")}>
      <Image resizeMode='contain' source={require(`../assets/bangles.jpg`)} style={{width:'100%',height:'100%',borderRadius:10}} />
      </TouchableOpacity>

        </View>


        <View style={{width:'100%',height:screenHeight*0.24,marginBottom:'1%',flexDirection:'row',justifyContent:"space-evenly"}}>
        <TouchableOpacity style={styles.single} onPress={()=>getD("Haram")}>
      <Image resizeMode='contain' source={require(`../assets/haram.jpg`)} style={{width:'100%',height:'100%',borderRadius:10}} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.single} onPress={()=>getD("Ear-Ring")}>
      <Image resizeMode='contain' source={require(`../assets/earring.png`)} style={{width:'100%',height:'100%',borderRadius:10}} />
      </TouchableOpacity>
      
        </View>

        <View style={{width:'100%',height:screenHeight*0.24,marginBottom:'1%',flexDirection:'row',justifyContent:"space-evenly"}}>
        <TouchableOpacity style={styles.single} onPress={()=>getD("Ring")}>
      <Image resizeMode='contain' source={require(`../assets/ring.png`)} style={{width:'100%',height:'100%',borderRadius:10}} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.single} onPress={()=>getD("Bracelet")}>
      <Image resizeMode='contain' source={require(`../assets/bracelet.png`)} style={{width:'100%',height:'100%',borderRadius:10}} />
      </TouchableOpacity>
      
        </View>


        <View style={{width:'100%',height:screenHeight*0.24,marginBottom:'10%',flexDirection:'row',justifyContent:"space-evenly"}}>
        <TouchableOpacity style={styles.single} onPress={()=>getD("Dollar")}>
      <Image resizeMode='contain' source={require(`../assets/dollar.jpg`)} style={{width:'100%',height:'100%',borderRadius:10}} />
      </TouchableOpacity>
      
        </View>

        </ScrollView>



      </View>




  )
}

const styles = StyleSheet.create({



    
      selectcont:{
        width:'85%',
        height:'70%',
        borderWidth:5,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:30
      },
    
      frontPagecont:{
        flex:1,
      },
      single:{
        width:"48%",
        height:'100%',
        borderRadius:5,
        marginTop:1
      },
      placeorderbottomcont:{
        width:'100%',
        height:'15%',
        position:'absolute',
        bottom:10,
        flexDirection:'row',
        justifyContent:'space-evenly'
      },
      scrolldowncont:{
        width:'93%',
        height:'4%',
        backgroundColor:"#ffffff980",
        position:'absolute',
        bottom:5,
        zIndex:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
      }

})