import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import chat from "../../assets/chat.png";
import group from "../../assets/group.png";
import user from "../../assets/user.png";
import settings from "../../assets/settings.png";
import logout from "../../assets/log-out.png";
import DarkMode from "./DarkMode.jsx";

const NavBar = () => {
  const [activePage, setActivePage] = useState("chat");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  let navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } =
    useContext(UserContext);

  const handleSelection = (page) => {
    setActivePage(page);
    navigate(`/home/${page}`);
  };

  function handleLogOut() {
    setIsLoggingOut(true);
    setTimeout(() => {
      sessionStorage.clear();
      setCurrentUser(null);
      navigate("/login");
      window.location.reload(false);
    }, 1000);
  }

  return (
    <div className="flex flex-row justify-start items-center lg:flex-col lg:w-1/12 bg-slate-600 dark:bg-slate-900 rounded-lg">
      {/* <div className="h-full flex flex-col justify-between items-center mt-5 border"> */}
      <div className="flex flex-row space-x-2 mt-3 mx-1 lg:space-x-0 w-full h-full lg:flex-col justify-center items-center">
        <Link
          to="/home/chat"
          className={`
              mb-4 p-3
              lg:mb-4 lg:p-6 lg:mt-6
              ${
                activePage === "chat"
                  ? "bg-indigo-300"
                  : "bg-indigo-500 dark:bg-indigo-600"
              } 
              rounded-lg shadow-sm 
              hover:bg-indigo-400 dark:hover:bg-indigo-500 
              transition-all duration-300
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 
              focus-visible:outline-indigo-500 dark:focus-visible:outline-indigo-600`}
          onClick={() => handleSelection("chat")}
        >
          <img src={chat} className="w-8" />
        </Link>
        <Link
          to="/home/addfriend"
          className={`
          mb-4 p-3
          lg:mb-4 lg:p-6 
              ${
                activePage === "addfriend"
                  ? "bg-indigo-300"
                  : "bg-indigo-500 dark:bg-indigo-600"
              } 
              rounded-lg shadow-sm 
              hover:bg-indigo-400 dark:hover:bg-indigo-500
              transition-all duration-300
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 
              focus-visible:outline-indigo-500 dark:focus-visible:outline-indigo-600`}
          onClick={() => {
            handleSelection("addfriend");
            window.location.reload(false);
          }}
        >
          <img src={group} className="w-8" />
        </Link>
        <Link
          to="/home/myprofile"
          className={`
          mb-4 p-3
          lg:mb-4 lg:p-6 
              ${
                activePage === "profile"
                  ? "bg-indigo-300"
                  : "bg-indigo-500 dark:bg-indigo-600"
              } 
              rounded-lg shadow-sm 
              hover:bg-indigo-400 dark:hover:bg-indigo-500
              transition-all duration-300
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 
              focus-visible:outline-indigo-500 dark:focus-visible:outline-indigo-600`}
          onClick={() => handleSelection("profile")}
        >
          <img src={user} className="w-8" />
        </Link>
        {/* <Link
            to="/home/settings"
            className={`
              mb-4 p-6 
              ${activePage === "settings" ? "bg-indigo-300" : "bg-indigo-500 dark:bg-indigo-600"} 
              rounded-lg shadow-sm 
              hover:bg-indigo-400 dark:hover:bg-indigo-500 
              transition-all duration-300
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 
              focus-visible:outline-indigo-500 dark:focus-visible:outline-indigo-600`}
            onClick={() => handleSelection("settings")}
          >
            <img src={settings} className="w-8" />
          </Link> */}
        <div className="mb-2 lg:mt-60">
          <DarkMode />
        </div>
        <button
          className="
          mb-4 p-3
          lg:mb-4 lg:p-6
            bg-indigo-500 dark:bg-indigo-600 rounded-lg shadow-sm 
            hover:bg-indigo-400 dark:hover:bg-indigo-500 
            transition-all duration-300
            focus-visible:outline 
            focus-visible:outline-2 
            focus-visible:outline-offset-2 
            focus-visible:outline-indigo-500 dark:focus-visible:outline-indigo-600"
          onClick={handleLogOut}
        >
          {isLoggingOut ? (
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          ) : (
            <img src={logout} className="w-8" />
          )}
        </button>
      </div>

      {/* </div> */}
    </div>
  );
};

export default NavBar;
