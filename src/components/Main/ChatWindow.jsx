import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { UserContext, BASE_URL } from "../../App";
import { ChatsContext } from "../Home";
import { io } from "socket.io-client";

let socket;

let selectedChatCompare;

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [room, setRoom] = useState("");
  const messagesDisplay = useRef(null);
  const [otherUser, setOtherUser] = useState({});
  const textareaRef = useRef(null);

  const { chats, setChats, selectedChat, setselectedChat } =
    useContext(ChatsContext);

  const { currentUser, currentChat, setCurrentChat } = useContext(UserContext);

  useEffect(() => {
    try {
      if (messages.length > 0 && currentUser) {
        let message = messages.find(
          (message) => message.sender?._id !== currentUser._id
        );

        if (message) {
          setOtherUser({
            displayname: message.sender.displayname,
            email: message.sender.email,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [messages]);

  useEffect(() => {
    socket = io(`${BASE_URL}`);
    socket.emit("setup", currentUser);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

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

  const loadMessages = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/messages/${currentChat}`);

    setMessages(data);
    selectedChatCompare = selectedChat;
  };

  useEffect(() => {
    if (messagesDisplay.current) {
      messagesDisplay.current.scrollTop = messagesDisplay.current.scrollHeight;
    }
  }, [messages, setMessages]);

  useEffect(() => {
    socket.emit("join chat", room);
  }, [room, setRoom]);

  useEffect(() => {
    setMessages([]);
    setRoom(currentChat);
    currentChat !== "" ? loadMessages() : null;
  }, [currentChat, setCurrentChat]);

  const typingHandler = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <div className="w-full py-2 flex flex-col flex-auto items-center justify-center">
      {selectedChat ? (
        <div className="w-full h-[40px] flex flex-row space-x-4 items-end px-4">
          <h2 className="text-3xl">{otherUser.displayname}</h2>
          <h4 className="text-md">{otherUser.email}</h4>
        </div>
      ) : null}
      <div className="w-full lg:h-[580px] px-2">
        <div
          className="flex flex-col h-full overflow-y-auto"
          ref={messagesDisplay}
        >
          {messages.length > 0 && currentChat
            ? messages.map((message) => (
                <div key={message._id} className="flex flex-row">
                  {message.sender._id !== currentUser._id && (
                    <button
                      disabled
                      className="mt-3 w-6 h-6 text-xs lg:text-lg lg:w-8 lg:h-8 rounded-full bg-blue-500 dark:bg-indigo-600 text-gray-200"
                    >
                      {message.sender.displayname[0]}
                    </button>
                  )}
                  <p
                    className={`${
                      message.sender._id === currentUser._id
                        ? "bg-neutral-700 text-gray-200 ml-auto"
                        : "bg-indigo-600 text-gray-200 mr-auto"
                    } px-3 py-2 m-2 max-w-[200px] lg:max-w-[300px] whitespace-pre-wrap rounded-xl`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {message.content}
                  </p>
                  {message.sender._id === currentUser._id && (
                    <button
                      disabled
                      className="mt-3 w-6 h-6 text-xs lg:text-lg lg:w-8 lg:h-8 rounded-full bg-blue-500 dark:bg-neutral-500 text-gray-200"
                    >
                      {message.sender.displayname[0]}
                    </button>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
      {selectedChat && currentChat ? (
        <form className="w-full lg:w-[600px] mt-5" onKeyDown={sendMessage}>
          <textarea
            ref={textareaRef}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-700 text-white resize-none"
            style={{ minHeight: "50px" }}
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
