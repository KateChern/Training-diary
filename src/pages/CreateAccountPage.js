import CreateAccountForm from "../components/Profile/CreateAccountForm";
import React from "react";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";

const CreateAccountPage = () => {
  return (
    <React.Fragment>
      <SecondNavigationBar />
      <CreateAccountForm />
    </React.Fragment>
  );
};

export default CreateAccountPage;
