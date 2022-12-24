import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA1wHIV3_Uv772r_mzNNHrJEBevOLR7XkA",
  authDomain: "rlgouvea-a860e.firebaseapp.com",
  projectId: "rlgouvea-a860e",
  storageBucket: "rlgouvea-a860e.appspot.com",
  messagingSenderId: "1057327392884",
  appId: "1:1057327392884:web:c76f326e6eac30a68dc921"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }