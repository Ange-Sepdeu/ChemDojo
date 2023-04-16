import React from 'react'
import {SimpleLineIcons, Entypo, Ionicons} from "@expo/vector-icons"
import { Image, TouchableOpacity, View, Text } from 'react-native'
import tw from "twrnc"

function SplashTwo({navigation}) {
  const [body, setBody] = React.useState("bg-teal-500")    
    React.useEffect(()=>{
        var t = 0;
        var timeout = setInterval(()=>{
          updateBG()
          ++t;
          if(t==7){
            t=0;
            clearTimeout(timeout)
           // navigation.navigate("Home")
          }
        },900)
    
        return ()=> clearTimeout(timeout)
    
      },[bg])
    
      const [bg,setBg] = React.useState([
        {
          name: "dot1",
          isBg:false
        },
        {
          name: "dot2",
          isBg:false
        },
        {
          name: "dot3",
          isBg:false
        },
      ])
    
      const updateBG=()=>{
        let arr = [...bg]
        let isActive = false;
        let activeIndex = -1;
        let color = Math.random() * (1000) 
        // check if no one is active
        arr.forEach((item,index)=>{
          if(item.isBg==true){
            isActive = true
          }
        })
    
         if(isActive==false){
          arr[0].isBg = true
         }else{
            // check for active index
            arr.forEach((item,index)=>{
              if(item.isBg===true){
                activeIndex = index;
              }
            })
            
            //assign next index active
            if(activeIndex>=0 && activeIndex<arr.length){
              arr[activeIndex].isBg = false
              activeIndex == arr.length-1 ? arr[0].isBg = true : arr[activeIndex+1].isBg = true;
            }else{
              arr[0].isBg = true;
            }
          }
          setBg(arr);
      }
    
      const checkIsBg=(value)=>{
        const arr = [...bg]
        let res = false;
    
        arr.forEach((item,index)=>{
          if(item.name==value){
              res = item.isBg
            }
        })
    
        return res;
      }
  return (
    <>
    <View style={tw`flex-1 h-full ${body} content-center items-center`}>
        <Image source={require("../../assets/splashImg.png")} resizeMode='contain' style={tw`mt-[10%] w-full self-center `}/>
        <Text style={tw`text-4xl text-center font-bold mt-[-35%] text-white`}>ChemDojo</Text>
        <Text style={tw`text-center font-bold text-sm mt-1 text-white`}>CHEMISTRY EDUCATIONAL APP</Text>

        <View style={tw`flex flex-row mt-40`}>
        <View style={tw`p-2 mx-1 ${!checkIsBg('dot1') ? 'bg-white': 'bg-[#09224c] relative bottom-1'} rounded-full`}></View>
        <View style={tw`p-2 mx-1 ${!checkIsBg('dot2') ? 'bg-white': 'bg-[#09224c] relative bottom-1'} rounded-full `}></View>
        <View style={tw`p-2 mx-1 ${!checkIsBg('dot3') ? 'bg-white': 'bg-[#09224c] relative top-1'} rounded-full `}></View>
      </View>

      </View>
    </>
  )
}

export default SplashTwo