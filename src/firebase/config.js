import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDenoNuHyxw3KEo6zH4FyJZKedCegYZVhk",
  authDomain: "cardiomyopathiesdb.firebaseapp.com",
  projectId: "cardiomyopathiesdb",
  storageBucket: "cardiomyopathiesdb.appspot.com",
  messagingSenderId: "696952965061",
  appId: "1:696952965061:web:8b8bb8ec79653310de6dac"
};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFireStore, timestamp, projectAuth };
