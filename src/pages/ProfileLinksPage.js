import React from "react";
import UserProfileLinks from "../components/Profile/UserProfileLinks";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";

const ProfileLinksPage = () => {
  return (
    <React.Fragment>
      <SecondNavigationBar />
      <UserProfileLinks />
    </React.Fragment>
  );
};

export default ProfileLinksPage;
