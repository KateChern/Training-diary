import { initializeApp } from "firebase/app";
import {
  getFirestore,
  // query,
  // getDocs,
  collection,
  // where,
  addDoc,
} from "firebase/firestore/lite";
// import { doc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCjmvnYt0aikh9NGc8ZgDkCkoHvQnlEFDc",
  authDomain: "training-diary-2d4a5.firebaseapp.com",
  databaseURL:
    "https://training-diary-2d4a5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "training-diary-2d4a5",
  storageBucket: "training-diary-2d4a5.appspot.com",
  messagingSenderId: "494799911692",
  appId: "1:494799911692:web:896ba3f15987df8d4a2729",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// const programsRef = doc(db, 'programs');
const logInWithEmailAndPassword = async (auth, email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (auth, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;

    // const user = res.user;
    // await setDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   // name,
    //   authProvider: "local",
    //   email,
    // }
    // );
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = (auth) => {
  signOut(auth);
};
export default db;
export { logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
