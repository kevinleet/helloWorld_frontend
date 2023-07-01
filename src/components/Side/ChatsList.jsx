import SearchFriends from "./SearchFriends"
import { UserContext } from "../../App"
import { useContext, useEffect, useState } from "react"

const ChatList = () => {
   const { currentChat, setCurrentChat } = useContext(UserContext)

   return(
     <div className="chat-list">
        <SearchFriends />

        {/* function that shows each available chat */}

    </div>
   )
}

export default ChatList