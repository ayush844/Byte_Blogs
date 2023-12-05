// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "byteblog-8dfcd.firebaseapp.com",
  projectId: "byteblog-8dfcd",
  storageBucket: "byteblog-8dfcd.appspot.com",
  messagingSenderId: "1063691136208",
  appId: "1:1063691136208:web:7abdd644d78023f6cb42d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);