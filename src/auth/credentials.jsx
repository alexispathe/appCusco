// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu_unZjQiDL6heNhgNl8StPX6L7M_lDH0",
  authDomain: "aplicacioncusco.firebaseapp.com",
  projectId: "aplicacioncusco",
  storageBucket: "aplicacioncusco.appspot.com",
  messagingSenderId: "873097979989",
  appId: "1:873097979989:web:27c956c398f9ede8024cdc"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);