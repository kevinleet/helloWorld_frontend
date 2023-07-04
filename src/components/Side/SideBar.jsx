import ChatList from "./ChatsList";
import SearchFriends from "./SearchFriends";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";

const SideBar = () => {
  return (
    <div className="flex flex-col p-5 justify-start items-center w-3/12 rounded-lg bg-slate-800">
      <div className="side-bar">
        <SearchFriends />
        <ChatList />
      </div>
    </div>
  );
};

export default SideBar;
