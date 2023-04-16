import { useRoute } from '@react-navigation/native'
import React, {useCallback, useRef, useMemo} from 'react'
import { Image, Text } from 'react-native'
import { ScrollView, View } from 'react-native'
import tw from 'twrnc'
import { dataMolecules } from '../constants'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

function MoleculeDetails() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const openBottomSheet = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
    const props = dataMolecules[0]
  return (
    <ScrollView style={tw`w-full`}>
        <View style={tw`p-8 mt-10 bg-blue-950 h-200`}>
            <Text style={tw`text-3xl mb-5 text-white`}> {props.title} molecule </Text>
            <Text style={tw`text-gray-400`}>Density  <Text style={tw`text-white font-bold`}>{props.density} </Text> </Text>
            <Image source={props.src} resizeMode='contain' style={tw`w-full mb--25`} />
            <View style={tw`flex flex-row justify-between`}>
                <Text style={tw`text-gray-400 w-20`}>Formula <Text style={tw`text-white text-xl font-bold`}> {props.formula}</Text></Text>
                <Text style={tw`text-gray-400 w-20`}>State <Text style={tw`text-xl text-white font-bold`}> {props.state}</Text></Text>
            </View>
            <Text style={tw`text-gray-400 mt-5`}>Other Details: </Text>
            <Text style={tw`text-white text-justify`}>{props.text}</Text>
        </View>
        <BottomSheet
        ref={bottomSheetRef.current}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        >
          <BottomSheetScrollView>
              <View style={tw`p-8`}>
                  <Text style={tw` text-center text-xl font-semibold`}>Similar Elements</Text>
                  <View style={tw`flex flex-row justify-between items-center `}>
                    <View styl={tw`items-center justify-evenly`}>
                    <Image source={require("../../assets/chlorine.png")} resizeMode='contain' style={tw`h-20 w-10`}/>
                      <Text style={tw`font-semibold mt-[-30%]`}>Chlorine</Text>
                    </View>

                    <View style={tw`items-center`}>
                    <Image source={require("../../assets/SO.png")} resizeMode='contain' style={tw`h-19 w-10`}/>
                    <Text style={tw`font-semibold mt-[-30%]`}>SO2</Text>
                    </View>

                    <View style={tw`items-center`}>
                    <Image source={require("../../assets/CO.png")} resizeMode='contain' style={tw`h-19 w-10`}/>
                    <Text style={tw`font-semibold mt-[-30%]`}>CO2</Text>
                    </View>

                    <View style={tw`items-center`}>
                    <Image source={require("../../assets/No.png")} resizeMode='contain' style={tw`h-19 w-10`}/>
                    <Text style={tw`font-semibold mt-[-30%]`}>NO2</Text>
                    </View>

                  </View>

              </View>
          </BottomSheetScrollView>
        </BottomSheet>
    </ScrollView>
  )
}

export default MoleculeDetails