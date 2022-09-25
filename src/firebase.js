import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyAwfU6_fEGZAK_6sv-KP8UO5SzMSeGXPf0",
    authDomain: "linkedinclone-f96f0.firebaseapp.com",
    projectId: "linkedinclone-f96f0",
    storageBucket: "linkedinclone-f96f0.appspot.com",
    messagingSenderId: "595442925008",
    appId: "1:595442925008:web:994a68a7774909cf63cdd5",
    measurementId: "G-F4XB6Y9B3Q"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp)
  const db=firebaseApp.firestore();
  const auth=firebaseApp.auth();
  

  export { storage,auth,db };