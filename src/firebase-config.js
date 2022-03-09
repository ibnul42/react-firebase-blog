import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXYnXaSgI9dwRvHcJPU1HLAQK7TktN-Qs",
  authDomain: "fir-blog-14c0a.firebaseapp.com",
  databaseURL: "https://fir-blog-14c0a-default-rtdb.firebaseio.com",
  projectId: "fir-blog-14c0a",
  storageBucket: "fir-blog-14c0a.appspot.com",
  messagingSenderId: "150430442941",
  appId: "1:150430442941:web:9e44dfecce8b4b90765ed4",
  measurementId: "G-TKQGG59P7X",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const realtimeDB = getDatabase(app);
export const storage = getStorage(app);
