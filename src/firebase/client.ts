// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8wCC2sET6sL67lsBqhdnUlVYFgEIYI54",
  authDomain: "wing-diaries-comment-80bb4.firebaseapp.com",
  projectId: "wing-diaries-comment-80bb4",
  storageBucket: "wing-diaries-comment-80bb4.firebasestorage.app",
  messagingSenderId: "334467194484",
  appId: "1:334467194484:web:a3d87266e43bfdadfefb21",
  measurementId: "G-DGVDJXX72L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };