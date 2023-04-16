import React,{ useCallback, useMemo, useRef } from 'react'
import { Image, Text } from 'react-native'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { Topics } from '../constants'
import tw from "twrnc"
import {Entypo, MaterialIcons} from "@expo/vector-icons"
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

function LearnTwo() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const openBottomSheet = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <ScrollView>
        <View style={tw`p-6 items-center`}>
        <View style={tw`bg-teal-700 w-full h-50`}>
           <Entypo name='chevron-left' size={40} color="white" style={tw`mt-10`}/>
        </View>
        <Image source={require("../../assets/avatar.png")} resizeMode='contain' style={tw`w-30 h-30 mt-[-32%] mb-5`} />    
        <Text style={tw`text-3xl font-bold text-teal-700`}>ChemDojo</Text>
        <Text style={tw `font-bold text-teal-700`}>Learning Chemistry With Ease</Text>
             <View style={tw`flex flex-col justify-between mt-5 w-full`}>
              {
                Topics.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={()=>openBottomSheet(0)}>
                <View key={index} style={tw` ${item.color} rounded-4 p-6 mb-5 flex flex-row items-center`}>
                <View><Image source={item.src} resizeMode='contain' style={tw`w-20 h-20`}/></View>
                <View style={tw`ml-5`}>
                <Text style={tw`font-semibold text-xl text-white`}>{item.name}</Text>
                </View>
                </View>
                </TouchableOpacity>
                  )
                })
              }
            </View>
        </View>
        <BottomSheet
          ref={bottomSheetRef.current}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
            <BottomSheetScrollView>
            <View style={tw`p-4`}>
                <Text style={tw`mb-5 text-center`}>Some Notes on Organic Chem</Text>
                    <Text style={tw`text-indigo-500 font-bold`}>Alkanes</Text>
                    <View style={tw`flex flex-row justify-between mt-5 items-center`}>
                    <Image source={require("../../assets/bulb.jpg")} style={tw`w-25 h-25 rounded-full z-40`} resizeMode='contain' />
                    <View style={tw`bg-indigo-500 p-2 items-center h-18 w-[85%] rounded-2xl ml-[-10%]`}>
                        <Text style={tw`text-white ml-[10%]`}>Alkanes are hydrocarbons having 2n+2 Hydrogen atoms when carbon are n </Text>
                    </View>
                    </View>
                    <Text style={tw`text-teal-500 font-bold text-right`}>Alkenes</Text>
                    <View style={tw`flex flex-row justify-between mt-5 items-center`}>
                    <View style={tw`bg-teal-500 px-4 content-center items-center h-18 w-[85%] rounded-2xl`}>
                        <Text style={tw`text-white mt-[5%] ml-[-12%]`}>Alkanes are hydrocarbons having 2n+2 Hydrogen atoms when carbon are n </Text>
                    </View>
                    <Image source={require("../../assets/notes.jpeg")} style={tw`w-25 h-25 rounded-full z-40 ml-[-75%]`} resizeMode='contain' />
                    </View>
                    
                    <Text style={tw`text-indigo-500 font-bold`}>Alkynes</Text>
                    <View style={tw`flex flex-row justify-between mt-5 items-center`}>
                    <Image source={require("../../assets/alk.png")} style={tw`w-25 h-25 rounded-full z-40`} resizeMode='contain' />
                    <View style={tw`bg-indigo-500 p-2 items-center h-18 w-[85%] rounded-2xl ml-[-10%]`}>
                        <Text style={tw`text-white ml-[10%]`}>Alkanes are hydrocarbons having 2n+2 Hydrogen atoms when carbon are n </Text>
                    </View>
                    </View>
                    
                    <Text style={tw`text-yellow-400 font-bold text-right`}>Studying tips</Text>
                    <View style={tw`flex flex-row justify-between mt-5 items-center`}>
                    <View style={tw`bg-yellow-400 px-4 content-center items-center h-18 w-[85%] rounded-2xl`}>
                        <Text style={tw`text-white mt-[5%] ml-[-12%]`}>Alkanes are hydrocarbons having 2n+2 Hydrogen atoms when carbon are n </Text>
                    </View>
                    <Image source={require("../../assets/tips.jpg")} style={tw`w-25 h-25 rounded-full z-40 ml-[-75%]`} resizeMode='contain' />
                    </View>

            </View>
            </BottomSheetScrollView>
        </BottomSheet>
      </ScrollView>     
  )
}

export default LearnTwo