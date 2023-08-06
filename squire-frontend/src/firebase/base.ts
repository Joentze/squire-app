// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACJhzenqzbH1xZLjlSTmOkBZ16Z2FcDho",
  authDomain: "squire-backend-5c68c-e1794.firebaseapp.com",
  projectId: "squire-backend-5c68c",
  storageBucket: "squire-backend-5c68c.appspot.com",
  messagingSenderId: "214356405716",
  appId: "1:214356405716:web:0d8f42e9e9964d8e6e7a41",
  measurementId: "https://squire-backend-2uxu4fb6fq-as.a.run.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db, analytics };
