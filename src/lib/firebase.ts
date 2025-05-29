// src/lib/firebase.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgqw1suUdAw9bglK-jso0Ksv6eyVqVu_s",
  authDomain: "create-me-66c94.firebaseapp.com",
  projectId: "create-me-66c94",
  storageBucket: "create-me-66c94.firebasestorage.app",
  messagingSenderId: "1007765179261",
  appId: "1:1007765179261:web:09dc8af22a3724bce9da14"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
