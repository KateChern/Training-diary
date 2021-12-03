import React from 'react';
import UserProfile from '../components/Profile/UserProfile';
import SecondNavigationBar from '../components/SecondsNavigation/SecondNavigationBar';
import TrainingList from '../components/TrainingsList/TrainingList';

const ProfilePage = () => {
  return (  <React.Fragment>
              <SecondNavigationBar />
              <TrainingList />
              {/* <UserProfile /> */}
            </React.Fragment>
  )
};

export default ProfilePage;