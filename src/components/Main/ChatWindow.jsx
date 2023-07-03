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

  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(UserContext);

  useEffect(() => {
    socket = io(`${ENDPOINT}`);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    //socket.on("connection", () => setSocketConnected(true));

    // socket.on("message", (message) => {
    //   setMessages((messages) => [...messages, message]);
    // });
  }, []);

  useEffect(() => {
    socket.emit("join chat", room);
  }, [room, setRoom]);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const { data } = await axios.post(`${BASE_URL}/messages`, {
          sender: user._id,
          content: newMessage,
          chat: "64a1f7e06fa2a665b03b0918",
        });
        setNewMessage("");
        socket.emit("new message", data);
        setmessages([...messages, data]);
        console.log(messages);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setmessages([...messages, newMessageRecieved]);
    });
  });

  const typingHandler = (event) => {
    setNewMessage(event.target.value);

    //could add typing indicator logic here
  };

  return (
    <Box
      alignItems="center"
      flexDir={"column"}
      p={3}
      bg={"white"}
      w={{ base: "100%" }}
      h={"100%"}
    >
      <Box
        d="flex"
        flexDir="column"
        justifyContent={"flex-end"}
        p={3}
        w="100%"
        h="100%"
        bg="#E8E8E8"
        overflowY="hidden"
      >
        <div>
          {messages
            ? messages.map((message) => <h3>{message.content}</h3>)
            : null}
        </div>
        <FormControl onKeyDown={sendMessage}>
          <Input
            varient="filled"
            bg="#E0E0E0"
            placeholder="Enter a message.."
            onChange={typingHandler}
            value={newMessage}
          />
        </FormControl>
        <Button
          onClick={() => {
            setRoom("64a1f7e06fa2a665b03b0918");
          }}
        >
          Join Room
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
