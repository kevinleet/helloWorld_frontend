import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

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
      <div className="h-2/3 flex flex-col justify-between items-center mb-6">
        <div className="flex flex-col justify-center items-center">
          <Link
            to="/home/chat"
            className={`
              mb-4 p-6 
              ${activePage === "chat" ? "bg-indigo-300" : "bg-indigo-600"} 
              bg-indigo-600 rounded-md shadow-sm 
              hover:bg-indigo-500 
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600`}
            onClick={() => handleSelection("chat")}
          >
            <img src="src/assets/chat.png" className="w-8" />
          </Link>
          <Link
            to="/home/addfriend"
            className={`
              mb-4 p-6 
              ${activePage === "addfriend" ? "bg-indigo-300" : "bg-indigo-600"} 
              bg-indigo-600 rounded-md shadow-sm 
              hover:bg-indigo-500 
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600`}
            onClick={() => handleSelection("addfriend")}
          >
            <img src="src/assets/group.png" className="w-8" />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link
            to="/login"
            className="
            mb-4 p-6 
            bg-indigo-600 rounded-md shadow-sm 
            hover:bg-indigo-500 
            focus-visible:outline 
            focus-visible:outline-2 
            focus-visible:outline-offset-2 
            focus-visible:outline-indigo-600"
            onClick={() => handleLogOut()}
          >
            <img src="src/assets/log-out.png" className="w-8" />
          </Link>
          <Link
            to="/home/profile"
            className={`
              mb-4 p-6 
              ${activePage === "profile" ? "bg-indigo-300" : "bg-indigo-600"} 
              bg-indigo-600 rounded-md shadow-sm 
              hover:bg-indigo-500 
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600`}
            onClick={() => handleSelection("profile")}
          >
            <img src="src/assets/user.png" className="w-8" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
