import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyApQiCk_hBlG4ZbCI87qFxoR64kPxH3Qh4",
  authDomain: "aula-login-ad22d.firebaseapp.com",
  projectId: "aula-login-ad22d",
  storageBucket: "aula-login-ad22d.appspot.com",
  messagingSenderId: "955981809340",
  appId: "1:955981809340:web:c4db07f35d9a08ea28f2b9",
  measurementId: "G-VWMJKXYHEB"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }