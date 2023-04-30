import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import tw from "twrnc"
import { Topics } from '../constants'

function QuizTopics({ navigation }) {
  return (
    <ScrollView style={tw`w-full`}>
      <View style={tw`p-8 flex-1`}>
        <Text style={tw`text-2xl font-bold mb-2`}>Hi Chris</Text>
        <Text style={tw`text-gray-300`}>Choose a topic to revise On </Text>
        <View style={tw`flex flex-col justify-between mt-5`}>
          {
            Topics.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Quiz")}
                  key={index} style={tw` ${item.color} rounded-4 p-6 mb-5 flex flex-row items-center`}>
                  <View><Image source={item.src} resizeMode='contain' style={tw`w-20 h-20`} /></View>
                  <View style={tw`ml-5`}>
                    <Text style={tw`font-semibold text-xl`}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }

        </View>
      </View>
    </ScrollView>
  )
}

export default QuizTopics