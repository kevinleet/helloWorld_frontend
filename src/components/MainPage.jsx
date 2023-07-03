import NavBar from "./Nav/NavBar";
import SideBar from "./Side/SideBar";
import MainBar from "./Main/MainBar";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../globals";

export const UsersContext = React.createContext(null);

const MainPage = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      let response = await axios.get(`${BASE_URL}/users/get/all`);
      setUsers(response.data);
      console.log(response.data);
    };
    getAllUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      <div className="flex flex-auto min-w-[1200px] min-h-[700px] border border-slate-900 rounded-lg bg-slate-900">
        {/* <div className="flex justify-between items-center border border-red-500 w-2/12"> */}
        <NavBar />
        {/* </div> */}

        <div className="flex justify-center items-center border border-green-500 w-3/12">
          <SideBar />
        </div>

        <div className="flex justify-center border border-blue-500 w-8/12">
          <MainBar />
        </div>
      </div>
    </UsersContext.Provider>
  );
};

export default MainPage;
