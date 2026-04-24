import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA4nrOrHDF3oaCfDFw4mpKTW_bKvF9HXLs",
  authDomain: "matrix-28fc7.firebaseapp.com",
  projectId: "matrix-28fc7",
  storageBucket: "matrix-28fc7.firebasestorage.app",
  messagingSenderId: "659599179244",
  appId: "1:659599179244:web:bf74fb625d1616251054c9",
  measurementId: "G-QY02YY0EY3"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)