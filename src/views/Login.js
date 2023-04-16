import React from 'react'
import { Image, ScrollView, TextInput } from 'react-native'
import {View, Text, TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import DocumentPicker from 'react-native-document-picker'

function Login() {
  return (
<ScrollView style={tw`w-full`}>
<View style={tw` p-8 content-center w-full flex-1 justify-evenly flex-col`}>
    <Image source={require("../../assets/splash.jpg")} style={tw`w-full`} resizeMode='contain' />
    <Text style={tw`text-3xl font-semibold`}>Login</Text>
    <TextInput
    style={tw`border-b border-b-gray-200  p-4 mb-2`}   
    placeholder='Username / Email Address'
    />
    <TextInput
     placeholder='Password'
     style={tw` border-b border-b-gray-200  p-4 mb-5`}
     secureTextEntry={true}
    />
    <Text style={tw`text-right text-blue-500 font-semibold mb-5`}>Forgot Password?</Text>
    <TouchableOpacity style={tw`self-center bg-blue-400 p-4 rounded-xl w-full mb-5`}>
            <Text style={tw`text-white text-center`}>Login</Text>
    </TouchableOpacity>
    <Text>New to ChemDojo ? 
        <Text style={tw`text-blue-600`}> Register</Text>
    </Text>
</View>
</ScrollView>
  )
}

export default Login