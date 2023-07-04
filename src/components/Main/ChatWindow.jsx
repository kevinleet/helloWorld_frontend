import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../globals";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import { FormControl, Input, Box, Button } from "@chakra-ui/react";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
let socket;

const ChatWindow = () => {
  const [messages, setmessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [room, setRoom] = useState("");

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
      console.log(newMessageRecieved);
      setmessages([...messages, newMessageRecieved]);
      console.log(messages);
    });
  });

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const { data } = await axios.post(`${BASE_URL}/messages`, {
          sender: currentUser._id,
          content: newMessage,
          chat: currentChat,
        });
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
    console.log(data);
  };

  //when room is changed based on currentChat changing, emit a 'join chat' signal to tie current user to
  //a room with a name of the chatId
  useEffect(() => {
    socket.emit("join chat", room);
  }, [room, setRoom]);

  useEffect(() => {
    setRoom(currentChat);
    loadMessages();
  }, [currentChat]);

  const typingHandler = (event) => {
    setNewMessage(event.target.value);

    //could add typing indicator logic here
  };

  return (
    <div className="w-full">
      <div className="h-5/6">
        <div className="h-full">
          {messages
            ? messages.map((message) => (
                <h3 key={message._id}>{message.content}</h3>
              ))
            : null}
        </div>
      </div>
      <form className=" h-1/6" onKeyDown={sendMessage}>
        <input
          type="text"
          className="w-full rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
          varient="filled"
          bg="#E0E0E0"
          color="black"
          placeholder="Enter a message.."
          onChange={typingHandler}
          value={newMessage}
        />
        {/* <button
          className="bg-blue-500 hover:bg-blue-700 rounded p-2"
          onClick={() => {
            setRoom("64a1f7e06fa2a665b03b0918");
          }}
        >
          Join Room
        </button> */}
      </form>
    </div>
  );
};

export default ChatWindow;
