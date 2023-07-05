import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Tooltip } from "@reach/tooltip";
import "@reach/tooltip/styles.css";

const Friends = () => {
  const { currentUser } = useContext(UserContext);
  const [input, setInput] = useState("");

  const handleFriendClick = (e) => {
    console.log(
      `Now clicking on circular friend button: ${e.currentTarget.name}`
    );
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
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-700 text-white"
            value={input}
            onChange={handleInputChange}
          />
        </form>
        <div className="mt-2 overflow-x-auto py-5">
          <div className="flex flex-row space-x-2">
            {filteredFriends
              ?.sort((a, b) => a.displayname.localeCompare(b.displayname))
              .map((friend) => (
                <div key={friend._id}>
                  <Tooltip
                    label={friend.displayname}
                    className="text-lg rounded-lg bg-purple-500 font-bold text-gray-200 hover:bg-purple-400"
                  >
                    <button
                      onClick={handleFriendClick}
                      id={friend._id}
                      name={friend.displayname}
                      className="w-10 h-10 rounded-full bg-purple-500 text-gray-200 hover:bg-purple-400 transition-all duration-300"
                    >
                      {friend?.displayname[0]}
                    </button>
                  </Tooltip>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
