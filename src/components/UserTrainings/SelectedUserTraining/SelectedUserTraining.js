import React, { Fragment } from "react";
import Modal from "../../Helpers/Modal/Modal";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
import db from "../../../firebase-functions/firebase";
import TrainingDetailsCard from "../../Trainings/trainingDetailsCard";
import TrainingsContext from "../../../store/trainingsStore/trainings-context";
import { v4 as uuidv4 } from "uuid";
import SubmittedForm from "../../Helpers/SubmittedFormMessage/SubmittedForm";
import classes from "../../Helpers/SubmittedFormMessage/SubmittedForm.module.css";

const SelectedUserTraining = () => {
  const auth = getAuth();
  let params = useParams();
  const ctx = useContext(TrainingsContext);
  const [showMessage, setShowMessage] = useState(false);

  let uid = "";
  if (auth.currentUser) {
    uid = auth.currentUser.uid;
  }

  const [userState, setUserState] = useState(uid);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserState(user.uid);
    } else {
      setUserState(uid);
    }
  });

  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  let description, exercises, id, type, difficultyLevel;

  const [level, setLevel] = useState(0);
  useEffect(() => {
    const fetchFilteredTrainingsHandler = () => {
      ctx
        .fetchUserTrainings(userState, params)
        .then((response) => {
          return response;
        })
        .catch((err) => {});
    };
    fetchFilteredTrainingsHandler();
  }, [userState, params]); // eslint-disable-line react-hooks/exhaustive-deps

  const trainings = ctx.userTrainings;
  const training = trainings && trainings[0];

  if (training) {
    description = training.description;
    exercises = training.exercises;
    id = uuidv4();
    type = training.type;
    difficultyLevel = training.difficultyLevel;
  }

  const currentTime = new Date();
  const difLevel = (value) => {
    console.log(level);
    setLevel((prevValue) => value);
  };

  const submitCompleted = async () => {
    try {
      const userTrainingsCollectionRef = doc(db, `users`, `${userState}`);
      const docRef = await updateDoc(userTrainingsCollectionRef, {
        userTrainings: arrayUnion({
          date: currentTime,
          description,
          exercises,
          id,
          type,
          difficultyLevel: level,
        }),
      });
      return docRef;
    } catch (e) {
      console.log(e);
    }
  };
  const removeMessage = () => {
    setTimeout(() => {
      setShowMessage(false);
    }, [2000]);
  };

  const submitCompletedHandler = () => {
    submitCompleted();
    toggleMessage();
    removeMessage();
  };

  const submittedMessage = "Congratulations on completing the training!";

  if (ctx.loading) return <p className={classes.msg}>Loading...</p>;
  return (
    <Fragment>
      <TrainingDetailsCard
        difficultyLevel={difficultyLevel}
        level={level}
        onChangeValue={difLevel}
        onSubmitAction={submitCompletedHandler}
        training={training}
      />
      {showMessage && (
        <Modal onClose={toggleMessage}>
          <SubmittedForm message={submittedMessage} />
        </Modal>
      )}
    </Fragment>
  );
};

export default SelectedUserTraining;

// should fetch users Trainings and filter the one with the right params.id
