import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import Home from "./components/Home";
import AddFriend from "./components/Main/AddFriend";
import ChatWindow from "./components/Main/ChatWindow";
import Profile from "./components/Main/Profile";
import axios from "axios";
import { BASE_URL } from "./globals";

export const UserContext = React.createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentChat, setCurrentChat] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(isLoggedIn);

    if (!isLoggedIn) {
      navigate("/login");
    }

    const setCurrentUserFromStorage = async () => {
      if (isLoggedIn) {
        let currentUser = await getUser();
        setCurrentUser(currentUser);
      }
    };

    const getAllUsers = async () => {
      try {
        let response = await axios.get(`${BASE_URL}/users/get/all`);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    setCurrentUserFromStorage();
    getAllUsers();
  }, []);

  const checkAuthentication = () => {
    const storedUser = sessionStorage.getItem("currentUser");
    if (isLoggedIn && currentUser && storedUser) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  const handleClearSessionStorage = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser(null);
    checkAuthentication();
  };

  const getUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users/get/email`, {
        email: sessionStorage.getItem("currentUser"),
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
      }}
    >
      <div className="flex justify-center items-center min-w-[1200px] min-h-[700px] border border-slate-900 rounded-lg bg-slate-900">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/" element={<Navigate to="/home" replace />} />
          <Route path="home/*" element={<Home />}>
            <Route index element={<h1>Landing Page</h1>} />
            <Route exact path="chat" element={<ChatWindow />} />
            <Route exact path="addfriend" element={<AddFriend />} />
            <Route exact path="profile" element={<Profile />} />
          </Route>
          {/* <Route path="/*" element={<h1>404</h1>} /> */}
        </Routes>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-10">
        <p>For Development Use Only:</p>
        <button
          onClick={() => {
            setIsLoggedIn(!isLoggedIn);
            checkAuthentication();
          }}
          className="border p-1"
        >
          isLoggedIn: {isLoggedIn ? "true" : "false"}
        </button>
        <p className="border p-1">
          User: {currentUser?._id ? currentUser?.displayname : "null"}
        </p>
        <button onClick={handleClearSessionStorage} className="border p-1">
          Clear Session Storage
        </button>
      </div>
    </UserContext.Provider>
  );
}

export default App;
