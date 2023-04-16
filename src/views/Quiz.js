import React, {useCallback, useRef, useMemo} from 'react'
import { Text } from 'react-native'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import { dataMolecules } from '../constants'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Alkanes, Topics } from '../constants'
import { RadioButton } from 'react-native-paper'
import {Entypo} from "@expo/vector-icons"

function Quiz() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
    const openBottomSheet = useCallback((index) => {
      bottomSheetRef.current?.snapToIndex(index);
    }, []);
    const handleSheetChanges = useCallback((index) => {
      console.log('handleSheetChanges', index);
    }, []);
    const [timer, setTimer] = React.useState({min: 0, sec:0})
    var expiryDate = new Date().getTime()+90000
    var countDownDate = expiryDate
    // React.useEffect(()=>{
        // var x = setInterval(function() {
        //     var now = new Date().getTime();
        // var distance = countDownDate - now;
    
        //   // Time calculations for days, hours, minutes and seconds
        //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        //   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        //   setTimer({min: minutes, sec: seconds})
        //   if (distance < 0) {
        //     clearInterval(x)
        //   }

        // }, 1000);
    // }, [])
    const [checked, setChecked] = React.useState({isCheckEd: false, id:0})
    const handleCheck= (id) => {
        let i;
        for(i=0;i<4;i++)
        {
            setChecked({isCheckEd:false, id:i})
        }
        setChecked({isCheckEd:true, id:id})
    }
  return (
    <View style={tw`p-8 mt-10 bg-blue-950 h-full`}>
        <Text style={tw`text-3xl mb-5 text-white`}> Alkanes </Text>
    <Text style={tw`text-white font-bold`}> GoodLuck </Text>
        <Image source={Topics[0].src} resizeMode='contain' style={tw`w-full mt-10 mb-5`} />
        <View style={tw`flex flex-row justify-between mb-5`}>
        <Text style={tw`text-white text-2xl`}>1. {Alkanes[0].level[0].question}</Text>
        </View>
        <BottomSheet
        ref={bottomSheetRef.current}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        >
          <BottomSheetScrollView>
              <View style={tw`p-8`}>
              {
            Alkanes[0].level[0].alternatives.map((item, index) => {
                return(
                    <View key={index} style={tw`flex flex-row mb-5`}>
                    <RadioButton 
                    value={item}
                    status={checked.isCheckEd && checked.id===index ? 'checked': 'unchecked' }
                    onPress={() => handleCheck(index)}
                    />
                    <Text key={index} style={tw` text-xl text-justify`}>{String.fromCharCode(index+65)}. {item}</Text>
                    </View>
                )
            })
         }
         <Text>Time left: {timer.min} : {timer.sec}</Text>
         <View style={tw`flex flex-row justify-between items-center`}>
            {
                0==0 ? (<TouchableOpacity style={tw`items-center`}>
                <View style={tw`flex flex-row`}>
                <Entypo name='chevron-left' size={20}/>
                <Text>Previous</Text>
                </View>
            </TouchableOpacity>):null
            }
    <TouchableOpacity style={tw`bg-orange-700 p-4 rounded-2xl`} onPress={() => alert("Validated")}>
        <Text style={tw`text-white`}>Validate</Text>
    </TouchableOpacity>
    <TouchableOpacity style={tw`items-center`}>
        <View style={tw`flex flex-row`}>
        <Text>Next</Text>
        <Entypo name='chevron-right' size={20}/>
        </View>
    </TouchableOpacity>
    </View>
              </View>
          </BottomSheetScrollView>
        </BottomSheet>
         
        

    </View>
  )
}

export default Quiz