import AccountSettings from "../components/Profile/account-settings.js/AccountSettings";
import React from "react";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";

const AccountSettingsPage = () => {
  return (
    <React.Fragment>
      <SecondNavigationBar />
      <AccountSettings />
    </React.Fragment>
  );
};

export default AccountSettingsPage;
