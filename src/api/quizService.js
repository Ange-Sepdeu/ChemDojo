import { apiResponse } from "./client";
import { app, auth } from "../config/firebaseConfig";
import { addDoc, collection, doc, getFirestore, getDocs, query, updateDoc, where, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { randomString } from "../services/AES";
import {setVariable} from '../services/AsyncStorageMethods'

const db = getFirestore(app);

const addQuiz = async (data) => {
    try {
        var exist = false;
        let quizData = {
            question: data.question,
            topicId: data.topicId,
            answers: data.answers,
        };
        quizData.id = randomString(20)
        const querySnapshot = await getDocs(collection(db, "quiz"));
            querySnapshot.forEach((doc) => {
                if (doc.data().question == quizData.question && doc.data().topicId == quizData.topicId) {
                    exist = true;
                }
            });
            if (!exist) {
                await setDoc(doc(db, "quiz", quizData.id ), quizData);
                return apiResponse(200, "quiz created successfully", quizData);
            }else{
                return apiResponse(422, "this question already exist in this topic", quizData)
            }
    } catch (error) {
        console.log("Error adding quiz", error);
        return apiResponse(400, "Error adding quiz", error)
    }
};


const addUserQuizAnswer = async (data) => {
    try {
        console.log("data", data)
        var exist = false;
        let quizData = {
            answers: data.answers,
            topicId: data.topicId,
            userId: data.userId,
        };
        quizData.id = randomString(20)
        const querySnapshot = await getDocs(collection(db, "userQuizAnswer"));
            querySnapshot.forEach((doc) => {
                if (doc.data().userId == quizData.userId && doc.data().topicId == quizData.topicId) {
                    exist = true;
                }
            });
            if (!exist) {
                await setDoc(doc(db, "userQuizAnswer", quizData.id ), quizData);
                return apiResponse(200, "user answer saved created successfully", quizData);
            }else{
                return apiResponse(422, "user has already answered this topic", quizData)
            }
    } catch (error) {
        console.log("Error adding quiz", error);
        return apiResponse(400, "Error adding quiz", error)
    }
};

const listQuiz = async (id) => {
    try {
        var quiz = [];
        const querySnapshot = await getDocs(collection(db, "quiz"));
            querySnapshot.forEach((doc) => {
                if (doc.data().topicId === id) {
                    quiz.push(doc.data())                    
                }
            });
            return apiResponse(200, "quiz listed successfully", quiz);

    } catch (error) {
        console.log("Cant list quiz", error);
        return apiResponse(400, "Cant list quiz", error)
    }
}


const listUserQuizAnswer = async (id, uId) => {
    try {
        var quiz = {};
        const querySnapshot = await getDocs(collection(db, "userQuizAnswer"));
            querySnapshot.forEach((doc) => {
                if (doc.data().topicId === id && doc.data().userId === uId) {
                    quiz = doc.data();                    
                }
            });
            return apiResponse(200, "User quiz listed successfully", quiz);

    } catch (error) {
        console.log("Cant list user quiz", error);
        return apiResponse(400, "Cant list user quiz", error)
    }
}

export default {addQuiz, listQuiz, listUserQuizAnswer, addUserQuizAnswer};