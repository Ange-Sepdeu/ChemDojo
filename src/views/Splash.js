import React from 'react'
import {SimpleLineIcons, Entypo, Ionicons} from "@expo/vector-icons"
import { Image, TouchableOpacity, View, Text } from 'react-native'
import tw from "twrnc"

function Splash({navigation}) {
  return (
    <>
    <View style={tw`flex-1 h-full content-center items-center mt-30`}>
        {/* <View style={tw`flex-row justify-between mt-20 `}>
        <SimpleLineIcons name='chemistry' size={40} color="black" />
        <Entypo name="funnel" size={40} color="black" />
        <Ionicons name="beaker" size={40} color="black" />
        </View> */}
        <Text style={tw`text-3xl text-center font-bold`}>ChemDojo</Text>
        <Image source={require("../../assets/splash.jpg")} resizeMode='contain' style={tw`w-full self-center `}/>
        <Text style={tw`text-center font-semibold text-xl mb-5`}>Learning Chemistry becomes easy</Text>
        <TouchableOpacity style={tw`self-center bg-blue-400 p-4 rounded-xl `}>
            <Text style={tw`text-white`}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Splash