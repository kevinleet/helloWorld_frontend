import React, { useEffect, useState } from "react";

const ChatItem = (props) => {
  // console.log(props.latestMessage);
  const getTimeAgo = (updatedAt) => {
    const updatedDate = new Date(updatedAt);
    const currentDate = new Date();
    const timeDiff = currentDate - updatedDate;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (seconds < 60) {
      return "< 1 minute ago";
    } else if (minutes < 60) {
      return minutes + " minute" + (minutes !== 1 ? "s" : "") + " ago";
    } else if (hours < 24) {
      return hours + " hour" + (hours !== 1 ? "s" : "") + " ago";
    } else {
      return days + " day" + (days !== 1 ? "s" : "") + " ago";
    }
  };

  return props.latestMessage ? (
    <div
      onClick={() => props.handleClick(props.latestMessage.chat)}
      className={`${
        props.isSelected ? `text-black bg-white` : `text-white`
      } border mt-3 rounded-lg hover:text-black hover:bg-white transform hover:scale-120 hover:rounded-lg transition-all duration-300`}
      id={props.receiver}
      key={props.receiver}
    >
      <h3 className="p-2 text-2xl text-center font-bold overflow-ellipsis whitespace-nowrap tracking-widest">
        {props.receiver}
      </h3>

      <h5 className="text-md  p-2 overflow-hidden overflow-ellipsis whitespace-nowrap tracking-wide">
        {props.latestMessage.sender.displayname}: {props.latestMessage.content}
      </h5>
      <p className="text-sm  p-2">
        {getTimeAgo(props.latestMessage.updatedAt)}
      </p>
    </div>
  ) : (
    <div
      onClick={() => props.handleClick(props.chatid)}
      className={`${
        props.isSelected ? `text-black bg-white` : `text-white`
      } border mt-3 rounded-lg hover:text-black hover:bg-white transform hover:scale-120 hover:rounded-lg transition-all duration-300`}
      id={props.receiver}
      key={props.receiver}
    >
      <h3 className="p-2 text-2xl text-center font-bold overflow-ellipsis whitespace-nowrap tracking-widest">
        {props.receiver}
      </h3>
      <h5 className="text-md  p-2 overflow-hidden overflow-ellipsis whitespace-nowrap tracking-wide text-center">
        No Messages
      </h5>
    </div>
  );
};

export default ChatItem;
