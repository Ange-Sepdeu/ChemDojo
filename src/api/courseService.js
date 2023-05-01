import { apiResponse } from "./client";
import { app, auth } from "../config/firebaseConfig";
import { addDoc, collection, doc, getFirestore, getDocs, query, updateDoc, where, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { randomString } from "../services/AES";
import {setVariable} from '../services/AsyncStorageMethods'

const db = getFirestore(app);

const addCourses = async (data) => {
    try {
        var exist = false;
        let courseData = {
            title: data.title,
            topicId: data.topicId,
            description: data.description,
        };
        courseData.id = randomString(20)
        const querySnapshot = await getDocs(collection(db, "courses"));
            querySnapshot.forEach((doc) => {
                if (doc.data().title == courseData.title && doc.data().topicId == courseData.topicId) {
                    exist = true;
                }
            });
            if (!exist) {
                await setDoc(doc(db, "courses", courseData.id ), courseData);
                return apiResponse(200, "Course created successfully", courseData);
            }else{
                return apiResponse(422, "this title already exist in this topic", courseData)
            }
    } catch (error) {
        console.log("Error adding course", error);
        return apiResponse(400, "Error adding course", error)
    }
};

const listCourses = async (id) => {
    try {
        var courses = [];
        const querySnapshot = await getDocs(collection(db, "courses"));
            querySnapshot.forEach((doc) => {
                if (doc.data().topicId === id) {
                    courses.push(doc.data())                    
                }
            });
            return apiResponse(200, "Courses listed successfully", courses);

    } catch (error) {
        console.log("Cant list courses", error);
        return apiResponse(400, "Cant list courses", error)
    }
}

export default {addCourses, listCourses};