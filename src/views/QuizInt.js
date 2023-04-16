import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import tw from "twrnc"

function QuizInt() {
  return (
    <ScrollView>
        <View style={tw`p-8 items-center mt-[30%]`}>
            <AntDesign style={tw`mb-5 text-blue-950`} name='questioncircle' size={100}/>
            <Text style={tw`text-4xl text-blue-950 font-bold`}>Quizzles</Text>
            <Text style={tw`mt-10 text-2xl font-bold`}>Let's Play</Text>
            <Text style={tw` text-sm font-bold text-blue-950`}>Play now to level up</Text>
            <TouchableOpacity style={tw`mt-15 bg-blue-950 p-8 rounded-2xl w-[85%] items-center`} onPress={() => alert("Clicked to play")}>
                <Text style={tw`text-white font-bold`}>Play Now</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

export default QuizInt