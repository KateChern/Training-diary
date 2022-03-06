import AccountInfo from "../components/Profile/account-info/AccountInfo";
import React from "react";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";

const AccountSettingsPage = () => {
  return (
    <React.Fragment>
      <SecondNavigationBar />
      <AccountInfo />
    </React.Fragment>
  );
};

export default AccountSettingsPage;
