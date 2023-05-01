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

export default {addQuiz, listQuiz};