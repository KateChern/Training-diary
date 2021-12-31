import {BrowserRouter as Router, Routes ,Route, useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import ProgramsContext from './store/programsStore/programs-context';
import Layout from './components/Layout/Layout';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import TrainingDetails from './components/TrainingsList/TrainingDetails';
import ProgramsPage from './pages/ProgramsPage';
import ProgramsDetailPage from './pages/ProgramsDetailsPage';
import ProgramFetchingProvider from './store/programsStore/ProgramsProvider';
import AddingProgramToDBForm from './components/Forms/AddNewProgram/AddingProgramToDBForm';
import AddingTrainingToDBForm from './components/Forms/AddNewTraining/AddingTrainingToDBForm';
import db from './firebase';


function App() {

  const context = useContext(ProgramsContext)

  useEffect(() => {
    context.fetchPrograms()
    console.log('dispatched from APP')
    console.log(context.allPrograms)
  }, []);
  
  return (
    
    <Router>
      <ProgramFetchingProvider >
      <Layout>
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/profile' element={ <ProfilePage />} />
          <Route path='/training/:trainingId' element={ <ProfilePage />} />
          {/* <Route path='/training/:trainingId' element={ <TrainingDetails />} /> */}
          <Route path='/ProgramsList' exact element={<ProgramsPage />} />
          <Route path='/ProgramsList/:programName' element={ <ProgramsDetailPage />} />
          <Route path='/AddingProgramForm' element={ <AddingProgramToDBForm />} />
          <Route path='/AddingTrainingForm' element={ <AddingTrainingToDBForm />} />
        </Routes>
      </Layout>
      </ProgramFetchingProvider >
    </Router>
  );
}

export default App;

