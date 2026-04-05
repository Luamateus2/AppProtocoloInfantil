// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVu6TTUIrT9GDwnbl_Uar1jFmsRq5fsFU",
  authDomain: "protocoloinfantil.firebaseapp.com",
  databaseURL: "https://protocoloinfantil-default-rtdb.firebaseio.com",
  projectId: "protocoloinfantil",
  storageBucket: "protocoloinfantil.firebasestorage.app",
  messagingSenderId: "404025904798",
  appId: "1:404025904798:web:a72adc39a741167a9bf58f",
  measurementId: "G-3E1HJKFBE9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


