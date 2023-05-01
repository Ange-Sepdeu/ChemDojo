import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react'
import { StyleSheet, Text, Modal, TextInput, Alert } from 'react-native'
import { ScrollView, View, Image, TouchableOpacity, Pressable } from 'react-native'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import tw from 'twrnc'
import { dataMolecules } from '../constants'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Alkanes, Topics } from '../constants'
import { RadioButton } from 'react-native-paper'
import quizService from '../api/quizService'
import Loader from '../components/Loader'
import { getVariable } from '../services/AsyncStorageMethods'

function Quiz({ navigation, route }) {
    const { item } = route.params;
    const bottomSheetRef = useRef < BottomSheet > (null);
    const snapPoints = useMemo(() => ['10%', '50%'], []);

    const [answers, setAnswers] = useState([]);
    const [currentQuiz, setCurrentQuiz] = useState({
        answers: [],
        question: "",
        id: "",
    });
    const [currentSet, setCurrentSet] = useState(false);

    const [userAnswers, setUserAnswers] = useState([]);
    const [userAns, setUserAns] = useState(null);

    const [addAnswer, setAddAnser] = useState("");
    const [question, setQuestion] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [timer, setTimer] = React.useState({ min: 0, sec: 0 })
    const [checked, setChecked] = React.useState({ isCheckEd: false, id: 0 })
    const handleCheck = (ansItem) => {
        if (!userAnswers?.find((item) => (item.answer === ansItem && item.quizId === currentQuiz.id))) {
            let newUserAnwser = []
            if (userAnswers?.find((item) => item.quizId === currentQuiz.id)) {
                newUserAnwser = userAnswers.filter(itm => itm.quizId !== currentQuiz.id);
                setUserAnswers([])
                setUserAnswers([...newUserAnwser, {
                    quizId: currentQuiz.id,
                    answer: ansItem,
                }])
            } else {
                setUserAnswers([...userAnswers, {
                    quizId: currentQuiz.id,
                    answer: ansItem,
                }])
            }
        }
    }

    const handleAnswerCheck = (id) => {
        setAnswers(answers.reduce((prev, next, index) => {
            if (index === id) {
                return [...prev, { ...next, correct: true }]
            } else {
                return [...prev, { ...next, correct: false }]
            }
        }, []))
    }
    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState([]);

    const getQuiz = () => {
        setLoading(true);
        quizService.listQuiz(item.id).then((response) => {
            setQuiz(response.data)
        }).finally(() => {
            setLoading(false);
        })
    }
    const getUserAnswers = async () => {
        setLoading(true);
        const userInfo = await getVariable("locationUserInfo")
        quizService.listUserQuizAnswer(item.id, userInfo.id).then((response) => {
            setUserAns(response.data)
        }).finally(() => {
            setLoading(false);
        })
    }

    const changeQuestion = (value) => {
        if (value == "next") {
            setCurrentQuiz(quiz[currentIndex + 1]);
            setCurrentIndex(currentIndex + 1)
        } else {
            setCurrentQuiz(quiz[currentIndex - 1]);
            setCurrentIndex(currentIndex - 1)
        }
    }

    useEffect(() => {
        getQuiz();
        getUserAnswers();
    }, [])

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (quiz?.length > 0 && !currentSet) {
            setCurrentQuiz(quiz[0]);
            setCurrentIndex(0);
            setCurrentSet(true);
        }
    }, [quiz])

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setCounter(0);
        setCounter(quiz.reduce((prev, next) => {
            const trueAns = next?.answers?.find(item => item.correct === true);
            if(userAns?.answers?.find(item => (item.answer === trueAns.answer && item.quizId === next.id))){
                return prev + 1;
            }else {
                return prev
            }
        }, 0))
    }, [quiz, userAns])

    const addMethod = () => {
        if (answers?.find((item) => item.answer === addAnswer)) {
            Alert.alert("this answer already exist")
        } else {
            if (answers.length === 0) {
                setAnswers([...answers, { answer: addAnswer, correct: true }])
            } else {
                setAnswers([...answers, { answer: addAnswer, correct: false }])
            }
            setAddAnser("");
        }
    }

    const addQuiz = async () => {
        setLoading(true);
        if (question.length > 0) {
            const response = await quizService.addQuiz({
                question,
                topicId: item.id,
                answers,
            });
            if (response.statusCode === 200) {
                Alert.alert("Quiz added successfully");
                setQuiz([...quiz, response.data]);
                setModalVisible(!modalVisible);
            } else {
                if (response?.message) {
                    Alert.alert(response.message);
                } else {
                    Alert.alert("An error occured");
                }
            }
        } else {
            Alert.alert("Add a question");
        }
        setLoading(false);
    }

    const removeAnswer = (text) => {
        setAnswers(answers.filter(item => item.answer != text))
    }

    const validateAnswer = async () => {
        setLoading(true);
        const userInfo = await getVariable("locationUserInfo")
        const response = await quizService.addUserQuizAnswer({
            answers: userAnswers,
            topicId: item.id,
            userId: userInfo.id
        });
        if (response.statusCode === 200) {
            Alert.alert("Answer saved successfully");
            getUserAnswers();
        } else {
            if (response?.message) {
                Alert.alert(response.message);
            } else {
                Alert.alert("An error occured");
            }
        }
        setLoading(false);
    }

    const checkAnswerStatus = (item) => {
        const ans = userAns?.answers?.find(item => item.quizId === currentQuiz.id)
        if (ans) {
            if (item.correct === true) {
                if (item.answer === ans.answer) {
                    return "correct";
                }
            }else{
                if (item.answer === ans.answer) {
                    return "wrong";
                }

            }
            return "changed";
        }
        return "unChanged";
    }

    return (
        <View style={tw`p-8 bg-blue-950 h-full`}>
            {
                loading ? <Loader />
                    : null
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>

                <View style={[styles.centeredView]}>
                    <View style={styles.modalView}>
                        <MaterialIcons name='close' size={30} color="black" style={styles.closeImage} onPress={() => setModalVisible(!modalVisible)} />
                        <ScrollView>
                            <Text style={styles.modalText}>Add New Question</Text>
                            <TextInput
                                style={tw`border-b border-b-gray-200  p-4 mt-2 w-60 mb-5`}
                                value={question}
                                onChangeText={(text) => setQuestion(text)}
                                placeholder="Enter your question"
                                numberOfLines={2}
                                multiline={true}
                            />
                            {
                                answers?.map((item, index) => {
                                    return (
                                        <View key={index} style={[tw`flex flex-row mb-5 items-center`]}>
                                            <RadioButton
                                                value={item}
                                                status={item.correct ? 'checked' : 'unchecked'}
                                                onPress={() => handleAnswerCheck(index)}
                                            />
                                            <Text key={index} style={[tw` text-xl text-justify`, styles.anwserText]}>{String.fromCharCode(index + 65)}. {item.answer}</Text>
                                            <MaterialIcons name='close' size={20} color="red" style={styles.closeImage} onPress={() => removeAnswer(item.answer)} />
                                        </View>
                                    )
                                })
                            }
                            <View style={styles.addNewAn}>
                                <TextInput
                                    style={tw`border-b border-b-gray-200  p-4 mt-2 w-50 mb-5`}
                                    value={addAnswer}
                                    onChangeText={(text) => setAddAnser(text)}
                                    placeholder="Add new Answer"
                                />


                                <TouchableOpacity style={styles.saveButton}
                                    disabled={addAnswer.length === 0}
                                    onPress={() => addMethod()}>
                                    <Text style={styles.saveButtonText}>Add</Text>
                                </TouchableOpacity>

                            </View>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                disabled={question.length === 0 && answers.length === 0}
                                onPress={() => addQuiz()}
                            >
                                <Text style={styles.textStyle}>Register Question</Text>
                            </Pressable>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.quizContainer}>
                <Text style={styles.quizText}>Add Question</Text>
            </TouchableOpacity>
            <ScrollView style={tw`pb-10`}>
                <Text style={tw`text-3xl mb-5 text-white`}>Topic: {item.name} </Text>
                <Text style={tw`text-xl mb-5 text-white`}>Mark: {counter}/{quiz?.length} </Text>
                <Text style={tw`text-white font-bold`}> GoodLuck </Text>
                <View style={tw`flex flex-row justify-between mt-5`}>
                    <Text style={tw`text-white text-2xl`}>Question {currentIndex + 1}: {currentQuiz?.question}</Text>
                </View>
                <Image source={require('../../assets/chemdojo2.jpg')} resizeMode='contain' style={tw`w-full mt-2 mb-5`} />
                <View style={{ marginTop: 60 }}>
                </View>
            </ScrollView>
            <BottomSheet
                ref={bottomSheetRef.current}
                index={0}
                snapPoints={snapPoints}
            >
                <BottomSheetScrollView>
                    <View style={tw`pl-8 pr-8`}>
                        <Text style={tw`pb-5 text-center text-xl`}>Answers</Text>
                        {
                            currentQuiz?.answers.map((item, index) => {
                                const status = checkAnswerStatus(item);
                                return (
                                    <View key={index} style={[tw`flex flex-row mb-5  items-center`, 
                                        status === "correct" ?{backgroundColor: "green"}: status === "wrong"? {backgroundColor: "red"} :null ]}>
                                        {
                                            status === "unChanged" ?
                                                <RadioButton
                                                    value={item}
                                                    status={userAnswers?.find((uA) => uA.answer === item.answer) ? 'checked' : 'unchecked'}
                                                    onPress={() => handleCheck(item.answer)}
                                                />
                                                : null
                                        }
                                        <Text key={index} style={[tw` text-xl text-justify`, styles.anwserText]}>{String.fromCharCode(index + 65)}. {item.answer}</Text>
                                    </View>
                                )
                            })
                        }
                        <Text>Time left: {timer.min} : {timer.sec}</Text>
                        <View style={tw`flex flex-row justify-between items-center mt-5`}>
                            {
                                currentIndex !== 0 ?
                                    <TouchableOpacity style={tw`items-center`}
                                        disabled={currentIndex === 0}
                                        onPress={() => changeQuestion("prev")}
                                    >
                                        <View style={tw`flex flex-row`}>
                                            <Entypo name='chevron-left' size={20} />
                                            <Text>Previous Question</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <View></View>
                            }
                            {
                                currentIndex !== quiz.length - 1 ?
                                    <TouchableOpacity style={tw`items-center`}
                                        onPress={() => changeQuestion("next")}
                                        disabled={currentIndex === quiz.length - 1}
                                    >
                                        <View style={tw`flex flex-row`}>
                                            <Text>Next Question</Text>
                                            <Entypo name='chevron-right' size={20} />
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    userAnswers.length === quiz.length ?
                                        <TouchableOpacity style={tw`bg-orange-700 p-4 rounded-2xl`} onPress={() => validateAnswer()}>
                                            <Text style={tw`text-white`}>Validate</Text>
                                        </TouchableOpacity> : null
                            }
                        </View>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>



        </View>
    )
}

const styles = StyleSheet.create({
    addNewAn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
    closeImage: {
        position: "absolute",
        right: 10,
        top: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "80%",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 10,
        textAlign: 'center',
    },
    quizContainer: {
        position: "absolute",
        zIndex: 1000,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        right: 20,
        top: 20,
    },
    anwserText: {
        fontSize: 15,
    }
});

export default Quiz