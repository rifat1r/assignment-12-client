// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgOvw9rcIYxfnTApBi8dmKdqhkFcfhwKs",
  authDomain: "assignment-12-ca453.firebaseapp.com",
  projectId: "assignment-12-ca453",
  storageBucket: "assignment-12-ca453.appspot.com",
  messagingSenderId: "665379259290",
  appId: "1:665379259290:web:dac098ff9fe97da0d47023",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
