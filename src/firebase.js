// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
// import {
//   FirebaseAppProvider,
//   FirestoreProvider,
//   useFirestoreDocData,
//   useFirestore,
//   useFirebaseApp,
// } from "reactfire";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5xki1EHfcfFOq9_SmkuOHkpqpnV_v7AE",
  authDomain: "where-is-waldo-77531.firebaseapp.com",
  projectId: "where-is-waldo-77531",
  storageBucket: "where-is-waldo-77531.appspot.com",
  messagingSenderId: "791076871588",
  appId: "1:791076871588:web:4f84685572e7067d857531",
  measurementId: "G-CM0CNZL1YM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default getFirestore();
