// import SearchFriends from "./SearchFriends"
import ChatItem from "./ChatItem"
// import { UserContext } from "../../App"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../globals"
import axios from 'axios'

const ChatList = () => {

  const [chats, setChats] = useState([])

  useEffect(() => {
    const getAllChats = async () => {
    let response = await axios.get(`${BASE_URL}/chats`)
    setChats(response.data)
    console.log(response.data)
    }
    getAllChats()
  }, [])


   return(
     <div className="chat-list w-full">
      <ul>
            {chats?.map((chat) => (
              <ChatItem key={chat.users} users={chat.users} messages={chat.messages} />
            ))}
        </ul>


    </div>
   )
}

export default ChatList