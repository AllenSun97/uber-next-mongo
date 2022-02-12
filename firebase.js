// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh0Pkd_MQzeQAeGCR9mnt0JwsKkTjMYGw",
  authDomain: "uber-next-e5d37.firebaseapp.com",
  projectId: "uber-next-e5d37",
  storageBucket: "uber-next-e5d37.appspot.com",
  messagingSenderId: "956825593739",
  appId: "1:956825593739:web:0ac782015249e78260718e",
  measurementId: "G-DK75K38L3T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };
