import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
let socket;

function Chat() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(["dummy"]);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket = io(`${ENDPOINT}`);
    //socket.on("connection", () => setSocketConnected(true));
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && message) {
      //socket.emit("join chat", "public");
      socket.emit("sendMessage", { name, message });

      setName("");
      setMessage("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Your name"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          value={message}
          placeholder="Your message"
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.name}: {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
