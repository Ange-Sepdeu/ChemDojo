import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Alkanes } from '../constants'
import tw from "twrnc"
import {Entypo, MaterialIcons} from "@expo/vector-icons"

function Levels() {
  return (
    <ScrollView>
        <View style={tw`p-8 mt-[10%]`}>
        <View style={tw`flex flex-row justify-between`}>
           <Entypo name='chevron-left' size={40} color="black"/>
           <MaterialIcons name='account-circle' style={tw`mb-5`} size={40} color="black"/>
            </View>
            <Text style={tw`text-2xl font-bold mb-5`}>Levels</Text>
            {
                Alkanes.map((item,index) => {
                    return(
                    <View key={index} style={tw`${item.color} mb-5 p-8 rounded-2xl`}>
                    <Text style={tw`font-bold`}>Level {index+1}</Text>
                    <Text>{item.level.length} Questions</Text>
                    </View>
                    )
                })
            }   
            
        </View>
    </ScrollView>
  )
}

export default Levels