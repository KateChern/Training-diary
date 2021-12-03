import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import TrainingDetails from './components/TrainingsList/TrainingDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/profile' element={ <ProfilePage />} />
          <Route path='/training/:trainingId' element={ <TrainingDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

