import { collection, getDocs, query, where } from "firebase/firestore/lite";
// import db from "../../../firebase";
import db from "../firebase";

export const fetchUser = async (uid) => {
  const q = query(collection(db, "users"), where("id", "==", uid));
  const userSnapshot = await getDocs(q);

  const userList = userSnapshot.docs.map((doc) => doc.data());
  if (!userList || !userList[0]) {
    return [];
  }
  const sortedUserData = userList[0].profileData.sort(
    (a, b) => a.date - b.date
  );
  return sortedUserData;
};
