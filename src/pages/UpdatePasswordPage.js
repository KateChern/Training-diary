import { Fragment } from "react";
import PasswordUpdatingForm from "../components/Auth/UpdatePasswordForm/PasswordUpdatingForm";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";

const UpdatePasswordPage = () => {
  return (
    <Fragment>
      <SecondNavigationBar />
      <PasswordUpdatingForm />
    </Fragment>
  );
};

export default UpdatePasswordPage;
