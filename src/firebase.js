import { initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { doc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjmvnYt0aikh9NGc8ZgDkCkoHvQnlEFDc",
  authDomain: "training-diary-2d4a5.firebaseapp.com",
  databaseURL: "https://training-diary-2d4a5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "training-diary-2d4a5",
  storageBucket: "training-diary-2d4a5.appspot.com",
  messagingSenderId: "494799911692",
  appId: "1:494799911692:web:896ba3f15987df8d4a2729"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// const programsRef = doc(db, 'programs');

export default db;