// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-zaYDDDOi6SrQcaNmLkJspG-AfVChMIA",
  authDomain: "mobile-cross-lat.firebaseapp.com",
  projectId: "mobile-cross-lat",
  storageBucket: "mobile-cross-lat.appspot.com",
  messagingSenderId: "4657680679",
  appId: "1:4657680679:web:92e2160d01946215911902"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
