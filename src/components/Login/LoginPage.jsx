import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const LoginPage = () => {
  const [loginPage, setLoginPage] = useState(true);
  return (
    <>
      {loginPage ? (
        <Login setLoginPage={setLoginPage} />
      ) : (
        <SignUp setLoginPage={setLoginPage} />
      )}
      {/* <Login />
      <SignUp /> */}
    </>
  );
};

export default LoginPage;
