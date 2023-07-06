import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, BASE_URL } from "../../App"; // Importing UserContext from "../../App" to access user context data
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing
import axios from "axios"; // Importing axios for making API requests
import LoginForm from "./LoginForm"; // Importing the LoginForm component
import DarkMode from "../Nav/DarkMode";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } =
    useContext(UserContext); // Accessing user context data
  const initialState = {
    email: "",
    password: "",
  };
  const [formState, setFormState] = useState(initialState); // Initializing form state with initial values
  const [messsage, setMessage] = useState("");

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value }); // Updating form state when input values change
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let foundUser = await getUser(); // Fetching user data
    let validPassword;
    if (foundUser) {
      validPassword = await bcrypt.compare(
        formState.password,
        foundUser.password
      ); // Comparing entered password with hashed password
    }

    if (foundUser && validPassword) {
      setIsLoggedIn(true); // Set isLoggedIn to true
      setCurrentUser(foundUser); // Set the current user
      sessionStorage.setItem("isLoggedIn", true); // Store isLoggedIn in session storage
      sessionStorage.setItem("currentUser", formState.email); // Store the current user's email in session storage
      navigate("/home"); // Navigate to the home page
      // setMessage("");
    } else {
      // alert("Login Failed! Please try again.");
      setMessage("Invalid login credentials. Please try again.");
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/get/email`, {
        email: formState.email,
      }); // Sending API request to fetch user data
      return response.data; // Return the user data from the API response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-6 pt-12 pb-6 lg:px-8 border border-slate-300 dark:border-slate-700 bg-slate-400 dark:bg-slate-800 max-w-2xl rounded-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-black dark:text-white text-center">
          Welcome to helloWorld.
        </h2>
        <p className="mt-0 text-md tracking-tight text-black dark:text-white text-center">
          A smarter way to chat.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm
          onSubmit={handleSubmit}
          onChange={handleChange}
          formState={formState}
        />

        <p className="text-center mt-3 text-red-500 font-bold text-sm">
          {messsage}
        </p>

        <p className="mt-5 text-center text-sm text-gray-800 dark:text-gray-400">
          New to helloWorld?{" "}
          <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up here!
          </Link>
        </p>
        <div className="mt-2 text-center">
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default Login;
