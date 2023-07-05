import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../globals";
import { UserContext } from "../../App";
import { useContext, useState, useRef } from "react";
import { io } from "socket.io-client";
import { ChatsContext } from "../Home";

const ENDPOINT = "http://localhost:3001";
let socket;

const ChatWindow = () => {
  const [messages, setmessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [room, setRoom] = useState("");
  const messagesDisplay = useRef(null);

  const { chats, setChats } = useContext(ChatsContext);

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
      // console.log(newMessageRecieved);
      setmessages([...messages, newMessageRecieved]);
      // console.log(messages);
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

        // if (messagesDisplay.current) {
        //   messagesDisplay.current.scrollTop =
        //     messagesDisplay.current.scrollHeight;
        // }
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
            ? messages.map((message) =>
                message.sender._id == currentUser._id ? (
                  <div key={message._id}>
                    <p className="bg-indigo-600 text-white float-right p-2 m-2 border border-white max-w-[300px] whitespace-normal rounded-xl ">
                      {message.content}
                    </p>
                  </div>
                ) : (
                  <div key={message._id}>
                    <p className="bg-indigo-600 text-white float-left p-2 m-2 border border-white max-w-[300px] whitespace-normal rounded-xl">
                      {message.content}
                    </p>
                  </div>
                )
              )
            : null}
        </div>
      </div>
      <form className="w-[500px] h-[50px] mt-5" onKeyDown={sendMessage}>
        <input
          type="text"
          className="w-full rounded-md focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-400 bg-slate-500 text-gray-100"
          // className="px-5 block rounded-md border-0 py-1.5 px-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-500 text-white"
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
