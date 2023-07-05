import React, { useEffect, useState } from "react";

const ChatItem = (props) => {
  return props.latestMessage ? (
    <div
      onClick={() => props.handleClick(props.latestMessage.chat)}
      className={`${
        props.isSelected ? `text-black bg-white` : `text-white`
      } border mt-3 rounded-lg hover:text-black hover:bg-white transform hover:scale-120 hover:rounded-lg transition-all duration-300`}
      id={props.users}
      key={props.users}
    >
      <h3 className="p-2">{props.latestMessage.chat}</h3>
      <h3 className="p-2">{props.latestMessage.sender.displayname}</h3>
      <h5 className="p-2">{props.latestMessage.content}</h5>
    </div>
  ) : null;
};

export default ChatItem;
