// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArgLSTujSkbtloGPsKQmAK5e0bsdI7ZuA",
  authDomain: "prepa-firebase-prueba.firebaseapp.com",
  projectId: "prepa-firebase-prueba",
  storageBucket: "prepa-firebase-prueba.appspot.com",
  messagingSenderId: "389829168658",
  appId: "1:389829168658:web:a2774bf10f1d12dbc592cb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
