// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8XwxrjjzGsc1GbFB9jT9B0GiQ_uIXppc",
  authDomain: "react-prep-b47d8.firebaseapp.com",
  databaseURL: "https://react-prep-b47d8-default-rtdb.firebaseio.com",
  projectId: "react-prep-b47d8",
  storageBucket: "react-prep-b47d8.appspot.com",
  messagingSenderId: "768926798249",
  appId: "1:768926798249:web:28721ccc1af1007b13b4b8",
  measurementId: "G-7KLMGNKL48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
