// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKYeXj-GQr63tByCCpQTaCRsT68X8tNTw",
  authDomain: "momentumplus-232c9.firebaseapp.com",
  projectId: "momentumplus-232c9",
  storageBucket: "momentumplus-232c9.appspot.com",
  messagingSenderId: "263430192187",
  appId: "1:263430192187:web:1e20e0ff6378eb9608b01e",
  measurementId: "G-GVQVRJGJ2Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
//const analytics = getAnalytics(app);
