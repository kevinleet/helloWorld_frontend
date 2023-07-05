import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import { BASE_URL } from "../../globals";
import { UserContext } from "../../App";

const SignUp = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  const { users } = useContext(UserContext);

  const initialState = {
    email: "",
    displayname: "",
    password: "",
    confirmpassword: "",
  };
  const [formState, setFormState] = useState(initialState); // Initializing form state using useState hook

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value }); // Updating form state when input values change
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior

    if (
      users.filter((user) => user.email == formState.email.toLowerCase())
        .length > 0
    ) {
      setMessage("Account with that email already exists.");
    } else if (formState.password === formState.confirmpassword) {
      try {
        await createUser(); // Creating a new user if passwords match
        alert("Account created. Please sign in!");
        navigate("/login"); // Navigating to the login page after successful signup
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords do not match."); // Showing an error message if passwords do not match
    }
  };

  const createUser = async () => {
    let hashedPassword = await hashPassword(); // Hashing the password before sending it to the server

    let user = await axios.post(`${BASE_URL}/users/create`, {
      email: formState.email.toLowerCase(),
      displayname: formState.displayname,
      password: hashedPassword,
    }); // Sending a POST request to create a new user
  };

  const hashPassword = async () => {
    const saltRounds = 10; // Number of salt rounds for password hashing

    const hashedPassword = await bcrypt.hash(formState.password, saltRounds); // Hashing the password using bcrypt

    return hashedPassword; // Returning the hashed password
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-6 lg:px-8 border border-slate-700 bg-slate-800 max-w-2xl rounded-lg">
      {/* Sign-up form */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-white text-center">
          Sign up for helloWorld below.
        </h2>
        <p className="mt-0 text-md tracking-tight text-white text-center">
          A smarter way to chat.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={handleChange}
                value={formState.email}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-int ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-500 text-white"
              />
            </div>
          </div>

          {/* Display name input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Display Name
            </label>
            <div className="mt-2">
              <input
                id="displayname"
                name="displayname"
                type="displayname"
                autoComplete="displayname"
                required
                onChange={handleChange}
                value={formState.displayname}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-int ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-500 text-white"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleChange}
                value={formState.password}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-500 text-white"
              />
            </div>
          </div>

          {/* Confirm password input */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Confirm Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="confirmpassword"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleChange}
                value={formState.confirmpassword}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-500 text-white"
              />
            </div>
          </div>

          {/* Sign up button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
            >
              Sign Up
            </button>
            <p className="text-center mt-3 text-red-500 font-bold text-sm"></p>
            <p className="text-center mt-3 text-red-500 font-bold text-sm">
              {message}
            </p>
          </div>
        </form>
        {/* Link to the login page */}
        <p className="mt-10 text-center text-sm text-gray-500">
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Go Back to Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
