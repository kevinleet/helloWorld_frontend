import { UsersContext } from "../MainPage";
import { useContext, useEffect, useState } from "react";

const AddFriend = () => {
  const { users, setUsers } = useContext(UsersContext);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [input, setInput] = useState("");

  //   useEffect(() => {
  //     if (users && input.length == 0) {
  //       setFilteredUsers(null);
  //       console.log("test");
  //     } else if (users) {
  //       const filteredResults = users.filter((user) =>
  //         user.displayname.toLowerCase().includes(input.toLowerCase())
  //       );
  //       setFilteredUsers(filteredResults);
  //     }
  //   }, [input, users]);

  useEffect(() => {
    if (users) {
      const filteredResults = users.filter((user) =>
        user.displayname.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredUsers(filteredResults);
    }
  }, [input, users]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

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
          ? filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex flex-row justify-between items-center border rounded-lg m-3 px-3 py-4 font-bold text-xl"
              >
                <div className="mx-5">{user.displayname}</div>

                <button className="mx-5 p-2 border border-black rounded-lg bg-green-500 text-sm">
                  Send Friend Request
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AddFriend;
