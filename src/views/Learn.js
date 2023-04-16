import React, {useCallback, useRef, useMemo} from 'react'
import { Image, ScrollView, Text,TouchableOpacity,View } from 'react-native'
import {MaterialIcons, Entypo} from '@expo/vector-icons'
import tw from "twrnc"
import {dataMolecules} from "../constants"
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

function Learn({navigation}) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const openBottomSheet = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <>
        <ScrollView style={tw`w-full`}>
        <View style={tw`p-8 mt-8 flex-1`}>
          <View style={tw`flex flex-row justify-between`}>
           <Entypo name='chevron-left' size={40} color="black"/>
           <MaterialIcons name='account-circle' style={tw`mb-5`} size={40} color="black"/>
            </View>
            <Text style={tw`text-2xl font-bold mb-2`}>Hi Chris</Text>
            <Text style={tw`text-gray-300`}>Explore 
               <Text style={tw`ml-150 text-xl font-bold text-black`}> {dataMolecules.length}</Text> new molecules</Text>
            <View style={tw`flex flex-col justify-between mt-5`}>
              {
                dataMolecules.map((item, index) => {
                  return (
                <View onPress={()=>navigation.navigate("LearnDetails", {item})} key={index} style={tw` ${item.color} rounded-4 p-6 mb-5 flex flex-row items-center`}>
                <View><Image source={item.src} resizeMode='contain' style={tw`w-20 h-20`}/></View>
                <View style={tw`ml-5`}>
                <Text style={tw`font-semibold text-xl`}>{item.title}</Text>
                <Text style={tw`text-xs`}>{item.formula}</Text>
                </View>
                </View>
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
              <View style={tw`p-8`}>
                  <View style={tw`flex flex-col justify-between items-center `}>
                  <Text style={tw` text-center text-xl font-semibold`}>Sulphur Dioxide</Text>
                    <Image source={require("../../assets/SO.png")} resizeMode='contain' style={tw`h-30 w-40`}/>
                    <Image source={require("../../assets/Sostructure.jpg")} resizeMode='contain' />
                    <TouchableOpacity onPress={() => alert("View details")}>
                    <Text style={tw`text-lg font-bold text-teal-800 mt-5 text-center`}>View Details</Text>
                    </TouchableOpacity>
                  </View>

              </View>
          </BottomSheetScrollView>
        </BottomSheet>

        </ScrollView>
    </>
  )
}

export default Learn