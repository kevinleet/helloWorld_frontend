import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ChatItem from "./ChatItem";
import { UserContext } from "../../App";
import { ChatsContext } from "../Home";
import { BASE_URL } from "../../globals";

const ChatList = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        } catch (error) {
          console.log(error);
        }
      };
      getAllChats();
    }
  }, [currentUser]);

  // Upon clicking an individual chat item, this needs to fetch all messages of a chat and render them to ChatWindow.
  const handleClick = (chatId) => {
    setCurrentChat(chatId);
    if (location.pathname !== "/home/chat") {
      navigate("/home/chat");
    }
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
