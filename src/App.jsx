import "./App.css";
import Chat from "./components/Chat";
import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import MainPage from "./components/MainPage";
import AddFriend from "./components/Main/AddFriend";
import ChatWindow from "./components/Main/ChatWindow";
import Profile from "./components/Main/Profile";
import LoginPage from "./components/Login/LoginPage";
import { BASE_URL } from "./globals";
import axios from "axios";

export const UserContext = React.createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentChat, setCurrentChat] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  /* useEffect(() => {
    isLoggedIn ? <MainPage /> : <LoginPage />
  }, []) */

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        currentChat,
        setCurrentChat,
      }}
    >
      <div className="flex justify-center items-center min-w-[1200px] min-h-[700px] border border-slate-900 rounded-lg bg-slate-900">
          {isLoggedIn ? <MainPage /> : <LoginPage />}
        <Routes>
          {/* <Route path="*" element={<h1>404</h1>} /> */}
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/home" element={<MainPage />} />
          <Route exact path="/home/chat" element={<ChatWindow />} />
          <Route exact path="/home/addfriend" element={<AddFriend />} />
          <Route exact path="/home/profile" element={<Profile />} />
          {/* <Route exact path="/home/chat/:id" element={<ChatWindow />} /> */}
        </Routes>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-10">
        <p>For Development Use Only:</p>
        <button
          onClick={() => {setIsLoggedIn(!isLoggedIn)}}
          className="border p-1"
        >
          isLoggedIn: {isLoggedIn ? "true" : "false"}
        </button>
        <p className="border p-1">
          User: {currentUser?._id ? currentUser?.displayname : "null"}
        </p>
      </div>
    </UserContext.Provider>
  );
}

export default App;
