import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext, BASE_URL } from "../../App";
import { Link } from "react-router-dom";

const AddFriend = () => {
  const { currentUser, setCurrentUser, users } = useContext(UserContext);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    try {
      // Filter users based on input and exclude the current user
      if (users) {
        const filteredResults = users.filter(
          (user) =>
            user.displayname.toLowerCase().includes(input.toLowerCase()) &&
            user.displayname != currentUser?.displayname
        );
        setFilteredUsers(filteredResults);
      }
    } catch (error) {
      console.log(error);
    }
  }, [input, users]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendRequest = (e) => {
    sendRequest(e.currentTarget.id);
  };

  const sendRequest = async (recipient) => {
    try {
      // Send a friend request to the recipient
      let response = await axios.post(`${BASE_URL}/api/requests/create`, {
        sender: currentUser._id,
        recipient: recipient,
      });
      // Update the current user's outgoing requests
      setCurrentUser((prevCurrentUser) => ({
        ...prevCurrentUser,
        outgoingrequests: [...prevCurrentUser.outgoingrequests, recipient],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptRequest = async (e) => {
    const sender = users.find((user) => user._id === e.currentTarget.id);
    if (sender) {
      acceptRequest(sender);
    }
  };

  const acceptRequest = async (sender) => {
    try {
      // Accept a friend request from the sender
      let response = await axios.post(`${BASE_URL}/api/requests/accept`, {
        sender: sender._id,
        recipient: currentUser._id,
      });
      // Update the current user's friends and incoming requests
      setCurrentUser((prevCurrentUser) => ({
        ...prevCurrentUser,
        friends: [...prevCurrentUser.friends, sender],
        incomingrequests: prevCurrentUser.incomingrequests.filter(
          (user) => user._id !== sender._id
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-start items-center flex-col p-5 w-full overflow-y-auto mb-5">
      {/* Render incoming friend requests */}
      {currentUser?.incomingrequests?.length > 0 ? (
        <div className="mb-5 w-[400px] p-4 rounded-lg">
          <h3 className="text-2xl text-center font-bold text-green-500">
            Incoming Friend Requests
          </h3>
          {currentUser?.incomingrequests.map((sender) => (
            <div
              key={sender._id}
              className="flex flex-row justify-between items-center border border-2 border-green-700 rounded-lg m-3 px-3 py-4 font-bold text-xl"
            >
              <div className="mx- text-white">{sender.displayname}</div>
              <button
                id={sender._id}
                onClick={handleAcceptRequest}
                className="mx-5 p-2 border border-black rounded-lg bg-green-500 hover:bg-green-400 text-sm transition-all duration-300"
              >
                Accept Friend Request
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <div className="">
        {/* Search input field */}
        <input
          className="px-5 block w-[350px] rounded-md border-0 py-2 px-20 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-700 text-white"
          placeholder="Search for users here..."
          value={input}
          type="text"
          onChange={handleChange}
        ></input>
      </div>
      <div className="mt-1">
        {/* Render filtered users */}
        {filteredUsers
          ? filteredUsers.map((filteredUser) => (
              <div
                key={filteredUser._id}
                className="flex w-[400px] flex-row px-10 justify-between items-center border border-gray-500 rounded-lg m-3 px-3 py-4 font-bold text-xl "
              >
                <div className="mx-5 text-lg text-gray-200 tracking-wider">
                  <Link to={`/home/profile/${filteredUser._id}`}>
                    {filteredUser.displayname}
                  </Link>
                </div>

                {/* Render different buttons based on friendship status */}
                {currentUser?.friends?.filter(
                  (friend) => friend._id == filteredUser._id
                ).length > 0 ? (
                  <button
                    id={filteredUser._id}
                    className="mx-5 p-2 border border-black rounded-lg bg-purple-500 text-sm hover:bg-purple-400 transition-all duration-300"
                  >
                    &#9734; Your Friend
                  </button>
                ) : null}

                {currentUser?.outgoingrequests?.filter(
                  (recipient) => recipient._id == filteredUser._id
                ).length > 0 ? (
                  <button
                    id={filteredUser._id}
                    className="mx-5 p-2 border border-black rounded-lg bg-yellow-500 text-sm"
                    disabled
                  >
                    Pending Request
                  </button>
                ) : null}

                {currentUser?.incomingrequests?.filter(
                  (sender) => sender._id == filteredUser._id
                ).length > 0 ? (
                  <button
                    id={filteredUser._id}
                    className="mx-5 p-2 border border-black rounded-lg bg-green-500 hover:bg-green-400 text-sm transition-all duration-300"
                    onClick={handleAcceptRequest}
                  >
                    Accept Friend Request
                  </button>
                ) : null}

                {!currentUser?.friends?.filter(
                  (friend) => friend._id == filteredUser._id
                ).length > 0 &&
                !currentUser?.outgoingrequests?.filter(
                  (recipient) => recipient._id == filteredUser._id
                ).length > 0 &&
                !currentUser?.incomingrequests?.filter(
                  (sender) => sender._id == filteredUser._id
                ).length > 0 ? (
                  <button
                    id={filteredUser._id}
                    onClick={handleSendRequest}
                    disabled={
                      currentUser?.outgoingrequests?.includes(filteredUser._id)
                        ? true
                        : false
                    }
                    className={
                      currentUser?.outgoingrequests?.includes(filteredUser._id)
                        ? "mx-5 p-2 border border-black rounded-lg bg-yellow-500 text-sm"
                        : "mx-5 p-2 border border-black rounded-lg bg-blue-500 hover:bg-blue-400 text-sm transition-all duration-300"
                    }
                  >
                    {currentUser?.outgoingrequests?.includes(
                      filteredUser._id
                    ) ? (
                      <>Request Pending</>
                    ) : (
                      <>Send Friend Request</>
                    )}
                  </button>
                ) : null}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AddFriend;
