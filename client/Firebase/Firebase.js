// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_Y_80Q9rmhQZ5s2nHqSbQLIYBs_Cwi-s",
  authDomain: "fixypg.firebaseapp.com",
  projectId: "fixypg",
  storageBucket: "fixypg.appspot.com",
  messagingSenderId: "330532822126",
  appId: "1:330532822126:web:322e8cc556e0d752159a7f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
