import ChatList from "./ChatsList"
import SearchFriends from "./SearchFriends"
import { UserContext } from "../../App"
import { useContext, useEffect, useState } from "react"

const SideBar = () => {
    return (
        <div className="side-bar">
                <SearchFriends />
                <ChatList />
        </div>
    )
}

export default SideBar
