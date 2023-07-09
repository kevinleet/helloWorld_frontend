import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import Home from "./components/Home";
import AddFriend from "./components/Main/AddFriend";
import ChatWindow from "./components/Main/ChatWindow";
import MyProfile from "./components/Main/MyProfile";
import ProfileById from "./components/Main/ProfileById";
import Settings from "./components/Main/Settings";

// Creating a context to share user-related data between components
export const UserContext = React.createContext(null);
export const BASE_URL = import.meta.env.VITE_BASEURL;
export const OPENAI_KEY = import.meta.env.VITE_OPENAIKEY;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [currentChat, setCurrentChat] = useState(""); // State to track current chat
  const [currentUser, setCurrentUser] = useState(null); // State to store current user data
  const [users, setUsers] = useState(null); // State to store all users data
  const [chatGPT, setChatGPT] = useState(""); //State to store the user's chat_id of their personal ChatGPT chat

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(isLoggedIn);

    // Fetch the current user from storage if logged in, otherwise navigate to login page
    const setCurrentUserFromStorage = async () => {
      if (isLoggedIn) {
        let currentUser = await getUser();
        setCurrentUser(currentUser);
      } else {
        navigate("/login");
      }
    };

    // Fetch all users from the server
    const getAllUsers = async () => {
      try {
        let response = await axios.get(`${BASE_URL}/api/users/get/all`);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the functions to set the current user and fetch all users
    setCurrentUserFromStorage();
    getAllUsers();
  }, []);

  // Check authentication status and navigate accordingly
  const checkAuthentication = () => {
    const storedUser = sessionStorage.getItem("currentUser");
    if (isLoggedIn && currentUser && storedUser) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  // Clear session storage and reset states
  const handleClearSessionStorage = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser(null);
    checkAuthentication();
  };

  // Fetch the current user from the server based on the stored email
  const getUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/get/email`, {
        email: sessionStorage.getItem("currentUser"),
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Provide the user-related data through the UserContext.Provider
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        currentChat,
        setCurrentChat,
        users,
        setUsers,
        chatGPT,
        setChatGPT,
      }}
    >
      <div className="flex justify-center items-center border border-slate-600 dark:border-slate-900 rounded-lg bg-slate-600 dark:bg-slate-900">
        <Routes>
          {/* Define routes for different components */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/" element={<Navigate to="/home" replace />} />
          <Route exact path="/home" element={<Home />}>
            <Route index element={<Navigate to="/home/chat" replace />} />
            <Route exact path="chat" element={<ChatWindow />} />
            <Route exact path="addfriend" element={<AddFriend />} />
            <Route exact path="myprofile" element={<MyProfile />} />
            <Route exact path="profile/:id" element={<ProfileById />} />
            <Route exact path="settings" element={<Settings />} />
          </Route>
          <Route
            path="/*"
            element={<h1 className="text-3xl">404: Page Not Found</h1>}
          />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
