import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAm8dDV1HEXDKcsoj535xbo0FqjM3Q0x7g",
  authDomain: "posapp-afd6f.firebaseapp.com",
  projectId: "posapp-afd6f",
  storageBucket: "posapp-afd6f.firebasestorage.app",
  messagingSenderId: "742610729359",
  appId: "1:742610729359:web:896f44fabc9c9544a473fa",
  measurementId: "G-CLZ1XYK53V"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics, logEvent };
