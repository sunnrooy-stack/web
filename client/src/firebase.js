// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vibe-be852.firebaseapp.com",
  projectId: "vibe-be852",
  storageBucket: "vibe-be852.firebasestorage.app",
  messagingSenderId: "118942923345",
  appId: "1:118942923345:web:827ab89b431b4b9d689670",
  measurementId: "G-VGDJHKK196"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
