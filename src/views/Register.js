import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import tw from 'twrnc'
import DocumentPicker from "react-native-document-picker"

function Register() {
  const [image, setImage] = useState([])
    const docPicker = () => {
        try {
           DocumentPicker.pickSingle({
             type: [DocumentPicker.types.images],
             presentationStyle: 'fullScreen'
          })
          .then(res => setImage(res))
          .catch(err => console.log(err))
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            console.log("error -----", err);
          } else {
            throw err;
          }
        }
      }
  return (
    <>
    <ScrollView style={tw`w-full`}>
    <View style={tw`p-8 w-full flex-1 justify-around flex-col`}>
    <Image source={require("../../assets/splash.jpg")} style={tw`w-full`} resizeMode='contain' />
    <Text style={tw`text-3xl font-semibold`}>Sign Up</Text>
    <TextInput
    style={tw`border-b border-b-gray-200  p-4 mt-2`}   
    placeholder='Username'
    />
    <TextInput
    style={tw`border-b border-b-gray-200  p-4 mt-2`}   
    placeholder='Email Address'
    />

    <TouchableOpacity style={tw`border-b border-b-gray-200 p-4 mt-2`} onPress={()=>docPicker()}>
        <Text style={tw`text-gray-400`}>Upload Profile Picture</Text>
    </TouchableOpacity>

    <TextInput
     placeholder='Password'
     style={tw`border-b border-b-gray-200  p-4 mt-2`}
     secureTextEntry={true}
    />
    <TouchableOpacity style={tw`self-center bg-blue-400 p-4 rounded-xl w-full mt-5 `}>
            <Text style={tw`text-white text-center`}>Register</Text>
    </TouchableOpacity>
    <Text style={tw`mt-5`}>Got an account already? 
        <Text style={tw`text-blue-600`}> Login</Text>
    </Text>
</View>
</ScrollView>
    </>
  )
}

export default Register