import React, { Fragment } from "react";
import Modal from "../Helpers/Modal/Modal";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
import db from "../../firebase-functions/firebase";
import TrainingDetailsCard from "../Trainings/trainingDetailsCard";
import SubmittedForm from "../Helpers/SubmittedFormMessage/SubmittedForm";
import { v4 as uuidv4 } from "uuid";
import TrainingsContext from "../../store/trainingsStore/trainings-context";
import classes from "../Helpers/SubmittedFormMessage/SubmittedForm.module.css";

const TrainingDetailsFunc = () => {
  const ctx = useContext(TrainingsContext);
  let params = useParams();
  const [showMessage, setShowMessage] = useState(false);
  const [level, setLevel] = useState(0);

  const difLevel = (value) => {
    console.log(level);
    setLevel((prevValue) => value);
  };
  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };
  const auth = getAuth();
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

  const fetchTrainingsHandler = useCallback(() => {
    ctx
      .fetchSelectedTraining(params)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchTrainingsHandler();
  }, [fetchTrainingsHandler]);

  const training = ctx.filtered && ctx.filtered[0];

  let description, exercises, id, type, difficultyLevel;
  if (training) {
    description = training.description;
    exercises = training.exercises;
    id = uuidv4();
    type = training.type;
    difficultyLevel = training.difficultyLevel;
  }

  const currentTime = new Date();
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
    } catch (e) {}
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

export default TrainingDetailsFunc;
