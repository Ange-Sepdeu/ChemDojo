import React, { useContext, useEffect } from 'react'
import { Alert, Image, TouchableOpacity } from 'react-native'
import { ScrollView, Text, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import tw from 'twrnc'
import { AppContext } from '../providers/AppContext'
import userService from '../api/userService'

function Home({ navigation }) {
    const { storedInformation, setStoredInformation } = useContext(AppContext);

    useEffect(() => {
        console.log("storedInformation", storedInformation)
    }, [storedInformation])
    return (
        <ScrollView style={tw`w-full`} >
            <View style={tw`w-full p-4 mt-10`}>
                <TouchableOpacity 
                onPress={async () => {
                    try {
                      var res = await userService.logOut()
                
                      if (res.statusCode == 200) {
                        navigation.push("NavigationStacks")
                      } else {
                        Alert.alert(res.message)
                      }
                    } catch (error) {
                      console.log("error.message", error.message)
                      Alert.alert(error.message)
                    }
                }}
                style={{ backgroundColor: "red", position: "absolute", top: -20, right: 30, padding: 5, borderRadius: 5 }}>
                    <Text>
                        Logout
                    </Text>
                </TouchableOpacity>
                <Text style={tw`text-center text-4xl font-bold mb-10`}>ChemDojo</Text>
                <View style={tw`flex flex-row justify-evenly items-center flex-wrap`}>
                    <View style={tw`mb-5`}>
                        <TouchableOpacity style={tw`rounded-xl bg-white items-center p-2 shadow-black shadow-lg`} onPress={() => navigation.navigate("QuizTopic")}>
                            <Image source={require("../../assets/games.png")} resizeMode='contain' style={tw`w-30 h-20`} />
                            <Text style={tw`text-center text-black text-xl`}>Quiz</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tw`mb-5`}>
                        <TouchableOpacity style={tw`rounded-xl bg-white p-2 shadow-black shadow-lg`} onPress={() => navigation.navigate("Learn")}>
                            <Image source={require("../../assets/studies.png")} resizeMode='contain' style={tw`w-30 h-20`} />
                            <Text style={tw`text-center text-xl`}>Learn</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tw`mb-5`}>
                        <TouchableOpacity style={tw`rounded-xl bg-white p-2 shadow-black shadow-lg`}>
                            <Image source={require("../../assets/profile.png")} resizeMode='contain' style={tw`w-30 h-20`} />
                            <Text style={tw`text-xl text-center`}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tw`mb-5`}>
                        <TouchableOpacity style={tw`rounded-xl bg-white shadow-black shadow-lg p-2 items-center`}>
                            <Image source={require("../../assets/settings.png")} resizeMode='contain' style={tw`w-30 h-20`} />
                            <Text style={tw`text-center text-xl`}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tw`mb-5`}>
                        <TouchableOpacity style={tw`rounded-xl bg-white p-2 items-center shadow-black shadow-lg`}>
                            <Image source={require("../../assets/news.png")} resizeMode='contain' style={tw`w-30 h-20`} />
                            <Text style={tw`text-center text-xl`}>News</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tw`mb-5`}>
                        <TouchableOpacity style={tw`rounded-xl bg-white p-2 items-center shadow-black shadow-lg`}>
                            <Image source={require("../../assets/rewards.png")} resizeMode='contain' style={tw`w-30 h-20`} />
                            <Text style={tw`text-center text-xl`}>Rewards</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Home