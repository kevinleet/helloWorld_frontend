import React, { useEffect } from "react";
import axios from "axios";
import { UserContext, BASE_URL } from "../../App";
import { useContext, useState, useRef } from "react";
import { io } from "socket.io-client";
import { ChatsContext } from "../Home";

let socket;
let selectedChatCompare;
const ChatWindow = () => {
  const [messages, setmessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [room, setRoom] = useState("");
  const messagesDisplay = useRef(null);
  const [otherUser, setOtherUser] = useState({});

  const { chats, setChats, selectedChat, setselectedChat } =
    useContext(ChatsContext);

  const { currentUser, currentChat, setCurrentChat } = useContext(UserContext);

  useEffect(() => {
    try {
      if (messages && currentUser) {
        // console.log(messages);
        let message = messages.find(
          (message) => message.sender?._id !== currentUser._id
        );

        // console.log(message);
        if (message) {
          setOtherUser({
            displayname: message.sender.displayname,
            email: message.sender.email,
          });
        }

        // console.log(otherUser);
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
      if (
        selectedChatCompare ||
        selectedChatCompare == newMessageReceived.chat._id
      )
        setmessages([...messages, newMessageReceived]);

      // update the chats in context - there's a better way to do this but that's a later problem.
      const updatedChats = chats.map((chat) => {
        if (chat._id === newMessageReceived.chat._id) {
          // const updatedLatestMessage = {
          //   ...chat.latestMessage,
          //   content: newMessageReceived.content,
          // };
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
      //send new message to be stored on backend
      try {
        const { data } = await axios.post(`${BASE_URL}/api/messages`, {
          sender: currentUser._id,
          content: newMessage,
          chat: currentChat,
        });
        //update the currentChat to have the latest message
        const updatedChats = chats.map((chat) => {
          if (chat._id === currentChat) {
            // const updatedLatestMessage = {
            //   ...chat.latestMessage,
            //   data
            // };
            return {
              ...chat,
              latestMessage: data,
            };
          }
          return chat;
        });

        //update state and context variables
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
    const { data } = await axios.get(`${BASE_URL}/api/messages/${currentChat}`);
    // console.log(data);
    setmessages(data);
    selectedChatCompare = selectedChat;
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
      {selectedChat ? (
        <div className="w-full h-[40px] flex flex-row space-x-4 items-end px-4">
          <h2 className="text-3xl">{otherUser.displayname}</h2>
          <h4 className="text-md">{otherUser.email}</h4>
        </div>
      ) : null}
      <div className="h-[580px] px-2 w-full">
        <div
          className="flex flex-col h-full overflow-y-auto"
          ref={messagesDisplay}
        >
          {messages
            ? messages.map((message) => (
                <div key={message._id} className="flex flex-row">
                  {message.sender._id !== currentUser._id && (
                    <button
                      disabled
                      className="mt-3 w-8 h-8 rounded-full bg-blue-500 dark:bg-purple-500 text-gray-200"
                    >
                      {message.sender.displayname[0]}
                    </button>
                  )}
                  <p
                    className={`${
                      message.sender._id === currentUser._id
                        ? "bg-indigo-600 text-gray-200 ml-auto"
                        : "bg-purple-500 text-gray-200 mr-auto"
                    } px-3 py-2 m-2 max-w-[300px] whitespace-pre-wrap rounded-xl`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {message.content}
                  </p>
                  {message.sender._id === currentUser._id && (
                    <button
                      disabled
                      className="mt-3 w-8 h-8 rounded-full bg-blue-500 dark:bg-purple-500 text-gray-200"
                    >
                      {message.sender.displayname[0]}
                    </button>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
      {selectedChat ? (
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
      ) : null}
    </div>
  );
};

export default ChatWindow;
