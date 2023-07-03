import { UsersContext } from "../Home";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../globals";
import axios from "axios";

const AddFriend = () => {
  const { users, setUsers } = useContext(UsersContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [input, setInput] = useState("");

  // useEffect(() => {
  //   if (users && input.length == 0) {
  //     setFilteredUsers(null);
  //   } else if (users) {
  //     const filteredResults = users.filter((user) =>
  //       user.displayname.toLowerCase().includes(input.toLowerCase())
  //     );
  //     setFilteredUsers(filteredResults);
  //   }
  // }, [input, users]);

  useEffect(() => {
    try {
      if (users) {
        console.log(users);
        console.log(currentUser);
        const filteredResults = users.filter(
          (user) =>
            user.displayname.toLowerCase().includes(input.toLowerCase()) &&
            user.displayname != currentUser.displayname
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

  const handleClick = (e) => {
    sendRequest(e.currentTarget.id);
  };

  const sendRequest = async (recipient) => {
    let sender = currentUser._id;
    // console.log(sender, recipient);
    try {
      let response = await axios.post(`${BASE_URL}/requests/create`, {
        sender: sender,
        recipient: recipient,
      });
      setCurrentUser((prevCurrentUser) => ({
        ...prevCurrentUser,
        outgoingrequests: [...prevCurrentUser.outgoingrequests, recipient],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("user", user);

  return (
    <div className="flex justify-center items-center flex-col p-5">
      <div className="">
        <input
          className="px-5 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-500 text-white"
          placeholder="Search for users here..."
          value={input}
          type="text"
          onChange={handleChange}
        ></input>
      </div>
      <div className="mt-5">
        {filteredUsers
          ? filteredUsers.map((filteredUser) => (
              <div
                key={filteredUser._id}
                className="flex flex-row justify-between items-center border rounded-lg m-3 px-3 py-4 font-bold text-xl "
              >
                <div className="mx-5 text-white">
                  {filteredUser.displayname}
                </div>
                {currentUser.outgoingrequests.includes(filteredUser._id) ? (
                  <button
                    id={filteredUser._id}
                    onClick={handleClick}
                    className="mx-5 p-2 border border-black rounded-lg bg-yellow-500 text-sm hover-"
                  >
                    Request Pending
                  </button>
                ) : (
                  <button
                    id={filteredUser._id}
                    onClick={handleClick}
                    className="mx-5 p-2 border border-black rounded-lg bg-green-500 text-sm hover-"
                  >
                    Send Friend Request
                  </button>
                )}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AddFriend;
