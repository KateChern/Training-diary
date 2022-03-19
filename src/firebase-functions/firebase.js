import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY, // eslint-disable-line
  authDomain: authDomain, // eslint-disable-line
  databaseURL: databaseURL, // eslint-disable-line
  projectId: projectId, // eslint-disable-line
  storageBucket: storageBucket, // eslint-disable-line
  messagingSenderId: messagingSenderId, // eslint-disable-line
  appId: appId, // eslint-disable-line
};
// eslint-disable-line

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const logInWithEmailAndPassword = async (auth, email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (auth, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  } catch (err) {
    alert(err.message);
  }
};
const logout = (auth) => {
  signOut(auth);
};
export default db;
export { logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
