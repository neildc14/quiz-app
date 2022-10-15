// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv5BS1akuvS7iCDhiSXXZgZCoTm2IJjJU",
  authDomain: "quiz-app-df464.firebaseapp.com",
  projectId: "quiz-app-df464",
  storageBucket: "quiz-app-df464.appspot.com",
  messagingSenderId: "676273628136",
  appId: "1:676273628136:web:77c3c62380db434f44fa5d",
  measurementId: "G-158K6J971H",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
