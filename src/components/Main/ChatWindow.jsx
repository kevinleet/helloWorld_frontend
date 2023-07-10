import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { UserContext, BASE_URL, OPENAI_KEY } from "../../App";
import { ChatsContext } from "../Home";
import { io } from "socket.io-client";
import { Configuration, OpenAIApi } from "openai";
//import Typing from "react-typing-animation";
import { TypeAnimation } from "react-type-animation";

let socket;

let selectedChatCompare;

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [room, setRoom] = useState("");
  const [openAILoading, setOpenAILoading] = useState(false);
  const messagesDisplay = useRef(null);
  const [otherUser, setOtherUser] = useState({});
  const textareaRef = useRef(null);

  const { chats, setChats, selectedChat, setselectedChat } =
    useContext(ChatsContext);

  const { currentUser, currentChat, setCurrentChat, chatGPT, setChatGPT } =
    useContext(UserContext);

  const config = new Configuration({
    apiKey: OPENAI_KEY,
  });

  const openai = new OpenAIApi(config);

  //display other user's name
  useEffect(() => {
    try {
      if (currentChat !== chatGPT._id) {
        if (messages.length > 0 && currentUser) {
          let message = messages.find(
            (message) => message.sender?._id !== currentUser._id
          );
          if (message) {
            setOtherUser({
              displayname: message.sender?.displayname,
              email: message.sender?.email,
            });
          }
        }
      } else if (currentChat == chatGPT._id) {
        setOtherUser({
          displayname: "helloWorld.ai",
          email: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [messages, currentChat, selectedChat]);

  //set up the Socket.io connection with backend
  useEffect(() => {
    socket = io(`${BASE_URL}`);
    socket.emit("setup", currentUser);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  //Message Receive Functionality (Socket.io)
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      // only update messages if the incoming message received belongs to the selected chat.
      // Otherwise, dont and it will save to backend and render when that chat is selected.
      if (selectedChatCompare === newMessageReceived.chat._id) {
        setMessages([...messages, newMessageReceived]);
      }

      const updatedChats = chats.map((chat) => {
        if (chat._id === newMessageReceived.chat._id) {
          return {
            ...chat,
            latestMessage: newMessageReceived,
          };
        }
        return chat;
      });
      setChats(updatedChats);
    });
  });

  //Send message functionality (Socket.io and Server)
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      event.preventDefault();
      try {
        const { data } = await axios.post(`${BASE_URL}/api/messages`, {
          sender: currentUser._id,
          content: newMessage,
          chat: currentChat,
        });

        const updatedChats = chats.map((chat) => {
          if (chat._id === currentChat) {
            return {
              ...chat,
              latestMessage: data,
            };
          }
          return chat;
        });

        setChats(updatedChats);
        setNewMessage("");
        await socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  //OpenAI Prompt API
  const runPrompt = async (data) => {
    const response_ai = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: data.content,
      max_tokens: 2048,
      temperature: 1,
    });

    const data_ai = await axios.post(`${BASE_URL}/api/messages`, {
      content: response_ai.data.choices[0].text,
      chat: currentChat,
    });
    //in order for sent prompt to stay on screen, we needed to pass 'data' again
    setMessages([...messages, data, data_ai.data]);
  };
  //Send a message to OpenAI API
  const sendAIMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      event.preventDefault();
      try {
        const { data } = await axios.post(`${BASE_URL}/api/messages`, {
          sender: currentUser._id,
          content: newMessage,
          chat: currentChat,
        });
        setNewMessage("");
        setMessages([...messages, data]);

        await runPrompt(data);

        setChatGPT({ ...chatGPT, latestMessage: data });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  //Load saved chat messages from the server
  const loadMessages = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/messages/${currentChat}`);

    setMessages(data);
    selectedChatCompare = selectedChat;
  };

  //auto-scroll the chat to the bottom when a new message is added
  useEffect(() => {
    if (messagesDisplay.current) {
      messagesDisplay.current.scrollTop = messagesDisplay.current.scrollHeight;
    }
  }, [messages, setMessages]);

  //Joins the client socket to a chat room useEffect()
  useEffect(() => {
    socket.emit("join chat", room);
  }, [room, setRoom]);

  //If selected chat changes, change the Room for Socket.io
  useEffect(() => {
    setMessages([]);
    setRoom(currentChat);
    currentChat !== "" ? loadMessages() : null;
  }, [currentChat, setCurrentChat]);

  //User input update the messafe in chat
  const typingHandler = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <div className="w-full flex flex-col flex-auto items-center justify-center">
      {selectedChat ? (
        <div className="w-full min-h-[50px] lg:h-[50px] pb-2  flex flex-col lg:flex-row lg:space-x-4 items-start lg:items-end px-4">
          <h2 className="text-md lg:text-3xl">{otherUser.displayname}</h2>
          <h4 className="text-sm lg:text-md">{otherUser.email}</h4>
        </div>
      ) : null}
      <div className="w-full h-[300px] lg:h-[580px] mt-2 lg:mt-0 px-2">
        <div
          className="flex flex-col h-full overflow-y-auto"
          ref={messagesDisplay}
        >
          {messages.length > 0 && currentChat
            ? messages.map((message, index) => (
                <div key={message._id} className="flex flex-row">
                  {message.sender?._id !== currentUser._id && (
                    <button
                      disabled
                      className="mt-3 w-6 h-6 text-xs lg:text-lg lg:w-8 lg:h-8 rounded-full bg-blue-500 dark:bg-indigo-600 text-gray-200"
                    >
                      {message.sender?.displayname[0]}
                    </button>
                  )}
                  <p
                    className={`${
                      message.sender?._id === currentUser._id
                        ? "bg-neutral-700 text-gray-200 ml-auto"
                        : "bg-indigo-600 text-gray-200 mr-auto"
                    } px-3 py-1 text-sm lg:text-lg lg:py-2 m-2 max-w-[200px] lg:max-w-[300px] whitespace-pre-wrap rounded-xl`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {currentChat == chatGPT._id &&
                    message.sender?._id !== currentUser._id &&
                    index === messages.length - 1 ? (
                      <TypeAnimation sequence={[message.content]} />
                    ) : (
                      <span>{message.content}</span>
                    )}
                  </p>
                  {message.sender?._id === currentUser._id && (
                    <button
                      disabled
                      className="mt-3 w-6 h-6 text-xs lg:text-lg lg:w-8 lg:h-8 rounded-full bg-blue-500 dark:bg-neutral-500 text-gray-200"
                    >
                      {message.sender?.displayname[0]}
                    </button>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
      {selectedChat && currentChat ? (
        <form
          className="w-full lg:w-[600px] mt-0"
          onKeyDown={currentChat == chatGPT._id ? sendAIMessage : sendMessage}
        >
          <textarea
            ref={textareaRef}
            className="border block w-full text-xs lg:text-lg sm:min-h-[30px] lg:min-h-[50px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-700 text-white resize-none"
            // style={{ minHeight: "50px" }}
            varient="filled"
            bg="#E0E0E0"
            color="black"
            placeholder="Enter a message.."
            onChange={typingHandler}
            value={newMessage}
          />
        </form>
      ) : null}
    </div>
  );
};

export default ChatWindow;
