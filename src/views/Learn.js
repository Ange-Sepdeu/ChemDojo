import React, { useCallback, useRef, useMemo, useContext, useState, useEffect } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import tw from "twrnc"
import { dataMolecules } from "../constants"
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AppContext } from '../providers/AppContext'
import { TextInput } from 'react-native-gesture-handler'
import learnService from '../api/learnService'
import Loader from '../components/Loader';


function Learn({ navigation }) {
  const bottomSheetRef = useRef < BottomSheet > (null);
  const { storedInformation, setStoredInformation } = useContext(AppContext);
  console.log(storedInformation)
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const openBottomSheet = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [topic, setTopic] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [learningTopics, setLearningTopics] = useState([]);


  const getAllTopic = () => {
    setUploading(true);
    learnService.listLearningTopic().then((response) => {
      setLearningTopics(response.data)
    }).finally(() => {
      setUploading(false);
    })
  }


  useEffect(() => {
    getAllTopic()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    setImage(source);
  }

  const addNewTopic = async () => {
    setUploading(true);
    if (image?.uri.length > 0 && name.length > 0 && topic.length > 0) {
      const response = await learnService.addLearningContent({
        uri: image.uri,
        name,
        topic
      });
      console.log("response", response.statusCode);
      if (response.statusCode === 200) {
        Alert.alert("Learning topic added successfully");
        setImage(null)
        setName('')
        setTopic('')
      } else {
        if (response?.message) {
          Alert.alert(response.message);
        } else {
          Alert.alert("An error occured");
        }
      }
    } else {
      Alert.alert("Fill in all space");
    }
    setUploading(false);
  }
  return (
    <>
      <ScrollView style={tw`w-full`}>
        <View style={tw`p-8 mt-2 flex-1`}>
          <View style={tw`flex flex-row justify-between`}>
            <View>
              <Text style={tw`text-2xl font-bold mb-1`}>Hi {storedInformation.username}</Text>
              <Text style={tw`text-gray-300`}>Explore
                <Text style={tw`ml-150 text-xl font-bold text-black`}> {learningTopics.length}</Text> new molecules</Text>
            </View>
            <MaterialIcons name='account-circle' style={tw`mb-5`} size={40} color="black" />
          </View>
          {
            uploading ? <Loader />
              : null
          }
          {
            image ?
              <View style={styles.imageContainer}>
                <MaterialIcons name='close' size={40} color="black" style={styles.closeImage} onPress={() => setImage(null)} />
                <Image source={image} style={styles.displayImage} />
              </View> : null
          }
          <View style={tw`flex flex-row justify-between my-3`}>
            <TouchableOpacity style={styles.addButton}
              onPress={pickImage}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.inputTitle}
              placeholder='Add new topic'
              value={topic}
              onChangeText={(text) => setTopic(text)}
            />
            <TextInput
              style={styles.inputName}
              placeholder='H2O'
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TouchableOpacity style={styles.saveButton}
              disabled={topic.length === 0 || name.length === 0}
              onPress={() => addNewTopic()}>
              <Text style={styles.saveButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-col justify-between mt-5`}>
            {
              learningTopics.map((item, index) => {
                return (
                  <Pressable onPress={() => navigation.navigate("MoleculeDetails", { item })} key={index} style={tw` bg-cyan-50 rounded-4 p-6 mb-5 flex flex-row items-center`}>
                    <View><Image source={require("../../assets/chemdojo2.jpg")} resizeMode='contain' style={tw`w-20 h-20`} /></View>
                    <View style={tw`ml-5`}>
                      <Text style={tw`font-semibold text-xl`}>{item.topic}</Text>
                      <Text style={tw`text-xs`}>{item.name}</Text>
                    </View>
                  </Pressable>
                )
              })
            }

          </View>
        </View>

        {/* <BottomSheet
          ref={bottomSheetRef.current}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetScrollView>
            <View style={tw`p-8`}>
              <View style={tw`flex flex-col justify-between items-center `}>
                <Text style={tw` text-center text-xl font-semibold`}>Sulphur Dioxide</Text>
                <Image source={require("../../assets/SO.png")} resizeMode='contain' style={tw`h-30 w-40`} />
                <Image source={require("../../assets/Sostructure.jpg")} resizeMode='contain' />
                <TouchableOpacity onPress={() => alert("View details")}>
                  <Text style={tw`text-lg font-bold text-teal-800 mt-5 text-center`}>View Details</Text>
                </TouchableOpacity>
              </View>

            </View>
          </BottomSheetScrollView>
        </BottomSheet> */}

      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "blue",
    borderRadius: 50,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 30,
  },
  saveButton: {
    backgroundColor: "blue",
    borderRadius: 10,
    width: 50,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 15,
  },
  inputTitle: {
    paddingLeft: 10,
    borderWidth: 1,
    width: "45%",
    borderRadius: 10,
  },
  inputName: {
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: "20%",
  },
  imageContainer: {
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  displayImage: {
    height: 200,
    width: "100%"
  },
  closeImage: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 100,
  }
})

export default Learn