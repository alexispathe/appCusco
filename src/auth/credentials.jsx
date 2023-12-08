// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2FOpZRQbaZru0Gi-9EHLLfdmZzCzzfLo",
  authDomain: "crudcusco.firebaseapp.com",
  projectId: "crudcusco",
  storageBucket: "crudcusco.appspot.com",
  messagingSenderId: "962248397236",
  appId: "1:962248397236:web:4d857ec89a395a906b62e1"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);