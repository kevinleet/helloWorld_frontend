import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ChatItem from "./ChatItem";
import { UserContext, BASE_URL } from "../../App";
import { ChatsContext } from "../Home";
import ChatGPT from "./ChatGPT";

const ChatList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { chats, setChats, selectedChat, setselectedChat } =
    useContext(ChatsContext);
  const {
    currentUser,
    setCurrentUser,
    currentChat,
    setCurrentChat,
    chatGPT,
    setChatGPT,
  } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      const getAllChats = async () => {
        try {
          let response = await axios.get(
            `${BASE_URL}/api/chats/userchats/${currentUser._id}`
          );
          setChats(response.data);
          setChatGPT(await getGPTChat(currentUser));
        } catch (error) {
          console.log(error);
        }
      };
      getAllChats();
    }
  }, [currentUser, currentChat]);

  const getGPTChat = async (user) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/chats/chatgpt/${user._id}`
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // Upon clicking an individual chat item, this needs to fetch all messages of a chat and render them to ChatWindow.
  const handleClick = (chatId) => {
    setCurrentChat(chatId);
    setselectedChat(chatId);
    if (location.pathname !== "/home/chat") {
      navigate("/home/chat");
    }
  };

  return (
    <div className="chat-list hidden lg:block w-full overflow-y-auto flex flex-col">
      <ChatGPT
        isSelected={selectedChat === chatGPT._id}
        chatid={chatGPT._id}
        handleClick={handleClick}
      ></ChatGPT>
      {chats
        ?.sort((a, b) => {
          const chat1 = new Date(a.latestMessage?.updatedAt).getTime() || 0;
          const chat2 = new Date(b.latestMessage?.updatedAt).getTime() || 0;
          return chat2 - chat1;
        })
        .filter((chat) => chat.isChatGPT != true)
        .map((chat) => (
          <ChatItem
            key={chat._id}
            receiver={chat.users.map((user) => {
              if (user._id !== currentUser._id) {
                return user.displayname;
              }
            })}
            latestMessage={chat.latestMessage}
            handleClick={handleClick}
            isSelected={selectedChat === chat._id}
            chatid={chat._id}
          />
        ))}
    </div>
  );
};

export default ChatList;
