
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA9aYLtC8j3iizK1wHrYrRILhm8fIItKCs",
  authDomain: "crwn-clothing-db-14c9f.firebaseapp.com",
  projectId: "crwn-clothing-db-14c9f",
  storageBucket: "crwn-clothing-db-14c9f.appspot.com",
  messagingSenderId: "1031054508714",
  appId: "1:1031054508714:web:8e55503d8469e948f046d3"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalData) => { 
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnap = await getDoc(userDocRef);

  if (!userSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }

  return userDocRef;
};