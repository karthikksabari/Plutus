import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// --- PASTE YOUR FIREBASE CONFIG HERE ---
// (It looks like this, but use YOUR specific keys from the console)
const firebaseConfig = {
  apiKey: "AIzaSyAyRTFS4R-8Us2IgFIEza2YQ_8-S2Nlknk",
  authDomain: "plutus-47e6c.firebaseapp.com",
  projectId: "plutus-47e6c",
  storageBucket: "plutus-47e6c.firebasestorage.app",
  messagingSenderId: "718623311612",
  appId: "1:718623311612:web:62fc54f443822db302f979",
  measurementId: "G-22DC5Q0PK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Login Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// Logout Function
export const logoutUser = () => signOut(auth);

export { auth };