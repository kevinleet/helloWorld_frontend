import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { ChatsContext } from "../Home";
import { Tooltip } from "@reach/tooltip";
import "@reach/tooltip/styles.css";
import { BASE_URL } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Friends = () => {
  const { chats, setChats, selectedChat, setselectedChat } =
    useContext(ChatsContext);
  const { currentUser, setCurrentChat } = useContext(UserContext);
  const [input, setInput] = useState("");
  let navigate = useNavigate();

  const createNewChat = async (id) => {
    // const msg = await axios.post(`${BASE_URL}/api/messages`, {
    //   sender: currentUser._id,
    //   content: "No Messages",
    // });
    // console.log(msg);
    const res = await axios.post(`${BASE_URL}/api/chats`, {
      user1: currentUser._id,
      user2: id,
      //latestMessage: msg.data._id,
    });
    return res.data._id;
  };

  const handleFriendClick = async (e) => {
    let chatId = await createNewChat(e.target.id);
    setCurrentChat(chatId);
    setselectedChat(chatId);
    if (location.pathname !== "/home/chat") {
      navigate("/home/chat");
    }
    console
      .log
      //`Now clicking on circular friend button: ${e.currentTarget.name}`
      ();
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const filteredFriends = currentUser?.friends.filter((friend) =>
    friend.displayname.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div>
      <div className="search-bar">
        <form>
          <input
            type="text"
            id="search"
            placeholder="Search friends..."
            className="block w-full rounded-md border-0 text-sm py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lg:text-lg sm:leading-6 bg-slate-700 text-white"
            value={input}
            onChange={handleInputChange}
          />
        </form>
        <div className="mt-0 overflow-x-auto py-3 lg:py-5">
          <div className="flex flex-row">
            {filteredFriends
              ?.sort((a, b) => a.displayname.localeCompare(b.displayname))
              .map((friend) => (
                <div
                  key={friend._id}
                  className="flex flex-col justify-center items-center text-center"
                >
                  {/* <Tooltip
                    label={friend.displayname}
                    className="text-lg rounded-lg bg-blue-500 dark:bg-purple-500 text-gray-200 hover:bg-purple-400"
                  > */}
                  <button
                    onClick={handleFriendClick}
                    id={friend._id}
                    name={friend.displayname}
                    className="w-10 h-10 mx-2 rounded-full bg-blue-500 dark:bg-neutral-500 dark:hover:bg-neutral-400 ext-gray-200 hover:bg-purple-400 transition-all duration-300 "
                  >
                    {friend?.displayname[0]}
                  </button>
                  {/* </Tooltip> */}
                  <p className="text-xs pt-1">
                    {friend?.displayname.slice(0, 7)}
                    {friend?.displayname.length > 7 && "..."}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
