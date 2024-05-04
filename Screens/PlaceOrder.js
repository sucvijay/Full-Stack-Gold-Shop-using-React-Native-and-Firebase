import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { screenHeight,screenWidth } from './GoldShow';
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/FBconfig';

export default function PlaceOrder({navigation,route}) {

    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [doorNo,setdoorNo] = useState("");
    const [street,setstreet] = useState("");
    const [city,setcity] = useState("");
    const [pincode,setPincode] = useState("");
    const [state,setState] = useState("TamilNadu");
    

    const [show,setShow] = useState(false);

 const {Grams,ID,Type,image,Wastage,Goldrate,gPrice,va,gst,total} = route.params;

    const confirmat = () => {

        const alet = (param) =>{
          alert(`Please Enter ${param}`)
        }


    const ordConf = async() =>{

          await setDoc(doc(db,"Pending",ID),{
            Grams:Grams,
            ID:ID,
            Type:Type,
            image:image,
            Wastage:Wastage,
            Goldrate:Goldrate,
            gPrice:gPrice,
            va:va,
            gst:gst,
            total:total,
            bookedOn: serverTimestamp(),
            name:name,
            phone:phone,
            address:`${doorNo},${street},${city},${state},${pincode}`
          })
    
          await deleteDoc(doc(db,'Gold',ID));
    
    navigation.navigate("Order",{
      ID:ID,
      Type:Type,
      Grams:Grams,
      phone:phone,
      name:name,
      total:total,
      image:image,
      address:`${doorNo},${street},${city},${pincode}`
    })
    
        }


      if(name==""&&phone==""&&doorNo==""&&street==""&&city==""&&pincode==""){
        alet("Details.")
      }else if(name==""){
          alet("Name")
      }else if(phone.length<10){
        alet(`Phone Number. Phone number contains only ${phone.length} numbers. `)
    }else if(doorNo==""){
      alet("Address Line 1")
    }else if(street==""){
    alet("Address Line 2")
    }else if(city==""){
  alet("City")
    }else if(pincode.length>6||pincode.length<6){
  alet(`Correct Pincode. Pincode contains only ${pincode.length} numbers`)
    }else{
      Alert.alert(
        "Order Confirmation","This is the final step. We will contact you for further updates.",
        [{
          text:"Cancel",
        },
      {
        text:"Confirm",
        onPress:()=>ordConf()
      }]
      )
            
    }

    }



  return (
<ScrollView>

<View style={{backgroundColor:'#fdfcdc',height:screenHeight,width:screenWidth}} >

    
    
    <View style={styles.orderNowScreen}>

      <View style={{height:'7%',width:"100%"}}>
      <Image resizeMode='contain' source={require("../Components/lgo.png")} style={{width:"95%",height:'100%',alignSelf:'center'}}/>
      </View>
      <View style={{height:'5%',width:"60%",borderWidth:2,marginBottom:10,borderRadius:10,justifyContent:'center',backgroundColor:'#fdfcdc'}}>
        <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>PLACE ORDER</Text>
      </View>



      <View style={styles.orderContainer}>
        
      



      <View style={styles.orderDetailsContainer}>
        <View style={styles.orderdetailsimg}>
          <Image style={{height:"100%",width:'100%',borderRadius:10}} source={image && {uri:image}} resizeMode="contain" />
        </View>
        <TouchableOpacity style={styles.tableouter} onPress={()=> show?setShow(false):setShow(true)}>
        <Text style={{fontSize:12,fontWeight:'bold',textAlign:'center'}}>Price Breakup</Text>
       
       
       <View style={styles.prow}>
        <View style={styles.pleft}>
        <Text style={styles.tleft}>916 Gold</Text>
        </View>
        <View style={styles.pright}>
        <Text style={styles.tright}>₹{parseInt(gPrice)}</Text>
        </View>
        </View>

        <View style={styles.prow}>
        <View style={styles.pleft}>
        <Text style={styles.tleft}>Wastage</Text>
        </View>
        <View style={styles.pright}>
        <Text style={styles.tright}>{show?(`₹${parseInt(va)}`):(`${Wastage} %`)}</Text>
        </View>
        </View>

        <View style={styles.prow}>
        <View style={styles.pleft}>
        <Text style={styles.tleft}>GST</Text>
        </View>
        <View style={styles.pright}>
        <Text style={styles.tright}>{show?(`₹${parseInt(gst)}`):(`3 %`)}</Text>
        </View>
        </View>


        <View style={styles.prow}>
        <View style={styles.pleft}>
        <Text style={styles.tleft}>Delivery</Text>
        </View>
        <View style={styles.pright}>
        <Text style={styles.tright}>₹750</Text>
        </View>
        </View>


        <View style={styles.prow}>
        <Text style={{fontSize:15,fontWeight:'bold'}}>₹{total}</Text>
        </View>






        </TouchableOpacity>


      </View>

      

        <View style={styles.inputordercontainer}>



        <View style={{flexDirection:'row',width:'90%',height:'10%',marginBottom:15,justifyContent:'space-around',marginTop:'5%'}}>

        <View style={styles.inputrowhalf}>
            <Text style={styles.inputsectiontxt}> NAME</Text>

            <TextInput placeholder='Enter Name' style={styles.inputsectionfield} value={name} onChangeText={text=>setName(text)} />
          
        </View>
        <View style={styles.inputrowhalf}>
            <Text style={styles.inputsectiontxt}> Phone</Text>

            <TextInput keyboardType='numeric' placeholder='Enter Phone Number' style={styles.inputsectionfield} value={phone} onChangeText={text=>setPhone(text)} />
          
        </View>

        </View>

        <View style={styles.inputrow}>
            <Text style={styles.inputsectiontxt}> Address Line 1</Text>

            <TextInput placeholder='Address Line 1' style={styles.inputsectionfield} value={doorNo} onChangeText={text=>setdoorNo(text)} />
          
        </View>

        <View style={styles.inputrow}>
            <Text style={styles.inputsectiontxt}> Address Line 2</Text>

            <TextInput placeholder='Address Line 2' style={styles.inputsectionfield} value={street} onChangeText={text=>setstreet(text)} />
          
        </View>

        <View style={styles.inputrow}>
            <Text style={styles.inputsectiontxt}> City</Text>

            <TextInput placeholder='City' style={styles.inputsectionfield} value={city} onChangeText={text=>setcity(text)} />
          
        </View>

        <View style={{flexDirection:'row',width:'90%',height:'10%',marginBottom:15,justifyContent:'space-around'}}>

        <View style={styles.inputrowhalf}>
            <Text style={styles.inputsectiontxt}> State</Text>

            <TextInput placeholder='Enter State' style={styles.inputsectionfield} value={state} onChangeText={text=>setState(text)} />
          
        </View>
        <View style={styles.inputrowhalf}>
            <Text style={styles.inputsectiontxt}> Pincode</Text>

            <TextInput placeholder='Enter Pincode' style={styles.inputsectionfield} value={pincode} onChangeText={text=>setPincode(text)} />
          
        </View>

        </View>



        <View style={styles.placeorderbottomcont}>

        <TouchableOpacity style={styles.cancelOrderbtn} onPress={()=>navigation.goBack()} >
          <Text style={{color:"white"}}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.placeOrderbtn} onPress={confirmat} >
          <Text>Place Order</Text>
        </TouchableOpacity>

        </View>

        


        </View>
      

      </View>
      
      
    </View>
    
    
   
    </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
    

      orderNowScreen:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        backgroundColor:"#ffd166",
        marginTop:StatusBar.currentHeight
      },
      orderContainer:{
        width:'99%',
        height:'80%',
        borderRadius:30,

        alignSelf:'center'
      },
      orderTopSection:{
        width:'90%',
        height:'8%',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:5,
        alignSelf:'center',
      },
      orderheading:{
        backgroundColor:'white',
        width:'75%',
        height:'50%',
        alignSelf:'center',
        position:'absolute',
        right:10,
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:16,
        fontWeight:'bold'
    
      },
      orderDetailsContainer:{
        width:"101%",
        height:'25%',
        alignSelf:'center',
        marginTop:3,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#ffd166',
        justifyContent:'space-evenly',
        marginBottom:10


      },
      orderdetailsimg:{
        width:'30%',
        height:"95%",
        marginLeft:10,
        borderWidth:2,
        borderColor:'white'
      },
      orderdetailstxtcontainer:{
        width:'70%',
        height:'100%',
    
      },
    
      inputordercontainer:{
        width:'101%',
        height:'83%',
        alignSelf:'center',
        borderWidth:1,
        alignItems:'center',
        paddingTop:10,
        backgroundColor:'#fdfcdc',
      },
      inputrow:{
        width:'90%',
        height:'10%',
        justifyContent:'space-between',
        marginBottom:5,
        marginBottom:15
      },
      inputrowhalf:{
        width:'48%',
        height:'100%',
        justifyContent:'space-between',
        marginBottom:5,
        marginBottom:15
      },
      inputsection:{
        backgroundColor:'white',
        height:'100%',
        width:'49.5%',
        alignItems:'center',
        justifyContent:'center'
      },
      inputsectiontxt:{
        fontSize:12,
        fontWeight:'bold',
        color:'#0081a7'
      },
      inputsectionfield:{
        width:'98%',
        height:'58%',
        borderRadius:7,
        paddingLeft:20,
        backgroundColor:"#eaf4f4"

    
      },
    
      inputrowAddress:{
        width:'98%',
        height:'30%',
        backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
      },
      inputsectionaddressfield:{
        borderWidth:2,
        width:'90%',
        height:'85%',
        textAlign:'center',
        borderRadius:20,
        overflow:'scroll'
      },
      placeOrderbtn:{
        height:'70%',
        width:'40%',
        backgroundColor:'lightgreen',
        borderRadius:10,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center'
      
      },
      cancelOrderbtn:{
        height:'70%',
        width:'40%',
        backgroundColor:'red',
        borderRadius:10,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center'
      
      },
      selectedItm:{
        width:'80%',
        height:'95%',
        borderWidth:2,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"orange"
      },
    
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
        bottom:50,
        flexDirection:'row',
        justifyContent:'space-evenly'
      },
      tableouter:{
        width:'40%',
        height:'96%',
        borderWidth:1,
        borderColor:'#fdf0d5'
        
      },
      prow:{
        backgroundColor:'#ffbf69',
        width:'100%',
        height:'18%',
        borderWidth:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#fdf0d5'
      },
      pleft:{
        width:'47%',
        height:'95%',
        borderRightWidth:1,
        alignItems:'center',
        backgroundColor:'#cbf3f0',
        justifyContent:'center',
        borderColor:'#fdf0d5'
      },
      pright:{
        width:'53%',
        height:'99%',
        alignItems:'center',
        backgroundColor:'#2ec4b6',
        justifyContent:'center'
      },
      tright:{
        fontSize:13,
        fontWeight:'bold'
      },
      tleft:{
        fontSize:12,
        textAlignVertical:'center'
      }


})