import ChatList from "./ChatsList";
import SearchFriends from "./SearchFriends";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";

const SideBar = () => {
  return (
    <div className="flex justify-center items-center border border-green-500 w-3/12">
      <div className="side-bar">
        <SearchFriends />
        <ChatList />
      </div>
    </div>
  );
};

export default SideBar;
