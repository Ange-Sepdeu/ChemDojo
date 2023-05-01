import { apiResponse } from "./client";
import { app, auth } from "../config/firebaseConfig";
import { addDoc, collection, doc, getFirestore, getDocs, query, updateDoc, where, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { randomString } from "../services/AES";
import {setVariable} from '../services/AsyncStorageMethods'


const db = getFirestore(app);
const addUser = async (userData) => {
    try {
        var exist = false;
        userData.id = randomString(20)
        const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                if (doc.data().email == userData.email) {
                    exist = true;
                }
            });
            if (!exist) {
                await setDoc(doc(db, "users", userData.id ), userData);
                return apiResponse(200, "User created successfully", userData);
            }else{
                return apiResponse(422, "This user Email is already in use", userData)
            }
    } catch (error) {
        console.log("Error adding user", error);
        return apiResponse(400, "Error adding user", error)
    }
}


const loginUser = async (userData) => {
    try {
        var exist = false;
        const querySnapshot = await getDocs(collection(db, "users"));
            var userInformation = null;
            querySnapshot.forEach((doc) => {
                if (doc.data().email == userData.email && doc.data().password == userData.password) {
                    exist = true;
                    userInformation = doc.data();
                }
            });
            if (exist) {
                setVariable(userInformation, "locationUserInfo")
                return apiResponse(200, "Login Successfully", userInformation);
            }else{
                return apiResponse(422, "Wrong credentials", userData);
            }
    } catch (error) {
        console.log("Error adding user", error);
        return apiResponse(400, "Error adding user", error)
    }
}

const logOut = async () => {
    try {
        setVariable(null, "locationUserInfo")
        return apiResponse(200, "logOut Successfully", {});
    } catch (error) {
        console.log("Error login out user", error);
        return apiResponse(400, "Error login out user", error)
    }
}

// productRef.forEach((doc) => {
//   var data = doc.data();
//   data["fId"] = doc.id;
//   products.push(data);
// });

const getAuthUser = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            return apiResponse(200, "Successfully authenticated user", user)
        } else {
            return apiResponse(400, "Sorry user does not exist")
        }
    } catch (error) {
        console.log("getAuthUser Error: ", error);

    }

}

const updateUserCollection = async (data) => {
    try {
        const auth = getAuth();
        const docRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(docRef, data);
        var currentUser = await findUser(auth.currentUser.uid);
        return apiResponse(200, "User profile successfully updated", currentUser)
    } catch (error) {
        console.log("updateUserCollection Error: ", error);
        return apiResponse(400, "Sorry there was an error updating user")
    }
}

const updateAuthUser = async (data) => {
    try {
        const auth = getAuth();
        await updateProfile(auth.currentUser, data);
        return apiResponse(200, "User profile successfully updated", auth.currentUser)
    } catch (error) {
        console.log("updateAuthUser Error: ", error);
        return apiResponse(400, "Sorry there was an error updating user")
    }
}

const updateUserPassword = async (newPassword) => {
    const user = auth.currentUser;
    try {
        if (newPassword != null || newPassword.length == 0) {
            const authMethod = user['providerId'];
            if (authMethod == "email_and_password") {
                var res = await updatePassword(user, newPassword);
                return apiResponse(200, "Password successfully password", res)
            }
        } s
    } catch (error) {
        console.log("updateUserPassword Error: ", error);
        return apiResponse(400, "Sorry there was an error updating password")
    }
}

const findUser = async (uid) => {
    var user = [];
    console.log("User Find Service", uid);
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        var user = docSnap.data();
        if (docSnap.exists()) {
            return apiResponse(200, "User successfully retrieved", user)
        } else {
            return apiResponse(400, "Sorry the user does not exist")
        }
    } catch (error) {
        console.log("findUser Error: ", error);
        return apiResponse(400, "Sorry the user does not exist")
    }

}
export default { addUser, loginUser, updateAuthUser, updateUserCollection, updateUserPassword, findUser, logOut }