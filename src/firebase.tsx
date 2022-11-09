import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyDtvwxjSSsBJPREJaWo-nNhUi2RMJLfXUM",
    authDomain: "co2car.firebaseapp.com",
    projectId: "co2car",
    storageBucket: "co2car.appspot.com",
    messagingSenderId: "949941028550",
    appId: "1:949941028550:web:fa3499e8baa524143279c7"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
