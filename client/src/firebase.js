/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "byte-blogs.firebaseapp.com",
  projectId: "byte-blogs",
  storageBucket: "byte-blogs.appspot.com",
  messagingSenderId: "871846857024",
  appId: "1:871846857024:web:0105d422c19c792db8d2a5",
  measurementId: "G-GE87N42HYL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);