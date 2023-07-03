import NavBar from "./Nav/NavBar";
import SideBar from "./Side/SideBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../globals";
import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

export const UsersContext = React.createContext(null);

const MainPage = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    try {
      const getAllUsers = async () => {
        let response = await axios.get(`${BASE_URL}/users/get/all`);
        setUsers(response.data);
        // console.log(response.data);
      };
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      <div className="flex flex-auto min-w-[1200px] min-h-[700px] border border-slate-900 rounded-lg bg-slate-900">
        <NavBar />
        <SideBar />

        <div className="flex justify-center border border-blue-500 w-8/12">
          {/* <ChakraProvider> */}
          <Outlet />
          {/* </ChakraProvider> */}
        </div>
      </div>
    </UsersContext.Provider>
  );
};

export default MainPage;
