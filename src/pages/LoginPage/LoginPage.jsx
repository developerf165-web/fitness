import React from "react";
import BackgroundImage from "./components/BackgroundImage";
import LoginForm from "./components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex overflow-hidden text-white">
      <BackgroundImage />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
