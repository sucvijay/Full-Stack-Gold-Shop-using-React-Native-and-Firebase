import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";


const firebaseConfig = {

    apiKey: "AIzaSyDqQGluQZh4qfJyx-b-i3UvGgAq8pexwrg",
    authDomain: "nextgen-jewels.firebaseapp.com",
    projectId: "nextgen-jewels",
    storageBucket: "nextgen-jewels.appspot.com",
    messagingSenderId: "746001124904",
    appId: "1:746001124904:web:b8ae6da4abd0b901102f1d",
    measurementId: "G-MLRVV2GB65"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);



