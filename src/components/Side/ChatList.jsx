// import SearchFriends from "./SearchFriends"
import ChatItem from "./ChatItem";
import { UserContext } from "../../App";
import { useContext, useEffect } from "react";
import { BASE_URL } from "../../globals";
import axios from "axios";
import { ChatsContext } from "../Home";

const ChatList = () => {
  const { chats, setChats } = useContext(ChatsContext);

  const { currentUser, setCurrentUser, currentChat, setCurrentChat } =
    useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      const getAllChats = async () => {
        try {
          let response = await axios.get(
            `${BASE_URL}/chats/userchats/${currentUser._id}`
          );
          setChats(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
        // console.log("output", response.data);
      };
      getAllChats();
    }
  }, [currentUser]);

  //upon clicking individual chatitem, this needs to fetch all messages of a chat and render them to chatwindow.
  const handleClick = (chatId) => {
    setCurrentChat(chatId);
  };

  return (
    <div className="chat-list w-full overflow-y-auto flex flex-col">
      {chats?.map((chat) => (
        <ChatItem
          key={chat._id}
          users={chat.users}
          latestMessage={chat.latestMessage}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default ChatList;
