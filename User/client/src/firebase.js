// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpfObJB6QgSJXs0Xd7uZetakqHODvkD4I",
  authDomain: "assessment-platform-fa01f.firebaseapp.com",
  projectId: "assessment-platform-fa01f",
  storageBucket: "assessment-platform-fa01f.appspot.com",
  messagingSenderId: "427055165609",
  appId: "1:427055165609:web:e2f2a462626673485839b8",
  measurementId: "G-ES16DP91DS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {app, auth};