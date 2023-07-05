import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ChatItem from "./ChatItem";
import { UserContext, BASE_URL } from "../../App";
import { ChatsContext } from "../Home";

const ChatList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { chats, setChats, selectedChat, setselectedChat } =
    useContext(ChatsContext);
  const { currentUser, setCurrentUser, currentChat, setCurrentChat } =
    useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      const getAllChats = async () => {
        try {
          let response = await axios.get(
            `${BASE_URL}/api/chats/userchats/${currentUser._id}`
          );
          setChats(response.data);
          // console.log(response.data);
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
    setselectedChat(chatId);
    // console.log(chatId);
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
          isSelected={selectedChat === chat._id}
        />
      ))}
    </div>
  );
};

export default ChatList;
