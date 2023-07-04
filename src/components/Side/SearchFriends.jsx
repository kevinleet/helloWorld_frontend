import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import FriendCard from "./FriendCard";
import { BASE_URL } from "../../globals";

const SearchFriends = () => {
  const [friends, setFriends] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      console.log("current user", currentUser);
      // const getAllFriends = async () => {
      //   try {
      //     let response = await axios.get(
      //       `${BASE_URL}/users/get/friends/${currentUser._id}`
      //     );
      //     setFriends(response.data);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };
      // getAllFriends();
    }
  }, [currentUser]);

  const handleFriendClick = (e) => {
    console.log(
      `Now clicking on circular friend button: ${e.currentTarget.name}`
    );
  };

  return (
    <div>
      <div className="search-bar">
        <form>
          <input type="text" id="search" placeholder="Search Friends" />
          <button type="submit" className="submit-button">
            Search
          </button>
        </form>
        <div className="mt-5 flex flex-row space-x-2 overflow-x-auto">
          {currentUser?.friends?.map((friend) => (
            <div key={friend._id}>
              <button
                onClick={handleFriendClick}
                id={friend._id}
                name={friend.displayname}
                className="border border-2 w-10 h-10 rounded-full bg-green-500 hover:bg-green-400"
              >
                {friend?.displayname[0]}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* { search ? <div className="search-result"> 

            </div> : null } */}

      <div className="friends-list w-full">
        <ul>
          {friends?.map((friend) => (
            <FriendCard
              key={friend.friendsList}
              friendsList={friend.friendList}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchFriends;
