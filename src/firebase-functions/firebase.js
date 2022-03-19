import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

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
