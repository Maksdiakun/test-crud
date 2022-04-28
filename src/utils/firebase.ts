import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_APP_ID, FIREBASE_APP_NAME, FIREBASE_KEY } from "../constans";

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: `${FIREBASE_APP_NAME}.firebaseapp.com`,
  projectId: FIREBASE_APP_NAME,
  storageBucket: `${FIREBASE_APP_NAME}.appspot.com`,
  messagingSenderId: "882764929115",
  appId: FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
