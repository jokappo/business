// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC23u_hpoQq9pgmYo0xp3zjfZIPxg93Atk",
  authDomain: "mobile-react-native-2ff70.firebaseapp.com",
  projectId: "mobile-react-native-2ff70",
  storageBucket: "mobile-react-native-2ff70.appspot.com",
  messagingSenderId: "1095646313134",
  appId: "1:1095646313134:web:531f6b8cb50d9bf9a64b3f",
  measurementId: "G-SY5DSNQ67R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const bd = getFirestore(app)
export const storage = getStorage(app)
// const analytics = getAnalytics(app);