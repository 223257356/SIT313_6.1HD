// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJo1-dgtdn-ZEiPXvj62BNK604j8Am-TU",
  authDomain: "deakin-web-app-566d6.firebaseapp.com",
  projectId: "deakin-web-app-566d6",
  storageBucket: "deakin-web-app-566d6.appspot.com",
  messagingSenderId: "825272061851",
  appId: "1:825272061851:web:2433d4d902505bf691db3e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Set up Google Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

// Function to create a user document
export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth.email) return; // Ensure user has an email
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // If user doesn't exist in the database, create new user data
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation // Any other additional information like phone number can be added here
      });
    } catch (error) {
      console.log('Error in creating user document:', error.message);
    }
  }
  return userDocRef;
};

// Function to create a user with email and password and send verification email
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await sendEmailVerification(user);
  return userCredential;
};

// Sign in the user using email and password
export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out the user
export const signOutUser = async () => {
  return await signOut(auth);
};

// Listen for auth state changes (for logged in/out state)
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
