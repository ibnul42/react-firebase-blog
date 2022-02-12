import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCwLs_IGJKdi95WuASFBBUGg8keQLdeZ1s",
    authDomain: "react-firebase-blog-8b511.firebaseapp.com",
    projectId: "react-firebase-blog-8b511",
    storageBucket: "react-firebase-blog-8b511.appspot.com",
    messagingSenderId: "1091010006455",
    appId: "1:1091010006455:web:a2dfa424a8997456f9ac32",
    measurementId: "G-G4PK8P2NTP"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);