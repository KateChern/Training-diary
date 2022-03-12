import React from "react";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";
import UserTrainings from "../components/UserTrainings/AllUserTrainings";

const UserTRainingsPage = () => {
  return (
    <React.Fragment>
      <SecondNavigationBar />
      <UserTrainings />
    </React.Fragment>
  );
};

export default UserTRainingsPage;
