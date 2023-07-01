import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import { BASE_URL } from "../globals";

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  const initialState = {
    email: "",
    displayname: "",
    password: "",
    confirmpassword: "",
  };
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formState.password === formState.confirmpassword) {
      try {
        await createUser();
        alert("Account created. Please sign in!");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords do not match.");
    }
  };

  const createUser = async () => {
    let hashedPassword = await hashPassword();
    console.log(hashedPassword);

    let user = await axios.post(`${BASE_URL}/users/create`, {
      email: formState.email,
      displayname: formState.displayname,
      password: hashedPassword,
    });
  };

  const hashPassword = async () => {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(formState.password, saltRounds);

    console.log(hashedPassword);
    return hashedPassword;
  };
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-6 lg:px-8 border border-slate-700 bg-slate-800 max-w-2xl rounded-lg">
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

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>
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
