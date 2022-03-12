import React from "react";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";
import AccountSettings from "../components/Profile/AccountSettings";

const AccountSettingsPage = () => {
  return (
    <React.Fragment>
      <SecondNavigationBar />
      <AccountSettings />
    </React.Fragment>
  );
};

export default AccountSettingsPage;
