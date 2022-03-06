import { collection, getDocs, query, where } from "firebase/firestore/lite";
import db from "../firebase";

export const fetchingTrainings = async (uid) => {
  const dates = JSON.parse(localStorage.getItem("dates"));
  const sortedDates = dates && dates.sort((a, b) => a - b);
  const q = query(collection(db, "users"), where("id", "==", uid));
  const trainingsSnapshot = await getDocs(q);
  const trainingsList = trainingsSnapshot.docs.map((doc) => doc.data());
  if (!trainingsList || !trainingsList[0]) {
    return [];
  }
  const splitStorageDay = `${new Date(sortedDates[0])}`
    .split(" ")
    .splice(0, 4)
    .join(" ");

  const filteredUserTrainings = trainingsList[0].userTrainings.filter(
    (training) => {
      const fireBaseTime = new Date(
        training.date.seconds * 1000 + training.date.nanoseconds / 1000000
      );

      const splitFirebaseDay = `${fireBaseTime}`
        .split(" ")
        .splice(0, 4)
        .join(" ");
      return sortedDates.length === 1
        ? splitFirebaseDay == splitStorageDay
        : splitFirebaseDay == splitStorageDay ||
            fireBaseTime.getTime() <=
              new Date(sortedDates[sortedDates.length - 1]).getTime();
    }
  );
  return filteredUserTrainings;
};
