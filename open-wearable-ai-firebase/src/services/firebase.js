// Import the functions you need from the SDKs you need
import { getFirestore, connectFirestoreEmulator, } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import { initializeApp } from "firebase/app";
console.log(import.meta.env);
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const functions = getFunctions();
if (import.meta.env.DEV) {
    connectFunctionsEmulator(functions, "localhost", 5001);
}

export let IS_LOCALHOST = window.location.hostname === "localhost";
const LOCAL_SERVER_URL = `http://127.0.0.1:5001/${import.meta.env.VITE_FIREBASE_PROJECT_ID}/${import.meta.env.VITE_FIREBASE_REGION}`
const PROD_SERVER_URL = `https://us-central1-${import.meta.env.VITE_FIREBASE_PROJECT_ID}.cloudfunctions.net`
const BASE_SERVER_URL = IS_LOCALHOST ? LOCAL_SERVER_URL : PROD_SERVER_URL;
export const ADD_TEXT_URL = BASE_SERVER_URL + "/webaddtextmessagetoassistant";

export { db, app, functions };
