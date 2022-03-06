import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import ProgramsContext from "./store/programsStore/programs-context";
import Layout from "./components/Layout/Layout";
import TrainingFetchingProvider from "./store/trainingsStore/TrainingsProvider";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfileLinksPage from "./pages/ProfileLinksPage";
import SelectedUserTrainingPage from "./pages/SelectedUserTrainingPage";
import ProgramsPage from "./pages/ProgramsListPage";
import TrainingsInProgramList from "./pages/TrainingsInProgramList";
import ProgramFetchingProvider from "./store/programsStore/ProgramsProvider";
import AddingProgramToDBForm from "./components/Forms/AddNewProgram/AddingProgramToDBForm";
import AddingTrainingToDBForm from "./components/Forms/AddNewTraining/AddingTrainingToDBForm";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import UserTRainingsPage from "./pages/UserTrainingsPage";
import SubmittMessageFormPage from "./pages/SubmittMessagePage";
import UserTrainingsFromCalendarPage from "./pages/UserTrainingsFromCalendarPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import AccountInfoPage from "./pages/AccountInfoPage";
import PageNotFoud from "./pages/PageNotFound";
import { fetchUser } from "./firebase-functions/getUserProfileData";
import SingleTrainingCardFromDBPage from "./pages/SingleTrainingCardFromDBPage";

function App() {
  const context = useContext(ProgramsContext);
  const auth = getAuth();
  const [userState, setUserState] = useState(auth.currentUser);
  const [uid, setUid] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
      setUserState(user);
    } else {
      setUserState(null);
    }
  });
  const profileData = [
    {
      firstName: "",
      lastName: "",
      email: "",
      goalWeight: 0,
      currentWeight: 0,
      sex: "",
    },
  ];

  const [userData, setUserData] = useState(profileData);

  const fetchUserHandler = () => {
    return fetchUser(uid)
      .then((response) => {
        setUserData(response);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    context.fetchPrograms();
    fetchUserHandler();
  }, [context]);

  return (
    <Router>
      <ProgramFetchingProvider>
        <TrainingFetchingProvider>
          <Layout>
            <Routes>
              {userState && userData.length === 0 ? (
                <Route path="/" exact element={<HomePage />} />
              ) : userState && userData.length != 0 ? (
                <Route path="/" exact element={<ProgramsPage />} />
              ) : (
                !userState && <Route path="/" element={<AuthPage />} />
              )}

              {!userState && <Route path="/auth" element={<AuthPage />} />}
              {userState && (
                <Route path="/profile" element={<ProfileLinksPage />} />
              )}
              {userState && (
                <Route
                  path="/profile/accounts-settings"
                  element={<AccountSettingsPage />}
                />
              )}
              {userState && (
                <Route
                  path="/profile/accounts-info"
                  element={<AccountInfoPage />}
                />
              )}
              {userState && (
                <Route
                  path="/profile/createAccount"
                  element={<CreateAccountPage />}
                />
              )}
              {userState && (
                <Route
                  path="/profile/updatePassword"
                  element={<UpdatePasswordPage />}
                />
              )}
              {userState && (
                <Route
                  path="/usertrainings/:trainingId"
                  exact
                  element={<SelectedUserTrainingPage />}
                />
              )}
              {userState && (
                <Route
                  path="/trainings/:trainingId"
                  exact
                  element={<SingleTrainingCardFromDBPage />}
                />
              )}
              {userState && (
                <Route path="/ProgramsList" exact element={<ProgramsPage />} />
              )}
              {userState && (
                <Route
                  path="/ProgramsList/:programName"
                  element={<TrainingsInProgramList />}
                />
              )}
              {userState && (
                <Route
                  path="/AddingProgramForm"
                  element={<AddingProgramToDBForm />}
                />
              )}
              {userState && (
                <Route
                  path="/AddingTrainingForm"
                  element={<AddingTrainingToDBForm />}
                />
              )}
              {userState && (
                <Route
                  path="/userTrainings"
                  exact
                  element={<UserTRainingsPage />}
                />
              )}
              {userState && (
                <Route
                  path="/submited-form"
                  exact
                  element={<SubmittMessageFormPage />}
                />
              )}
              {userState && (
                <Route
                  path="/usertrainings-calendar"
                  exact
                  element={<UserTrainingsFromCalendarPage />}
                />
              )}
              {/* {!userState && <Route path="*" element={<AuthPage />} />} */}
              {userState && <Route path="*" element={<PageNotFoud />} />}
            </Routes>
          </Layout>
        </TrainingFetchingProvider>
      </ProgramFetchingProvider>
    </Router>
  );
}

export default App;
