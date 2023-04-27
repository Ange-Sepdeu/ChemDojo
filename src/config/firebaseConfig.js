// firebaseConfig.js
import  { initializeApp }  from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCjRbpUA7fQlYd2aVN6cEiRl_OI9-1mFB8",
    authDomain: "chemdojo-b5f9d.firebaseapp.com",
    projectId: "chemdojo-b5f9d",
    storageBucket: "chemdojo-b5f9d.appspot.com",
    messagingSenderId: "135438539007",
    appId: "1:135438539007:web:a4440b5575f13880c454ca",
    measurementId: "G-9Q2G8SLHM5"
};

const app = initializeApp(firebaseConfig);


export { app, firebaseConfig };
