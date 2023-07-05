const ChatItem = ({ handleClick, latestMessage, users }) => {
  return latestMessage ? (
    <button
      onClick={() => handleClick(latestMessage.chat)}
      className="text-gray-200 mt-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transform hover:scale-120 hover:rounded-lg transition-all duration-300 overflow-hidden"
      id={users}
      key={users}
    >
      <h3 className="p-2 overflow-hidden overflow-ellipsis whitespace-nowrap font-bold tracking-wider">
        {latestMessage.sender.displayname}
      </h3>
      <h5 className="p-2 overflow-hidden overflow-ellipsis whitespace-nowrap tracking-wide">
        <span>. . . </span>
        {latestMessage.content}
      </h5>
    </button>
  ) : null;
};

export default ChatItem;
