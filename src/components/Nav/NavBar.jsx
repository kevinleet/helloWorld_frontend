import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import chat from "../../assets/chat.png";
import group from "../../assets/group.png";
import user from "../../assets/user.png";
import settings from "../../assets/settings.png";
import logout from "../../assets/log-out.png";

const NavBar = () => {
  const [activePage, setActivePage] = useState("chat");
  let navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } =
    useContext(UserContext);

  const handleSelection = (page) => {
    setActivePage(page);
    navigate(`/home/${page}`);
  };

  function handleLogOut() {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser(null);
  }

  return (
    <div className="flex flex-col justify-end items-center w-1/12 bg-slate-900 rounded-lg">
      <div className="h-full flex flex-col justify-between items-center mt-5">
        <div className="flex flex-col justify-center items-center">
          <Link
            to="/home/chat"
            className={`
              mb-4 p-6 
              ${activePage === "chat" ? "bg-indigo-300" : "bg-indigo-600"} 
              bg-indigo-600 rounded-lg shadow-sm 
              hover:bg-indigo-500 
              transition-all duration-300
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600`}
            onClick={() => handleSelection("chat")}
          >
            <img src={chat} className="w-8" />
          </Link>
          <Link
            to="/home/addfriend"
            className={`
              mb-4 p-6 
              ${activePage === "addfriend" ? "bg-indigo-300" : "bg-indigo-600"} 
              bg-indigo-600 rounded-lg shadow-sm 
              hover:bg-indigo-500 
              transition-all duration-300
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600`}
            onClick={() => handleSelection("addfriend")}
          >
            <img src={group} className="w-8" />
          </Link>
          <Link
            to="/home/myprofile"
            className={`
              mb-4 p-6 
              ${activePage === "profile" ? "bg-indigo-300" : "bg-indigo-600"} 
              bg-indigo-600 rounded-lg shadow-sm 
              hover:bg-indigo-500 
              transition-all duration-300
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600`}
            onClick={() => handleSelection("profile")}
          >
            <img src={user} className="w-8" />
          </Link>
          <Link
            to="/home/settings"
            className={`
              mb-4 p-6 
              ${activePage === "settings" ? "bg-indigo-300" : "bg-indigo-600"} 
              bg-indigo-600 rounded-lg shadow-sm 
              hover:bg-indigo-500 
              transition-all duration-300
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600`}
            onClick={() => handleSelection("settings")}
          >
            <img src={settings} className="w-8" />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link
            to="/login"
            className="
            mb-5 p-6 
            bg-indigo-600 rounded-lg shadow-sm 
            hover:bg-indigo-500 
            transition-all duration-300
            focus-visible:outline 
            focus-visible:outline-2 
            focus-visible:outline-offset-2 
            focus-visible:outline-indigo-600"
            onClick={() => handleLogOut()}
          >
            <img src={logout} className="w-8" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
