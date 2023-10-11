
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();

export const db = getFirestore();

/**
 * Helper to init products database collections
 * 
 * @param {*} collectionKey 
 * @param {*} objectsToAdd 
 * @returns 
 */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  
  const batch = writeBatch(db);

  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

/**
 * Add user object to database
 * 
 * @param {*} userAuth 
 * @param {*} additionalData 
 * @returns 
 */
export const createUserDocumentFromAuth = async (userAuth, additionalData = {}) => { 
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

/**
 * Get categories and documents from database
 */
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((accumulator, doc) => {
    const { title, items } = doc.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});

  return categoryMap;
};

/**
 * Create new user with email and password
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
export const createAuthUserWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Sign in user with email and password
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

/**
 * Sign out user
 */
export const signOutAuthUser = async () => await signOut(auth);

/**
 * Add listener to auth state changes, login and logout
 * @returns unscubscribe function
 */
export const onAuthStateChangedListener = (callback) => {
  if (!callback) {
    console.error('Callback function not provided');
    return;
  }
  onAuthStateChanged(auth, callback);
};