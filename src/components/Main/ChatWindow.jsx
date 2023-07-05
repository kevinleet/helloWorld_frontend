import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../globals";
import { UserContext } from "../../App";
import { useContext, useState, useRef } from "react";
import { io } from "socket.io-client";
import { ChatsContext } from "../Home";

const ENDPOINT = "http://localhost:3001";
let socket;
let selectedChatCompare;
const ChatWindow = () => {
  const [messages, setmessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [room, setRoom] = useState("");
  const messagesDisplay = useRef(null);

  const { chats, setChats, selectedChat, setselectedChat } =
    useContext(ChatsContext);

  const {
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    setCurrentUser,
    currentChat,
    setCurrentChat,
  } = useContext(UserContext);

  useEffect(() => {
    socket = io(`${ENDPOINT}`);
    socket.emit("setup", currentUser);
    socket.on("connected", () => setSocketConnected(true));
    //socket.on("connection", () => setSocketConnected(true));

    // socket.on("message", (message) => {
    //   setMessages((messages) => [...messages, message]);
    // });
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      // console.log(newMessageRecieved.chat);
      // console.log(selectedChatCompare);
      // console.log(messages);
      !selectedChatCompare || selectedChatCompare == newMessageRecieved.chat._id
        ? setmessages([...messages, newMessageRecieved])
        : null;
      // console.log(messages);
      const updatedChats = chats.map((chat) => {
        if (chat._id === newMessageRecieved.chat._id) {
          const updatedLatestMessage = {
            ...chat.latestMessage,
            content: newMessageRecieved.content,
          };
          return {
            ...chat,
            latestMessage: updatedLatestMessage,
          };
        }
      });
      setChats(updatedChats);
    });
  });

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      event.preventDefault();
      try {
        const { data } = await axios.post(`${BASE_URL}/messages`, {
          sender: currentUser._id,
          content: newMessage,
          chat: currentChat,
        });
        const updatedChats = chats.map((chat) => {
          if (chat._id === currentChat) {
            const updatedLatestMessage = {
              ...chat.latestMessage,
              content: newMessage,
            };
            return {
              ...chat,
              latestMessage: updatedLatestMessage,
            };
          }
          return chat;
        });
        setChats(updatedChats);
        setNewMessage("");
        await socket.emit("new message", data);
        setmessages([...messages, data]);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  //load messages associated with the chatId
  const loadMessages = async () => {
    const { data } = await axios.get(`${BASE_URL}/messages/${currentChat}`);
    // console.log(data);
    setmessages(data);
    selectedChatCompare = selectedChat;

    // console.log(messages);
  };

  useEffect(() => {
    if (messagesDisplay.current) {
      messagesDisplay.current.scrollTop = messagesDisplay.current.scrollHeight;
    }
  }, [messages, setmessages]);

  //when room is changed based on currentChat changing, emit a 'join chat' signal to tie current user to
  //a room with a name of the chatId
  useEffect(() => {
    socket.emit("join chat", room);
  }, [room, setRoom]);

  useEffect(() => {
    setRoom(currentChat);
    currentChat != "" ? loadMessages() : null;
  }, [currentChat, setCurrentChat]);

  const typingHandler = (event) => {
    setNewMessage(event.target.value);

    //could add typing indicator logic here
  };

  return (
    <div className="w-full py-2 flex flex-col flex-auto items-center justify-center">
      <div className="h-[620px] px-2 w-full">
        <div
          className="flex flex-col h-full overflow-y-auto"
          ref={messagesDisplay}
        >
          {messages
            ? messages.map((message) => (
                <div key={message._id}>
                  <p
                    className={`${
                      message.sender._id == currentUser._id
                        ? "bg-indigo-600 text-gray-200 float-right"
                        : "bg-purple-500 text-gray-200 float-left"
                    } px-3 py-2 m-2 max-w-[300px] whitespace-pre-wrap rounded-xl`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {message.sender.displayname}:{message.content}
                  </p>
                </div>
              ))
            : null}
        </div>
      </div>
      <form className="w-[600px] h-[50px] mt-5" onKeyDown={sendMessage}>
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-700 text-white"
          varient="filled"
          bg="#E0E0E0"
          color="black"
          placeholder="Enter a message.."
          onChange={typingHandler}
          value={newMessage}
        />
      </form>
    </div>
  );
};

export default ChatWindow;
