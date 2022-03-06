import React from "react";
import SubmittedForm from "../components/Helpers/SubmittedFormMessage/SubmittedForm";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";

const SubmittMessageFormPage = () => {
  return (
    <React.Fragment>
      <SecondNavigationBar />
      <SubmittedForm />
    </React.Fragment>
  );
};

export default SubmittMessageFormPage;
