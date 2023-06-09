import React from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import {MaterialIcons, Entypo} from '@expo/vector-icons'
import tw from "twrnc"
import { Topics } from '../constants'

function QuizTopics() {
  return (
    <ScrollView style={tw`w-full`}>
        <View style={tw`p-8 mt-8 flex-1`}>
          <View style={tw`flex flex-row justify-between`}>
           <Entypo name='chevron-left' size={40} color="black"/>
           <MaterialIcons name='account-circle' style={tw`mb-5`} size={40} color="black"/>
            </View>
            <Text style={tw`text-2xl font-bold mb-2`}>Hi Chris</Text>
            <Text style={tw`text-gray-300`}>Choose a topic to revise On </Text>
            <View style={tw`flex flex-col justify-between mt-5`}>
              {
                Topics.map((item, index) => {
                  return (
                <View key={index} style={tw` ${item.color} rounded-4 p-6 mb-5 flex flex-row items-center`}>
                <View><Image source={item.src} resizeMode='contain' style={tw`w-20 h-20`}/></View>
                <View style={tw`ml-5`}>
                <Text style={tw`font-semibold text-xl`}>{item.name}</Text>
                </View>
                </View>
                  )
                })
              }
              
            </View>
        </View>
        </ScrollView>
  )
}

export default QuizTopics