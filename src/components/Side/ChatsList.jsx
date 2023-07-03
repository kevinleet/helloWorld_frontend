import SearchFriends from "./SearchFriends"
import Chat from "./Chat"
import { UserContext } from "../../App"
import { useContext, useEffect, useState } from "react"

const ChatList = (props) => {


   return(
     <div className="chat-list">
      {/* <ul>
            {props.chat.map((chat) => (
              <Chat key={chat.users} users={chat.users} messages={chat.messages} />
            ))}
        </ul> */}


    </div>
   )
}

export default ChatList