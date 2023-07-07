import React, { useEffect, useState } from "react";

const ChatItem = (props) => {
  //console.log(props.latestMessage);
  const { latestMessage, handleClick, isSelected, receiver, chatid } = props;
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

  return (
    <div
      // onClick={() => handleClick(latestMessage ? latestMessage.chat : chatid)}
      onClick={() => handleClick(chatid)}
      className={`${
        isSelected ? "text-black bg-white" : "text-white"
      } border mt-3 rounded-lg hover:text-black hover:bg-white transform hover:scale-120 hover:rounded-lg transition-all duration-300`}
      id={receiver}
      key={receiver}
    >
      <h3 className="p-2 text-2xl text-center font-bold overflow-ellipsis overflow-hidden whitespace-nowrap tracking-wide">
        {receiver}
      </h3>

      {latestMessage ? (
        <>
          <h5 className="text-md p-2 overflow-hidden overflow-ellipsis whitespace-nowrap tracking-wide">
            {latestMessage.sender.displayname}: {latestMessage.content}
          </h5>
          <p className="text-sm p-2">{getTimeAgo(latestMessage.updatedAt)}</p>
          <p>{chatid}</p>
        </>
      ) : (
        <h5 className="text-md p-2 overflow-hidden overflow-ellipsis whitespace-nowrap tracking-wide text-center">
          No Messages
        </h5>
      )}
    </div>
  );
};
export default ChatItem;
