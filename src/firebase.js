// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHGVPjNemZ7A1hCYTdo4IM19kEnnnpOMs",
  authDomain: "astrid-checkin.firebaseapp.com",
  projectId: "astrid-checkin",
  storageBucket: "astrid-checkin.appspot.com",
  messagingSenderId: "843974718313",
  appId: "1:843974718313:web:1465a8cef59c92685e43f8",
  measurementId: "G-PC1S244EHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);