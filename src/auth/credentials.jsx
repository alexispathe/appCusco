// Credenciales para autenticarnos con el servidor de firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiYaenSQtbe8ehaGfl00Dn3JSPmqReTxg",
  authDomain: "appcusco-77b11.firebaseapp.com",
  projectId: "appcusco-77b11",
  storageBucket: "appcusco-77b11.appspot.com",
  messagingSenderId: "597154056703",
  appId: "1:597154056703:web:ae8a617a93080ff83effca"
};
// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);