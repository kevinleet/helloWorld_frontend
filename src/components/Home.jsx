import React, { useState } from "react";
import NavBar from "./Nav/NavBar";
import SideBar from "./Side/SideBar";
import { Outlet } from "react-router-dom";

export const ChatsContext = React.createContext(null);

const Home = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setselectedChat] = useState(null);

  return (
    <ChatsContext.Provider
      value={{ chats, setChats, selectedChat, setselectedChat }}
    >
      <div className="flex flex-auto w-[1200px] h-[700px] bg-slate-600 dark:bg-slate-950">
        <NavBar />
        <SideBar />

        <div className="flex justify-center w-8/12 bg-slate-600 dark:bg-slate-950 rounded-lg">
          <Outlet context={[chats, setChats]} />
        </div>
      </div>
    </ChatsContext.Provider>
  );
};

export default Home;
