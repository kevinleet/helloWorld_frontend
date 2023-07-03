// import SearchFriends from "./SearchFriends"
import ChatItem from "./ChatItem";
import { UserContext } from "../../App"
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../globals";
import axios from "axios";

const ChatList = () => {
  const [chats, setChats] = useState([])
  const { currentUser, setCurrentUser } = useContext(UserContext)


  useEffect(() => {
    const getAllChats = async () => {
      let response = await axios.get(`${BASE_URL}/chats/userchats/${currentUser._id}`);
      setChats(response.data);
      console.log("output", response.data);
    };
    getAllChats();
  }, []);

  return (
    <div className="chat-list w-full">
      <ul>
        {chats?.map((chat) => (
          <ChatItem
            key={chat.users}
            users={chat.users}
            latestMessage={chat.latestMessage}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
