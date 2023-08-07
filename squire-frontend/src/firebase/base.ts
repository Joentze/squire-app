// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
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
const functions = getFunctions(app);
if (window.location.hostname.includes("localhost")) {
  connectFirestoreEmulator(db, "127.0.0.1", 8001);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export { auth, db, analytics };
