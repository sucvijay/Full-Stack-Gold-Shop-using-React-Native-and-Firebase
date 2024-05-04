import { Button, Dimensions, FlatList, Image, KeyboardAvoidingView, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect,useRef } from 'react';

import { collection, doc, setDoc, getDoc, getDocs, onSnapshot, query, where, Timestamp, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from "../firebase/FBconfig";

import ImageViewer from "react-native-image-zoom-viewer"



export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export default function GoldShow({route,navigation}) {


  const [showload,setshowload] = useState(true);

    const [gold, SetGold] = useState([{
        Grams: '0',
        Wastage: 0,
        image: "https://firebasestorage.googleapis.com/v0/b/nextgen-jewels.appspot.com/o/10.jpg?alt=media&token=c4901e91-8174-4b3f-aa2e-3e09f4b2779c"
      },
]);

      const {tipe,goldrate} = route.params;

       useEffect(()=>{
        async function getit(){
          const fbGold = collection(db, 'Gold');

          let a = 1;
    
          const q = query(fbGold, where("Type", "==", tipe));
      
          const goldSnap = await getDocs(q);
          let temp = [];
          goldSnap.forEach(doc=>{
            temp.push(doc.data());
            console.log(a);
            a=a+1;
          });

          let t= {};
          
          for(let i=0;i<temp.length;i++){

          for(let j=i+1;j<temp.length;j++){

            if(parseInt(temp[j].ID)>parseInt(temp[i].ID)){
                t=temp[i];
                temp[i] = temp[j];
                temp[j] = t;
            }

          }
        }


          SetGold(temp);
          setGr(goldrate);
          setTimeout(()=>setshowload(false),1000);
        } getit();
      },[]);



    
      const [goldr, setGr] = useState([{ price: '4820' }]);
      const [dir,setdir] = useState('asc');




    function GoldFrame({item}) {


        const vap = parseFloat(item.Wastage);
        const grm = parseFloat(item.Grams);
        const goldRate = parseInt(goldr[0].price);
        const gPrice = grm * goldRate;
      
        const va = (gPrice / 100) * vap;
        const gst = ((gPrice + va) / 100) * 3;
      
        let total = parseInt(gPrice + va + gst + 750);
      
      
        const addva = (gPrice / 100) * (vap+4);
        const discount = (gPrice / 100) * 4;
      

 

      
      
        return (
      <>

      
          <View style={styles.contHolder}>
      
      
          <View style={{ height: '85%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              


              <View style={{alignSelf:'center',width:'75%',height:'20%',position:'absolute',backgroundColor:'white',borderRadius:50,alignItems:'center',justifyContent:'center'}}>
                <View style={{width:'90%',height:'70%'}}>
              <Image source={require("../assets/loading.gif")} resizeMode="cover" style={{width:'100%',height:'100%'}} />
              </View>
              
              </View>
  
              <View style={[styles.imageCont,{borderWidth:0}]}>
 
              <Image  progressiveRenderingEnabled={true} style={[styles.imageCont]} source={item.image && { uri: item.image }} />

              </View>
        
              </View>
      
            <View style={{ width: '100%',height:'15%', backgroundColor: '#ffb703', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>
      
      
              <View style={{ width: '65%', height: '90%', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                
                <View style={{ width: '45%', height: '70%', justifyContent: 'center', backgroundColor: 'white',borderRadius: 10 }}>
      
                  <Text style={{ fontSize: 14, textAlign: 'center', fontWeight: 'bold',color: '#0c678f' }}> {item.Type}</Text>
      
                  <Text style={styles.txtdetails}>{item.Grams} G</Text>
      
                </View>
      
                <View style={{ width: '50%', height: '70%', justifyContent: 'center', backgroundColor: 'white', alignItems: 'center',borderRadius: 10 }}>
                <Text style={{ fontSize: 14, textAlign: 'center', fontWeight: 'bold',color: '#0c678f' }}>Price</Text>
                  <Text style={{ alignItems: 'center', textAlignVertical: 'center', fontSize: 20, fontWeight: 'bold', fontFamily: 'serif', color: '#432818' }}>₹ {total}</Text>
                </View>
      
              </View>
      
      
      
              <TouchableOpacity style={{ width: '22%', height: '80%', margin: 1, borderRadius: 15,justifyContent:'center',alignItems:'center' }} onPress={()=>navigation.navigate("PlaceOrder",
              {
                Grams:item.Grams,
                ID:item.ID,
                Type:item.Type,
                image:item.image,
                Wastage:item.Wastage,
                Goldrate:goldRate,
                gPrice:gPrice,
                va:va,
                gst:gst,
                total:total,
                discount:discount,
                addva:addva,
                
              })}>
      
                <Image source={require("../assets/buy.png")} style={{width:'100%',height:'100%'}} resizeMode="contain" />
      
              </TouchableOpacity>
            </View>
      
          </View>
          </>
        )
      }

      const Sortgoldas = () =>{
        let d = [...gold];
        let temp = {};

        if(dir=='asc') {
        for(let i=0;i<d.length;i++){

          for(let j=i+1;j<d.length;j++){

            if(parseFloat(d[j].Grams)<parseFloat(d[i].Grams)){
                temp=d[i];
                d[i] = d[j];
                d[j] = temp;
            }

          }
        }
          SetGold(d);
      }
      else{

        for(let i=0;i<d.length;i++){

          for(let j=i+1;j<d.length;j++){

            if(parseFloat(d[j].Grams)>parseFloat(d[i].Grams)){
                temp=d[i];
                d[i] = d[j];
                d[j] = temp;
            }

          }
        }
          SetGold(d);

      }

      dir=='asc'?setdir('dec'):setdir('asc');


      }

      const flatlist = useRef();

  return (

    <>
      <Modal visible={showload} >
        <View style={styles.loading}>
        <Image source={require("../assets/loading.gif")} resizeMode="cover" style={{width:'90%',height:'10%'}} />
        <Text style={{fontSize:16,fontWeight:'bold',letterSpacing:2,color:'orange'}}>LOADING</Text>
        </View>

      </Modal>


      <View style={{ height: '100%', width: screenWidth, justifyContent: 'center', paddingTop: StatusBar.currentHeight, backgroundColor: '#ffb703' }}>

        <View style={styles.header}>

          <View style={{flexDirection:'row',width:'100%',height:'65%',alignItems:'center',justifyContent:'space-around'}}>
          <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={{width:"13%",height:'95%',backgroundColor:'#ffe6a7',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
            <Image source={require("../assets/home.png")} resizeMode='contain' style={{width:"75%",height:'75%'}} />
          </TouchableOpacity>
          <Image style={{ width: '80%', height: "100%" }} resizeMode='contain' source={require('../Components/lgo.png')} />
          </View>
          <View style={{ width: '95%', flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
            <View style={{ width: '50%', justifyContent:'space-evenly',flexDirection:'row',alignItems:'center',opacity:0.7}}>
            <View style={{width:"30%",height:"100%",alignItems:"center",justifyContent:'center'}}>
            <Text style={{fontSize:12,fontWeight:'bold'}}>Sort by :</Text>
            </View>
            
            <TouchableOpacity style={styles.filterbtn} onPress={()=>{
              flatlist.current.scrollToIndex({index:0})
              Sortgoldas();
              }}>
            <Text style={{fontSize:13,fontWeight:'bold',color:'#283618'}}>Weight</Text>
            </TouchableOpacity>






            </View >
            <View style={{ height: '95%', width: "27%", backgroundColor: 'white', borderWidth: 0.5, justifyContent: 'center',borderRadius:20 }}>

              <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#0c678f' }}>₹ {goldr[0].price}/G
              </Text>

            </View>
          </View>

        </View>




        <FlatList
        data={gold}
        renderItem={GoldFrame}
        horizontal={true}
        pagingEnabled={true}
        initialNumToRender={2}
        maxToRenderPerBatch={7}
        updateCellsBatchingPeriod={25}
        removeClippedSubviews={true}
        ref={flatlist}
        />

      </View>
      


    </>


  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        marginTop: 1,
        height: '100%',
    
      },
    
      orderButTxt: {
        fontSize: 16, textAlign: 'center', fontWeight: 'bold', fontFamily: 'notoserif', color: 'white'
      },
    
      txtdetails: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'serif',
        color:"#432818"
      },
    
      imageCont: {
        borderWidth: 3,
        height: screenHeight*0.8,
        width: "98%",
        borderRadius: 20,
        alignItems:'center'
    
    
    
    
    
      },
      contHolder: {
        flex: 1,
        width: screenWidth,
      },
    
      header: {
        justifyContent: 'flex-start',
        width: '100%',
        height: 80
      },
      orderNowScreen:{
        width:screenWidth,
        height:screenHeight,
        backgroundColor:'white',
        alignItems:'center',
      },
      orderContainer:{
        borderWidth:2,
        width:'95%',
        height:'80%',
        borderRadius:30,
        opacity:1,
        alignSelf:'center'
      },
      orderTopSection:{
        width:'90%',
        height:'8%',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:5,
        alignSelf:'center',
        borderBottomWidth:3
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
        width:"95%",
        height:'25%',
        alignSelf:'center',
        marginTop:3,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:2
      },
      orderdetailsimg:{
        width:'30%',
        height:"95%",
    
        marginRight:'1%'
      },
      orderdetailstxtcontainer:{
        width:'70%',
        height:'100%',
    
      },
    
      inputordercontainer:{
        width:'94%',
        height:'63%',
        alignSelf:'center',
        marginTop:'1%',
        borderRadius:15,
        borderWidth:1,
        alignItems:'center',
        paddingTop:10,
        backgroundColor:'white',
      },
      inputrow:{
        width:'98%',
        height:'12%',
        backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5
      },
      inputsection:{
        backgroundColor:'white',
        height:'100%',
        width:'49.5%',
        alignItems:'center',
        justifyContent:'center'
      },
      inputsectiontxt:{
        fontSize:16
      },
      inputsectionfield:{
        borderWidth:2,
        width:'90%',
        height:'85%',
        textAlign:'center',
        borderRadius:20,
    
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
        bottom:10,
        flexDirection:'row',
        justifyContent:'space-evenly'
      },

      filterbtn:{
        width:"40%",
        height:'98%',
        backgroundColor:'#fefae0',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'

      },
      weightcont:{
        backgroundColor:"#fefae0",
        width:'50%',
        height:'30%',
        alignSelf:'center',
        borderRadius:30,
        opacity:0.9
      },
      loading:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
      }
})